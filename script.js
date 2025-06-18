(function() {
  const container = document.getElementById('poem');
  let words = [
    // Line 1: "Four score and seven years ago our fathers brought forth"
    'Four', 'score', 'and', 'sev-', 'en', 'years', 'a-', 'go',
    // Line 2: "on this continent a new nation conceived in liberty"
    'our', 'fa-', 'thers', 'brought', 'forth', 'on', 'this', 'con-',
    // Line 3: "and dedicated to the proposition that all men"
    'ti-', 'nent', 'a', 'new', 'na-', 'tion', 'con-', 'ceived',
    // Line 4: "are created equal"
    'in', 'lib-', 'er-', 'ty', 'and', 'ded-', 'i-', 'cat-',
    // Line 5: 
    'ed', 'to', 'the', 'prop-', 'o-', 'si-', 'tion', 'that',
    // Line 6:
    'all', 'men', 'are', 'cre-', 'at-', 'ed', 'e-', 'qual'
  ];
  let syncopation = []; // Track syncopated positions
  let syncopationStates = {}; // Track the state of affected positions independently
  let editingIndex = null;
  let circleIconActive = true;
  let timeSignatureNumerator = 4; // Current top number (4→3→2→6→5→4)
  let isPlaying = false;
  let playTimeouts = [];
  let currentPlayPosition = 0;
  let notesBoxElements = []; // Store references to notes boxes for highlighting
  let beatEnabled = true; // Beat checkbox state
  let rhythmEnabled = true; // Rhythm checkbox state
  const circlesPerBeat = 2; // Each beat has 2 circles
  const BPM = 82;
  const eighthNoteInterval = 30000 / BPM; // milliseconds per eighth note
  const quarterNoteInterval = 60000 / BPM; // milliseconds per quarter note

  // Audio context for generating sounds
  let audioContext = null;

  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  // Get the first circle position of the next beat after a syncopated position
  function getNextBeatFirstCircle(syncopatedPosition) {
    // syncopatedPosition is the second circle of a beat (odd number)
    // Next beat starts at syncopatedPosition + 1
    return syncopatedPosition + 1;
  }

  // Check if a position is affected by syncopation
  function isAffectedBySyncopation(position) {
    for (const syncPos of syncopation) {
      const nextBeatFirstCircle = getNextBeatFirstCircle(syncPos);
      const nextBeatSecondCircle = nextBeatFirstCircle + 1;
      if (position === nextBeatFirstCircle || position === nextBeatSecondCircle) {
        return true;
      }
    }
    return false;
  }

  // Check if a position can be syncopated (not on last beat of measure)
  function canSyncopate(position) {
    const config = getLayoutConfig();
    const positionInMeasure = position % config.circlesPerMeasure;
    const beatInMeasure = Math.floor(positionInMeasure / circlesPerBeat);
    const lastBeatOfMeasure = config.beatsPerMeasure - 1;
    
    // Cannot syncopate on the last beat of a measure
    return beatInMeasure !== lastBeatOfMeasure;
  }

  // Check if syncopation conditions are met for a position
  function canCreateSyncopation(position) {
    // Position must be odd (second circle of a beat)
    if (position % 2 === 0) return false;
    
    // Previous position (first circle) must be active
    if (position === 0 || words[position - 1] === '-' || words[position - 1] === '') return false;
    
    // Must not be the last beat of a measure
    return canSyncopate(position);
  }

  // Get the syncopation type for a beat (for determining which image to show)
  function getSyncopationType(beatStartPosition) {
    // Check if this beat is affected by a syncopated beat before it
    for (const syncPos of syncopation) {
      const nextBeatFirstCircle = getNextBeatFirstCircle(syncPos);
      if (nextBeatFirstCircle === beatStartPosition) {
        // This beat is affected by syncopation - use syncopation states
        const firstActive = syncopationStates[beatStartPosition] || false;
        const secondActive = syncopationStates[beatStartPosition + 1] || false;
        
        if (!firstActive && secondActive) {
          return 'SyncopateB'; // First inactive, second active
        } else if (!firstActive && !secondActive) {
          return 'SyncopateC'; // Both inactive
        }
      }
    }
    return null;
  }

  // Check if a position should be considered active (for rhythm and display)
  function isPositionActive(position) {
    if (isAffectedBySyncopation(position)) {
      return syncopationStates[position] || false;
    } else {
      return words[position] !== '-' && words[position] !== '';
    }
  }

  // Toggle syncopation at a position
  function toggleSyncopation(position) {
    const syncopationIndex = syncopation.indexOf(position);
    const nextBeatFirstCircle = getNextBeatFirstCircle(position);
    const nextBeatSecondCircle = nextBeatFirstCircle + 1;

    if (syncopationIndex !== -1) {
        // --- REMOVING SYNCOPATION ---
        syncopation.splice(syncopationIndex, 1);

        // Get the word that was playing on the upbeat.
        const wordToMoveBack = words[nextBeatSecondCircle];
        
        // Remove that word from the array. This collapses the space.
        words.splice(nextBeatSecondCircle, 1);
        
        // Replace the now-unneeded rest with the word.
        words[nextBeatFirstCircle] = wordToMoveBack;

        // Clean up the overridden states
        delete syncopationStates[nextBeatFirstCircle];
        delete syncopationStates[nextBeatSecondCircle];
    } else {
        // --- ADDING SYNCOPATION ---
        syncopation.push(position);
        
        // Get the word that's on the downbeat that will be silenced.
        const wordToMove = words[nextBeatFirstCircle];
        
        // Replace it with a rest.
        words[nextBeatFirstCircle] = '-';
        
        // Insert the word before the next word, shifting everything to the right.
        words.splice(nextBeatSecondCircle, 0, wordToMove);

        // Set the initial rhythm state for the affected beat
        syncopationStates[nextBeatFirstCircle] = false; // First half of beat is silent
        syncopationStates[nextBeatSecondCircle] = true;  // Second half of beat is sounded
    }
  }

  // Generate brush drum sound using white noise
  function createBrushDrumSound() {
    const ctx = initAudioContext();
    const bufferSize = ctx.sampleRate * 0.1; // 100ms of audio
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate white noise with exponential decay envelope
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.pow(0.01, i / bufferSize); // Exponential decay
      output[i] = (Math.random() * 2 - 1) * envelope * 0.3; // White noise with envelope
    }

    return buffer;
  }

  function playBrushDrum() {
    if (!beatEnabled) return; // Only play if beat is enabled
    
    const ctx = initAudioContext();
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    
    source.buffer = createBrushDrumSound();
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Quick attack and decay for brush-like sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    source.start();
    source.stop(ctx.currentTime + 0.1);
  }

  // Play triangle wave tone at A2 (110 Hz)
  function playTriangleTone(duration = 0.2) {
    if (!rhythmEnabled) return; // Only play if rhythm is enabled
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(110, ctx.currentTime); // A2 = 110 Hz
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Envelope for smooth attack and release
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02); // Quick attack
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + duration - 0.05); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration); // Release
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  // Get rhythm pattern from current words including syncopation
  function getRhythmPattern() {
    const pattern = [];
    for (let i = 0; i < words.length; i++) {
      // Include syncopated positions as active sounds
      const hasWord = words[i] !== '-' && words[i] !== '';
      const isSyncopated = syncopation.includes(i);
      const isAffectedAndActive = isAffectedBySyncopation(i) && syncopationStates[i];
      pattern.push(hasWord || isSyncopated || isAffectedAndActive);
    }
    return pattern;
  }

  // Auto-scroll to keep highlighted element in view
  function scrollToElement(element) {
    if (!element) return;
    
    const elementRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const floatingPanelHeight = 60; // Height of bottom panel
    const margin = 100; // Extra margin for better visibility
    
    // Check if element is out of view (considering the floating panel)
    const effectiveViewHeight = windowHeight - floatingPanelHeight;
    const isAboveView = elementRect.top < margin;
    const isBelowView = elementRect.bottom > effectiveViewHeight - margin;
    
    if (isAboveView || isBelowView) {
      // Calculate target scroll position to center the element
      const elementTop = elementRect.top + window.pageYOffset;
      const targetY = elementTop - (effectiveViewHeight / 2) + (elementRect.height / 2);
      
      // Smooth scroll to position
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  }

  // Highlight the notes box for the current beat
  function highlightNotesBox(position) {
    // Clear all previous highlights
    notesBoxElements.forEach(box => box.classList.remove('playing'));
    
    // Highlight current position
    if (position < notesBoxElements.length) {
      const currentElement = notesBoxElements[position];
      currentElement.classList.add('playing');
      
      // Auto-scroll to keep the highlighted element in view
      scrollToElement(currentElement);
    }
  }

  // Clear all highlights
  function clearHighlights() {
    notesBoxElements.forEach(box => box.classList.remove('playing'));
  }

  function createImage(url) {
    const img = document.createElement('img');
    img.src = url;
    return img;
  }

  // Get layout configuration based on time signature and screen width
  function getLayoutConfig() {
    const screenWidth = window.innerWidth;
    const beatsPerMeasure = timeSignatureNumerator;
    const circlesPerMeasure = beatsPerMeasure * circlesPerBeat;
    
    let measuresPerLine = 1;
    
    switch(timeSignatureNumerator) {
      case 4:
        // 4/4: 1 or 2 measures per line
        if (screenWidth > 750) {
          measuresPerLine = 2;
        }
        break;
      case 3:
        // 3/4: 1 or 2 measures per line
        if (screenWidth > 600) {
          measuresPerLine = 2;
        }
        break;
      case 2:
        // 2/4: 2, 3, or 4 measures per line
        if (screenWidth > 900) {
          measuresPerLine = 4;
        } else if (screenWidth > 700) {
          measuresPerLine = 3;
        } else if (screenWidth > 500) {
          measuresPerLine = 2;
        }
        break;
      case 6:
        // 6/4: 1 measure per line
        measuresPerLine = 1;
        break;
      case 5:
        // 5/4: 1 measure per line
        measuresPerLine = 1;
        break;
    }
    
    return {
      beatsPerMeasure,
      circlesPerMeasure,
      measuresPerLine,
      circlesPerLine: measuresPerLine * circlesPerMeasure
    };
  }

  // Setup circle icon button click handler
  const circleIcon = document.getElementById('circle-icon');
  circleIcon.addEventListener('click', () => {
    circleIconActive = !circleIconActive;
    circleIcon.className = `icon-button ${circleIconActive ? 'active' : 'inactive'}`;
    updateCircleVisibility();
  });

  // Setup time signature button click handler
  const timeSignatureButton = document.getElementById('time-signature-button');
  const timeSignatureTop = timeSignatureButton.querySelector('.time-signature-top');
  
  timeSignatureButton.addEventListener('click', () => {
    // Cycle through: 4→3→2→6→5→4
    switch(timeSignatureNumerator) {
      case 4: timeSignatureNumerator = 3; break;
      case 3: timeSignatureNumerator = 2; break;
      case 2: timeSignatureNumerator = 6; break;
      case 6: timeSignatureNumerator = 5; break;
      case 5: timeSignatureNumerator = 4; break;
    }
    timeSignatureTop.textContent = timeSignatureNumerator;
    render(); // Re-render with new time signature
  });

  // Setup play button click handler
  const playButton = document.getElementById('play-button');
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  });

  // Setup checkbox handlers
  const beatCheckbox = document.getElementById('beat-checkbox');
  const rhythmCheckbox = document.getElementById('rhythm-checkbox');
  
  beatCheckbox.addEventListener('change', (e) => {
    beatEnabled = e.target.checked;
  });
  
  rhythmCheckbox.addEventListener('change', (e) => {
    rhythmEnabled = e.target.checked;
  });

  function startPlayback() {
    initAudioContext();
    isPlaying = true;
    currentPlayPosition = 0; // Always start from beginning
    playButton.textContent = '⏸';
    playButton.classList.add('playing');
    
    const rhythmPattern = getRhythmPattern();
    
    // Schedule quarter note beats (brush drums)
    const totalBeats = Math.ceil(rhythmPattern.length / 2); // Number of quarter note beats
    for (let beat = 0; beat < totalBeats; beat++) {
      const timeDelay = beat * quarterNoteInterval;
      
      const beatTimeout = setTimeout(() => {
        if (isPlaying) {
          // Highlight the current beat
          highlightNotesBox(beat);
          
          // Play brush drum on quarter notes
          playBrushDrum();
          
          // Stop automatically when we reach the end
          if (beat >= totalBeats - 1) {
            // Schedule stop after the last beat
            setTimeout(() => {
              if (isPlaying) stopPlayback();
            }, quarterNoteInterval);
          }
        }
      }, timeDelay);
      
      playTimeouts.push(beatTimeout);
    }
    
    // Schedule rhythm sounds on eighth notes
    rhythmPattern.forEach((hasSound, index) => {
      const timeDelay = index * eighthNoteInterval;
      
      const rhythmTimeout = setTimeout(() => {
        if (isPlaying && hasSound) {
          // Play triangle tone for words and syncopated beats
          playTriangleTone(eighthNoteInterval * 0.8 / 1000);
        }
      }, timeDelay);
      
      playTimeouts.push(rhythmTimeout);
    });
  }

  function stopPlayback() {
    isPlaying = false;
    currentPlayPosition = 0; // Reset to beginning
    playButton.textContent = '▶';
    playButton.classList.remove('playing');
    
    // Clear all highlights
    clearHighlights();
    
    // Clear all scheduled timeouts
    playTimeouts.forEach(timeout => clearTimeout(timeout));
    playTimeouts = [];
  }

  // Function to show/hide circle boxes
  function updateCircleVisibility() {
    const allCircleBoxes = document.querySelectorAll('.circles');
    allCircleBoxes.forEach(box => {
      if (circleIconActive) {
        box.classList.remove('hidden');
      } else {
        box.classList.add('hidden');
      }
    });
  }

  function createMeasure(lineStart, measureIndex, config) {
    const measure = document.createElement('div');
    measure.className = 'measure';

    // Create beats per measure
    for (let beat = 0; beat < config.beatsPerMeasure; beat++) {
      const i = lineStart + (measureIndex * config.circlesPerMeasure) + (beat * circlesPerBeat);
      
      const group = document.createElement('div');
      group.className = 'group';

      // Circles container
      const circlesDiv = document.createElement('div');
      circlesDiv.className = 'circles';
      if (!circleIconActive) {
        circlesDiv.classList.add('hidden');
      }
      
      const active1 = isPositionActive(i);
      const active2 = isPositionActive(i + 1);
      const isSyncopated = syncopation.includes(i + 1); // Check if second circle is syncopated

      [i, i+1].forEach((idx, circleIndex) => {
        if (idx < words.length) {
          const circle = document.createElement('span');
          circle.className = 'circle';
          
          // Apply appropriate styling
          if (syncopation.includes(idx)) {
            circle.classList.add('syncopated'); // Green for syncopated
          } else if (isPositionActive(idx)) {
            circle.classList.add('active'); // Blue for active
          }
          
          // Single click handler for regular functionality
          circle.addEventListener('click', () => {
            // Don't interfere with syncopated circles
            if (syncopation.includes(idx)) return;
            
            // Check if clicking first circle of a beat breaks syncopation effect
            if (circleIndex === 0) {
              for (const syncPos of syncopation) {
                if (getNextBeatFirstCircle(syncPos) === idx) {
                  toggleSyncopation(syncPos);
                  render();
                  return;
                }
              }
            }
            
            // Special handling for circles affected by syncopation
            if (isAffectedBySyncopation(idx)) {
              syncopationStates[idx] = !syncopationStates[idx];
              
              if (!syncopationStates[idx]) { // Deactivating the note
                  const wordToDisplace = words[idx];
                  if (wordToDisplace !== '-' && wordToDisplace !== '') {
                      words[idx] = '-';
                      words.splice(idx + 1, 0, wordToDisplace);
                  }
              } else { // Activating the note
                  if (idx + 1 < words.length && words[idx] === '-') {
                      const nextWord = words.splice(idx + 1, 1)[0];
                      words[idx] = nextWord;
                  }
              }

            } else {
              // Normal toggle activation logic for non-affected circles
              if (words[idx] === '-' || words[idx] === '') {
                // activate: pull text from the right to fill this position
                let nextWordIndex = -1;
                for (let j = idx + 1; j < words.length; j++) {
                  if (words[j] !== '-' && words[j] !== '') {
                    nextWordIndex = j;
                    break;
                  }
                }
                
                if (nextWordIndex !== -1) {
                  words[idx] = words[nextWordIndex];
                  words[nextWordIndex] = '-';
                } else {
                  words[idx] = ' ';
                }
              } else {
                // deactivate: split word into next position, replace this with dash
                const w = words[idx];
                words.splice(idx + 1, 0, w);
                words[idx] = '-';
              }
            }
            render();
          });
          
          // Double click handler for syncopation (only on second circle of beat)
          if (circleIndex === 1) { // Second circle
            circle.addEventListener('dblclick', (e) => {
              e.preventDefault();
              
              if (canCreateSyncopation(idx)) {
                toggleSyncopation(idx);
                render();
              }
            });
          }
          
          circlesDiv.appendChild(circle);
        }
      });
      group.appendChild(circlesDiv);

      // Notes box - determine which image to show
      const notesBox = document.createElement('div');
      notesBox.className = 'notes-box';
      
      // Store reference to this notes box for highlighting
      const beatIndex = Math.floor(i / 2); // Convert position to beat index
      if (beatIndex < notesBoxElements.length) {
        // Replace existing reference
        notesBoxElements[beatIndex] = notesBox;
      } else {
        // Add new reference
        notesBoxElements.push(notesBox);
      }

      // Determine which image to display
      const syncopationType = getSyncopationType(i);
      
      if (syncopationType === 'SyncopateB') {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateB.svg'));
      } else if (syncopationType === 'SyncopateC') {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateC.svg'));
      } else if (isSyncopated) {
        // Regular syncopated pattern
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateA.svg'));
      } else if (active1 && !active2) {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarternote.svg'));
      } else if (active1 && active2) {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthnotepair.svg'));
      } else if (!active1 && !active2) {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarterrest.svg'));
      } else if (!active1 && active2) {
        notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthrestnote.svg'));
      }

      group.appendChild(notesBox);

      // Words row
      const wordsDiv = document.createElement('div');
      wordsDiv.className = 'words';
      [i, i+1].forEach(idx => {
        if (idx < words.length) {
          const wc = document.createElement('span'); wc.className = 'word-container';
          if (idx === editingIndex) {
            const input = document.createElement('input'); input.type='text'; input.value=words[idx]; input.className='word-input'; wc.appendChild(input); wordsDiv.appendChild(wc);
            setTimeout(()=>{input.focus();input.select();});
            function cleanup(){input.removeEventListener('keydown',onKey);input.removeEventListener('blur',onBlur);} function onKey(e){
              if(e.key==='Enter'){e.preventDefault();words[idx]=input.value;editingIndex=null;cleanup();render();}
              else if(e.key==='Escape'){e.preventDefault();editingIndex=null;cleanup();render();}
              else if(e.key===' '||e.code==='Space'){e.preventDefault();const t=input.value===''?'-':input.value;words[idx]=t;editingIndex=idx+1;if(editingIndex>=words.length)words.push('-');cleanup();render();}
              else if((e.key==='Backspace'||e.key==='Delete')&&input.value===''){e.preventDefault();words.splice(idx,1);editingIndex=Math.max(idx-1,0);if(words.length===0){words=['-'];editingIndex=0;}cleanup();render();}
            } function onBlur(){words[idx]=input.value;editingIndex=null;cleanup();render();}
            input.addEventListener('keydown',onKey);input.addEventListener('blur',onBlur);
          } else {
            const span = document.createElement('span');
            // For affected positions, show word only if the position is active
            if (isAffectedBySyncopation(idx)) {
              if (isPositionActive(idx)) {
                span.textContent = words[idx];
                span.className = 'word';
                if (words[idx] === '-') {
                  span.classList.add('rest');
                }
              } else {
                span.textContent = '';
                span.className = 'word rest';
              }
            } else {
              span.textContent = words[idx];
              span.className = 'word';
              if (words[idx] === '-') {
                span.classList.add('rest');
              }
            }
            span.addEventListener('click',()=>{editingIndex=idx;render();});
            wc.appendChild(span);
            wordsDiv.appendChild(wc);
          }
        }
      });
      group.appendChild(wordsDiv);
      measure.appendChild(group);
    }
    return measure;
  }

  function render() {
    container.innerHTML = '';
    notesBoxElements = []; // Reset the notes box references
    
    const config = getLayoutConfig();
    
    // Ensure we have enough words to fill complete lines
    while (words.length % config.circlesPerLine !== 0) {
      words.push('-');
    }

    // Clean up syncopation array - remove invalid positions
    syncopation = syncopation.filter(pos => pos < words.length && canCreateSyncopation(pos));

    // Calculate total number of measures and find the last one
    const totalMeasures = Math.ceil(words.length / config.circlesPerMeasure);

    let currentMeasureNumber = 0;

    // Process words in groups based on circles per line
    for (let lineStart = 0; lineStart < words.length; lineStart += config.circlesPerLine) {
      const line = document.createElement('div');
      line.className = 'line';

      // Create measures for this line
      for (let measureIndex = 0; measureIndex < config.measuresPerLine; measureIndex++) {
        currentMeasureNumber++;
        
        // Create the measure
        line.appendChild(createMeasure(lineStart, measureIndex, config));
        
        // Add measure divider after each measure
        const isLastMeasure = currentMeasureNumber === totalMeasures;
        const divider = document.createElement('div');
        
        if (isLastMeasure) {
          // Double bar line for the final measure
          divider.className = 'final-measure-divider';
        } else {
          // Regular single bar line for all other measures
          divider.className = 'measure-divider';
        }
        
        line.appendChild(divider);
      }

      container.appendChild(line);
    }
  }

  // Re-render on window resize to adjust layout
  window.addEventListener('resize', render);

  render();
})();
