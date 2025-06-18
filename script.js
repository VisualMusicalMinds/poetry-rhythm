(function() {
  const container = document.getElementById('poem');

  const lyricsLibrary = {
    'hickory-dickory-dock': [
      'Hick-', 'o-', 'ry', 'dick-', 'o-', 'ry', 'dock,',
      'The', 'mouse', 'ran', 'up', 'the', 'clock.',
      'The', 'clock', 'struck', 'one,',
      'The', 'mouse', 'ran', 'down,',
      'Hick-', 'o-', 'ry', 'dick-', 'o-', 'ry', 'dock.'
    ],
    'jack-and-jill': [
      'Jack', 'and', 'Jill', 'went', 'up', 'the', 'hill',
      'To', 'fetch', 'a', 'pail', 'of', 'wa-', 'ter.',
      'Jack', 'fell', 'down', 'and', 'broke', 'his', 'crown,',
      'And', 'Jill', 'came', 'tum-', 'bling', 'af-', 'ter.'
    ],
    'mary-had-a-little-lamb': [
      'Ma-', 'ry', 'had', 'a', 'lit-', 'tle', 'lamb,',
      'Its', 'fleece', 'was', 'white', 'as', 'snow;',
      'And', 'ev-', 'ery-', 'where', 'that', 'Ma-', 'ry', 'went,',
      'The', 'lamb', 'was', 'sure', 'to', 'go.'
    ],
    'humpty-dumpty': [
      'Hump-', 'ty', 'Dump-', 'ty', 'sat', 'on', 'a', 'wall,',
      'Hump-', 'ty', 'Dump-', 'ty', 'had', 'a', 'great', 'fall.',
      'All', 'the', "king's", 'hors-', 'es', 'and', 'all', 'the', "king's", 'men',
      "Could-", "n't", 'put', 'Hump-', 'ty', 'to-', 'geth-', 'er', 'a-', 'gain.'
    ],
    'baa-baa-black-sheep': [
      'Baa,', 'baa,', 'black', 'sheep,', 'have', 'you', 'an-', 'y', 'wool?',
      'Yes', 'sir,', 'yes', 'sir,', 'three', 'bags', 'full.',
      'One', 'for', 'the', 'mas-', 'ter,', 'one', 'for', 'the', 'dame,',
      'And', 'one', 'for', 'the', 'lit-', 'tle', 'boy', 'who', 'lives', 'down', 'the', 'lane.'
    ],
    'twinkle-twinkle-little-star': [
      'Twin-', 'kle,', 'twin-', 'kle,', 'lit-', 'tle', 'star,',
      'How', 'I', 'won-', 'der', 'what', 'you', 'are!',
      'Up', 'a-', 'bove', 'the', 'world', 'so', 'high,',
      'Like', 'a', 'dia-', 'mond', 'in', 'the', 'sky.',
      'Twin-', 'kle,', 'twin-', 'kle,', 'lit-', 'tle', 'star,',
      'How', 'I', 'won-', 'der', 'what', 'you', 'are!'
    ],
    'little-miss-muffet': [
        'Lit-', 'tle', 'Miss', 'Muf-', 'fet',
        'Sat', 'on', 'a', 'tuf-', 'fet,',
        'Eat-', 'ing', 'her', 'curds', 'and', 'whey;',
        'A-', 'long', 'came', 'a', 'spi-', 'der',
        'Who', 'sat', 'down', 'be-', 'side', 'her',
        'And', 'fright-', 'ened', 'Miss', 'Muf-', 'fet', 'a-', 'way.'
    ],
    'hey-diddle-diddle': [
        'Hey', 'did-', 'dle,', 'did-', 'dle,',
        'The', 'cat', 'and', 'the', 'fid-', 'dle,',
        'The', 'cow', 'jumped', 'o-', 'ver', 'the', 'moon.',
        'The', 'lit-', 'tle', 'dog', 'laughed', 'to', 'see', 'such', 'sport,',
        'And', 'the', 'dish', 'ran', 'a-', 'way', 'with', 'the', 'spoon.'
    ],
    'london-bridge': [
        'Lon-', 'don', 'Bridge', 'is', 'fall-', 'ing', 'down,',
        'Fall-', 'ing', 'down,', 'fall-', 'ing', 'down,',
        'Lon-', 'don', 'Bridge', 'is', 'fall-', 'ing', 'down,',
        'My', 'fair', 'la-', 'dy.',
        'Build', 'it', 'up', 'with', 'wood', 'and', 'clay,',
        'Wood', 'and', 'clay,', 'wood', 'and', 'clay,',
        'Build', 'it', 'up', 'with', 'wood', 'and', 'clay,',
        'My', 'fair', 'la-', 'dy.'
    ],
    'old-mother-hubbard': [
        'Old', 'Moth-', 'er', 'Hub-', 'bard',
        'Went', 'to', 'the', 'cup-', 'board',
        'To', 'give', 'her', 'poor', 'dog', 'a', 'bone;',
        'But', 'when', 'she', 'got', 'there',
        'The', 'cup-', 'board', 'was', 'bare,',
        'And', 'so', 'the', 'poor', 'dog', 'had', 'none.'
    ],
    'this-little-piggy': [
        'This', 'lit-', 'tle', 'pig-', 'gy', 'went', 'to', 'mar-', 'ket,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'stayed', 'home,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'had', 'roast', 'beef,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'had', 'none,',
        'And', 'this', 'lit-', 'tle', 'pig-', 'gy', 'went', '"wee', 'wee', 'wee"',
        'All', 'the', 'way', 'home!'
    ],
    'row-row-row-your-boat': [
        'Row,', 'row,', 'row', 'your', 'boat,',
        'Gent-', 'ly', 'down', 'the', 'stream.',
        'Mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,',
        'Life', 'is', 'but', 'a', 'dream.'
    ],
    'patty-cake': [
        'Pat-', 'a-', 'cake,', 'pat-', 'a-', 'cake,', 'ba-', "ker's", 'man,',
        'Bake', 'me', 'a', 'cake', 'as', 'fast', 'as', 'you', 'can;',
        'Pat', 'it', 'and', 'prick', 'it', 'and', 'mark', 'it', 'with', 'B,',
        'And', 'put', 'it', 'in', 'the', 'ov-', 'en', 'for', 'ba-', 'by', 'and', 'me.'
    ]
  };

  let words = lyricsLibrary['hickory-dickory-dock'].slice(); // Start with default lyrics
  
  let syncopation = []; // Track syncopated positions
  let syncopationStates = {}; // Track the state of affected positions independently
  let editingIndex = null;
  let circleIconActive = true;
  let timeSignatureNumerator = 4;
  let timeSignatureDenominator = 4;
  let isPlaying = false;
  let playTimeouts = [];
  let currentPlayPosition = 0;
  let notesBoxElements = []; // Store references to notes boxes for highlighting
  let beatEnabled = true; // Beat checkbox state
  let rhythmEnabled = true; // Rhythm checkbox state
  let BPM = 82;

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
    const beatInMeasure = Math.floor(positionInMeasure / config.circlesPerBeat);
    const lastBeatOfMeasure = config.beatsPerMeasure - 1;
    
    // Cannot syncopate on the last beat of a measure
    return beatInMeasure !== lastBeatOfMeasure;
  }

  // Check if syncopation conditions are met for a position
  function canCreateSyncopation(position) {
    // Syncopation is disabled in compound time for now.
    if (timeSignatureDenominator === 8) return false;
    
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
  function isPositionActive(position, wordArray) {
    if (isAffectedBySyncopation(position)) {
      return syncopationStates[position] || false;
    } else {
      const word = wordArray[position];
      return word !== '-' && word !== '';
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
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.pow(0.01, i / bufferSize);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.3;
    }
    return buffer;
  }

  function playBrushDrum() {
    if (!beatEnabled) return;
    const ctx = initAudioContext();
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    source.buffer = createBrushDrumSound();
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    source.start();
    source.stop(ctx.currentTime + 0.1);
  }

  // Play triangle wave tone at A2 (110 Hz)
  function playTriangleTone(duration = 0.2) {
    if (!rhythmEnabled) return;
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(110, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  // Get rhythm pattern from current words including syncopation
  function getRhythmPattern() {
    const pattern = [];
    for (let i = 0; i < words.length; i++) {
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
    const floatingPanelHeight = 60;
    const margin = 100;
    const effectiveViewHeight = windowHeight - floatingPanelHeight;
    const isAboveView = elementRect.top < margin;
    const isBelowView = elementRect.bottom > effectiveViewHeight - margin;
    if (isAboveView || isBelowView) {
      const elementTop = elementRect.top + window.pageYOffset;
      const targetY = elementTop - (effectiveViewHeight / 2) + (elementRect.height / 2);
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  }

  // Highlight the notes box for the current beat
  function highlightNotesBox(position) {
    notesBoxElements.forEach(box => box.classList.remove('playing'));
    if (position < notesBoxElements.length) {
      const currentElement = notesBoxElements[position];
      currentElement.classList.add('playing');
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
    const circlesPerBeat = timeSignatureDenominator === 8 ? 3 : 2;
    const beatsPerMeasure = timeSignatureDenominator === 8 ? timeSignatureNumerator / 3 : timeSignatureNumerator;
    
    let measuresPerLine = 1;
    if (timeSignatureDenominator === 4) { // Simple Time
      switch(timeSignatureNumerator) {
        case 4: measuresPerLine = screenWidth > 750 ? 2 : 1; break;
        case 3: measuresPerLine = screenWidth > 600 ? 2 : 1; break;
        case 2:
          if (screenWidth > 900) measuresPerLine = 4;
          else if (screenWidth > 700) measuresPerLine = 3;
          else if (screenWidth > 500) measuresPerLine = 2;
          break;
        case 6: case 5: measuresPerLine = 1; break;
      }
    } else { // Compound Time
      if (timeSignatureNumerator === 6) {
        measuresPerLine = screenWidth > 600 ? 2 : 1;
      } else { // 9/8 and 12/8
        measuresPerLine = 1;
      }
    }
    
    const circlesPerMeasure = beatsPerMeasure * circlesPerBeat;
    return {
      beatsPerMeasure,
      circlesPerBeat,
      circlesPerMeasure,
      measuresPerLine,
      circlesPerLine: measuresPerLine * circlesPerMeasure
    };
  }

  // --- UI ELEMENT SETUP ---

  // Lyrics Dropdown
  const lyricsDropdown = document.getElementById('lyrics-dropdown');
  function populateLyricsDropdown() {
    lyricsDropdown.innerHTML = ''; // Clear existing options
    for (const key in lyricsLibrary) {
      const option = document.createElement('option');
      option.value = key;
      // Format the key for display (e.g., 'hickory-dickory-dock' -> 'Hickory Dickory Dock')
      option.textContent = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      lyricsDropdown.appendChild(option);
    }
  }
  lyricsDropdown.addEventListener('change', (e) => {
    const selectedKey = e.target.value;
    if (lyricsLibrary[selectedKey]) {
      words = lyricsLibrary[selectedKey].slice();
      syncopation = []; // Reset syncopation when changing songs
      syncopationStates = {};
      render();
    }
  });


  // Circle icon button
  const circleIcon = document.getElementById('circle-icon');
  circleIcon.addEventListener('click', () => {
    circleIconActive = !circleIconActive;
    circleIcon.className = `icon-button ${circleIconActive ? 'active' : 'inactive'}`;
    updateCircleVisibility();
  });

  // Time Signature Controls
  const timeSignatureTopBtn = document.getElementById('time-signature-top-btn');
  const timeSignatureBottomBtn = document.getElementById('time-signature-bottom-btn');
  const timeSignatureButton = timeSignatureTopBtn.parentElement;
  
  timeSignatureTopBtn.addEventListener('click', () => {
    if (timeSignatureDenominator === 4) {
      // Cycle through simple time signatures: 4→3→2→6→5→4
      switch(timeSignatureNumerator) {
        case 4: timeSignatureNumerator = 3; break;
        case 3: timeSignatureNumerator = 2; break;
        case 2: timeSignatureNumerator = 6; break;
        case 6: timeSignatureNumerator = 5; break;
        case 5: timeSignatureNumerator = 4; break;
        default: timeSignatureNumerator = 4;
      }
    } else { // Denominator is 8 (compound time)
      // Cycle through compound time signatures: 6→9→12→6
      switch(timeSignatureNumerator) {
        case 6: timeSignatureNumerator = 9; break;
        case 9: timeSignatureNumerator = 12; break;
        case 12: timeSignatureNumerator = 6; break;
        default: timeSignatureNumerator = 6;
      }
    }
    timeSignatureTopBtn.textContent = timeSignatureNumerator;
    render();
  });

  timeSignatureBottomBtn.addEventListener('click', () => {
    if (timeSignatureDenominator === 4) {
      timeSignatureDenominator = 8;
      timeSignatureNumerator = 6; // Default for compound time
    } else {
      timeSignatureDenominator = 4;
      timeSignatureNumerator = 4; // Default for simple time
    }
    timeSignatureTopBtn.textContent = timeSignatureNumerator;
    timeSignatureBottomBtn.textContent = timeSignatureDenominator;
    timeSignatureButton.classList.toggle('compound', timeSignatureDenominator === 8);
    render();
  });

  // BPM Control
  const bpmButton = document.getElementById('bpm-button');
  const bpmValueSpan = document.getElementById('bpm-value');

  bpmButton.addEventListener('click', () => {
    const currentBPM = bpmValueSpan.textContent;
    const input = document.createElement('input');
    input.type = 'number';
    input.value = currentBPM;
    input.className = 'bpm-input';
    
    bpmButton.innerHTML = '';
    bpmButton.appendChild(input);
    input.focus();
    input.select();

    const onUpdate = () => {
      let newValue = parseInt(input.value, 10);
      if (isNaN(newValue) || newValue <= 20) { // Set a minimum BPM
        newValue = 82; // Reset to default if invalid
      }
      BPM = newValue;
      bpmValueSpan.textContent = BPM;
      bpmButton.innerHTML = '';
      bpmButton.appendChild(bpmValueSpan);
      bpmButton.append('\u00A0BPM'); // Add back the " BPM" text
    };

    input.addEventListener('blur', onUpdate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        input.value = currentBPM; // Revert on escape
        input.blur();
      }
    });
  });

  // Play button
  const playButton = document.getElementById('play-button');
  playButton.addEventListener('click', () => {
    if (isPlaying) stopPlayback(); else startPlayback();
  });

  // Checkbox handlers
  const beatCheckbox = document.getElementById('beat-checkbox');
  const rhythmCheckbox = document.getElementById('rhythm-checkbox');
  beatCheckbox.addEventListener('change', (e) => { beatEnabled = e.target.checked; });
  rhythmCheckbox.addEventListener('change', (e) => { rhythmEnabled = e.target.checked; });

  // --- PLAYBACK LOGIC ---

  function startPlayback() {
    initAudioContext();
    isPlaying = true;
    currentPlayPosition = 0;
    playButton.textContent = '⏸';
    playButton.classList.add('playing');

    const rhythmPattern = getRhythmPattern();
    const beatInterval = 60000 / BPM;

    // --- Compound Time Playback ---
    if (timeSignatureDenominator === 8) {
      const eighthNoteInterval = beatInterval / 3;

      const startPoetry = (delay = 0) => {
        const totalBeats = Math.ceil(rhythmPattern.length / 3);

        // Schedule BEAT track (dotted quarter notes)
        for (let beat = 0; beat < totalBeats; beat++) {
          const timeDelay = delay + (beat * beatInterval);
          const beatTimeout = setTimeout(() => {
            if (isPlaying) {
              highlightNotesBox(beat);
              if (beatEnabled) playBrushDrum();
              if (beat >= totalBeats - 1) {
                setTimeout(() => { if (isPlaying) stopPlayback(); }, beatInterval);
              }
            }
          }, timeDelay);
          playTimeouts.push(beatTimeout);
        }

        // Schedule RHYTHM track (eighth notes)
        rhythmPattern.forEach((hasSound, index) => {
          const timeDelay = delay + (index * eighthNoteInterval);
          const rhythmTimeout = setTimeout(() => {
            if (isPlaying && hasSound) playTriangleTone(eighthNoteInterval * 0.8 / 1000);
          }, timeDelay);
          playTimeouts.push(rhythmTimeout);
        });
      };

      if (beatEnabled) {
        const countInBeats = 4;
        for (let i = 0; i < countInBeats; i++) {
          const timeDelay = i * beatInterval;
          const countInTimeout = setTimeout(() => { if (isPlaying) playBrushDrum(); }, timeDelay);
          playTimeouts.push(countInTimeout);
        }
        startPoetry(countInBeats * beatInterval);
      } else {
        startPoetry(0);
      }

    // --- Simple Time Playback ---
    } else {
      const eighthNoteInterval = beatInterval / 2;
      
      const startPoetry = (delay = 0) => {
        const totalBeats = Math.ceil(rhythmPattern.length / 2);
        
        // Schedule BEAT track (quarter notes)
        for (let beat = 0; beat < totalBeats; beat++) {
          const timeDelay = delay + (beat * beatInterval);
          const beatTimeout = setTimeout(() => {
            if (isPlaying) {
              highlightNotesBox(beat);
              if (beatEnabled) playBrushDrum();
              if (beat >= totalBeats - 1) {
                setTimeout(() => { if (isPlaying) stopPlayback(); }, beatInterval);
              }
            }
          }, timeDelay);
          playTimeouts.push(beatTimeout);
        }

        // Schedule RHYTHM track (eighth notes)
        rhythmPattern.forEach((hasSound, index) => {
          const timeDelay = delay + (index * eighthNoteInterval);
          const rhythmTimeout = setTimeout(() => {
            if (isPlaying && hasSound) playTriangleTone(eighthNoteInterval * 0.8 / 1000);
          }, timeDelay);
          playTimeouts.push(rhythmTimeout);
        });
      };

      if (beatEnabled) {
        const countInBeats = 4;
        for (let i = 0; i < countInBeats; i++) {
          const timeDelay = i * beatInterval;
          const countInTimeout = setTimeout(() => { if (isPlaying) playBrushDrum(); }, timeDelay);
          playTimeouts.push(countInTimeout);
        }
        startPoetry(countInBeats * beatInterval);
      } else {
        startPoetry(0);
      }
    }
  }

  function stopPlayback() {
    isPlaying = false;
    currentPlayPosition = 0;
    playButton.textContent = '▶';
    playButton.classList.remove('playing');
    clearHighlights();
    playTimeouts.forEach(timeout => clearTimeout(timeout));
    playTimeouts = [];
  }

  function updateCircleVisibility() {
    document.querySelectorAll('.circles').forEach(box => {
      box.classList.toggle('hidden', !circleIconActive);
    });
  }

  // --- RENDERING LOGIC ---

  function createMeasure(lineStart, measureIndex, config, displayWords) {
    const measure = document.createElement('div');
    measure.className = 'measure';

    for (let beat = 0; beat < config.beatsPerMeasure; beat++) {
        const beatStartPosition = lineStart + (measureIndex * config.circlesPerMeasure) + (beat * config.circlesPerBeat);
        if (beatStartPosition >= displayWords.length) break;

        const group = document.createElement('div');
        group.className = 'group';

        const circlesDiv = document.createElement('div');
        circlesDiv.className = 'circles';
        if (!circleIconActive) circlesDiv.classList.add('hidden');

        for (let circleIndex = 0; circleIndex < config.circlesPerBeat; circleIndex++) {
            const idx = beatStartPosition + circleIndex;
            const circle = document.createElement('span');
            circle.className = 'circle';
            if (syncopation.includes(idx)) {
                circle.classList.add('syncopated');
            } else if (isPositionActive(idx, displayWords)) {
                circle.classList.add('active');
            }
            circle.addEventListener('click', () => {
                while (words.length <= idx) {
                    words.push('-');
                }

                if (syncopation.includes(idx)) return;
                if (config.circlesPerBeat === 2 && circleIndex === 0) {
                    for (const syncPos of syncopation) {
                        if (getNextBeatFirstCircle(syncPos) === idx) {
                            toggleSyncopation(syncPos);
                            render();
                            return;
                        }
                    }
                }
                if (isAffectedBySyncopation(idx)) {
                    syncopationStates[idx] = !syncopationStates[idx];
                    if (!syncopationStates[idx]) {
                        const wordToDisplace = words[idx];
                        if (wordToDisplace !== '-' && wordToDisplace !== '') {
                            words[idx] = '-';
                            words.splice(idx + 1, 0, wordToDisplace);
                        }
                    } else {
                        if (idx + 1 < words.length && words[idx] === '-') {
                            const nextWord = words.splice(idx + 1, 1)[0];
                            words[idx] = nextWord;
                        }
                    }
                } else {
                    if (words[idx] === '-' || words[idx] === '') {
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
                        const w = words[idx];
                        words.splice(idx + 1, 0, w);
                        words[idx] = '-';
                    }
                }
                render();
            });
            if (config.circlesPerBeat === 2 && circleIndex === 1) {
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
        group.appendChild(circlesDiv);

        const notesBox = document.createElement('div');
        notesBox.className = 'notes-box';
        const beatIndex = Math.floor(beatStartPosition / config.circlesPerBeat);
        if (beatIndex < notesBoxElements.length) {
            notesBoxElements[beatIndex] = notesBox;
        } else {
            notesBoxElements.push(notesBox);
        }

        if (config.circlesPerBeat === 2) {
            const i = beatStartPosition;
            const active1 = isPositionActive(i, displayWords);
            const active2 = isPositionActive(i + 1, displayWords);
            const isSyncopated = syncopation.includes(i + 1);
            const syncopationType = getSyncopationType(i);

            if (syncopationType === 'SyncopateB') notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateB.svg'));
            else if (syncopationType === 'SyncopateC') notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateC.svg'));
            else if (isSyncopated) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateA.svg'));
            else if (active1 && !active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarternote.svg'));
            else if (active1 && active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthnotepair.svg'));
            else if (!active1 && !active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarterrest.svg'));
            else if (!active1 && active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthrestnote.svg'));

        } else if (config.circlesPerBeat === 3) {
            notesBox.classList.add('compound');
            const i = beatStartPosition;
            const active1 = isPositionActive(i, displayWords);
            const active2 = isPositionActive(i + 1, displayWords);
            const active3 = isPositionActive(i + 2, displayWords);

            const pattern = (active1 ? 'X' : 'O') + (active2 ? 'X' : 'O') + (active3 ? 'X' : 'O');

            let imageUrl = '';
            switch (pattern) {
                case 'XXX': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-XXX.svg'; break;
                case 'OOO': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-OOO.svg'; break;
                case 'XOO': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-XOO.svg'; break;
                case 'XXO': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-XXO.svg'; break;
                case 'XOX': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-XOX.svg'; break;
                case 'OXO': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-OXO.svg'; break;
                case 'OOX': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-OOX.svg'; break;
                case 'OXX': imageUrl = 'https://visualmusicalminds.github.io/images/Wordrhythms-OXX.svg'; break;
            }
            if (imageUrl) {
                notesBox.appendChild(createImage(imageUrl));
            }
        }
        group.appendChild(notesBox);

        const wordsDiv = document.createElement('div');
        wordsDiv.className = 'words';
        for (let circleIndex = 0; circleIndex < config.circlesPerBeat; circleIndex++) {
            const idx = beatStartPosition + circleIndex;
            const wc = document.createElement('span');
            wc.className = 'word-container';
            if (idx === editingIndex) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = words[idx];
                input.className = 'word-input';
                wc.appendChild(input);
                wordsDiv.appendChild(wc);
                setTimeout(() => { input.focus(); input.select(); });
                function cleanup() { input.removeEventListener('keydown', onKey); input.removeEventListener('blur', onBlur); }
                function onKey(e) {
                    if (e.key === 'Enter') { e.preventDefault(); words[idx] = input.value; editingIndex = null; cleanup(); render(); }
                    else if (e.key === 'Escape') { e.preventDefault(); editingIndex = null; cleanup(); render(); }
                    else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); const t = input.value === '' ? '-' : input.value; words[idx] = t; editingIndex = idx + 1; cleanup(); render(); }
                    else if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') { e.preventDefault(); words.splice(idx, 1); editingIndex = Math.max(idx - 1, 0); if (words.length === 0) { words = ['-']; editingIndex = 0; } cleanup(); render(); }
                }
                function onBlur() { words[idx] = input.value; editingIndex = null; cleanup(); render(); }
                input.addEventListener('keydown', onKey);
                input.addEventListener('blur', onBlur);
            } else {
                const span = document.createElement('span');
                const word = displayWords[idx];
                if (isAffectedBySyncopation(idx) && !isPositionActive(idx, displayWords)) {
                    span.textContent = '';
                    span.className = 'word rest';
                } else {
                    span.textContent = word;
                    span.className = 'word';
                    if (word === '-') span.classList.add('rest');
                }
                span.addEventListener('click', () => {
                    while (words.length <= idx) {
                        words.push('-');
                    }
                    editingIndex = idx;
                    render();
                });
                wc.appendChild(span);
                wordsDiv.appendChild(wc);
            }
        }
        group.appendChild(wordsDiv);
        measure.appendChild(group);
    }
    return measure;
  }

  function render() {
    container.innerHTML = '';
    notesBoxElements = [];
    const config = getLayoutConfig();

    const displayWords = [...words];
    if (config.circlesPerBeat > 0 && displayWords.length % config.circlesPerBeat !== 0) {
        const paddingNeeded = config.circlesPerBeat - (displayWords.length % config.circlesPerBeat);
        for (let i = 0; i < paddingNeeded; i++) {
            displayWords.push('-');
        }
    }
    
    const circlesPerLine = config.measuresPerLine * config.circlesPerMeasure;

    for (let lineStart = 0; lineStart < displayWords.length; lineStart += circlesPerLine) {
        const line = document.createElement('div');
        line.className = 'line';
        for (let measureIndex = 0; measureIndex < config.measuresPerLine; measureIndex++) {
            const measureStart = lineStart + (measureIndex * config.circlesPerMeasure);
            if (measureStart >= displayWords.length) break;

            line.appendChild(createMeasure(lineStart, measureIndex, config, displayWords));

            const isLastMeasureInSong = (measureStart + config.circlesPerMeasure >= displayWords.length);

            if (!isLastMeasureInSong) {
                const divider = document.createElement('div');
                divider.className = 'measure-divider';
                line.appendChild(divider);
            } else {
                const finalDivider = document.createElement('div');
                finalDivider.className = 'final-measure-divider';
                line.appendChild(finalDivider);
            }
        }
        container.appendChild(line);
    }
  }

  // --- INITIALIZATION ---
  populateLyricsDropdown();
  render();
})();
