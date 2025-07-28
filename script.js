(function() {
  const container = document.getElementById('poem');

  const lyricsLibrary = {
    'new-song': [
        'Start', 'Here'
    ],
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
  let sixteenthNoteModeActive = false;
  let hasPickupMeasure = false;
  let isPlaying = false;
  let playTimeouts = [];
  let currentPlayPosition = 0;
  let notesBoxElements = []; // Store references to notes boxes for highlighting
  let beatEnabled = true; // Beat checkbox state
  let rhythmEnabled = true; // Rhythm checkbox state
  let BPM = 82;
  let textImportMode = 'replace'; // 'add' or 'replace'
  let savedTextInput = ''; // Store the text from the modal

  // Audio context for generating sounds
  let audioContext = null;

  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  // Convert the current words array to text with proper spacing that reflects rhythm
  function wordsToText() {
    let textWords = [];
    for (let i = 0; i < words.length; i++) {
        const syncopationIndex = syncopation.indexOf(i + 1);
        if (syncopationIndex !== -1) {
            const w1 = words[i] === '-' ? '\\' : words[i];
            const w2 = words[i + 1] === '-' ? '\\' : words[i + 1];
            const w3 = words[i + 3] === '-' ? '\\' : words[i + 3];
            textWords.push(`[${w1} ${w2} ${w3}]`);
            i += 3; // Skip the next 3 positions
        } else {
            const word = words[i];
            textWords.push((word === '-' || word === '') ? '\\' : word);
        }
    }
    return textWords.join(' ');
  }

  // Copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        textArea.remove();
        return false;
      }
    }
  }

  // Copy canvas to clipboard
  async function copyCanvasToClipboard(canvas) {
    try {
      // Convert canvas to blob
      return new Promise(resolve => {
        canvas.toBlob(async (blob) => {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            resolve(true);
          } catch (err) {
            console.error('Failed to copy image to clipboard:', err);
            resolve(false);
          }
        }, 'image/png');
      });
    } catch (err) {
      console.error('Clipboard API not supported:', err);
      return false;
    }
  }

  // Capture visual and copy to clipboard
  async function captureVisual() {
    const copyVisualBtn = document.getElementById('copy-visual-btn');
    const originalText = copyVisualBtn.textContent;
    
    try {
      // Add capturing class to hide interactive elements
      document.body.classList.add('capturing');
      
      // Show loading state
      copyVisualBtn.textContent = '⏳';
      copyVisualBtn.style.backgroundColor = '#ffc107';
      
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Capture the poem area
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
      });
      
      // Try to copy to clipboard
      const success = await copyCanvasToClipboard(canvas);
      
      if (success) {
        copyVisualBtn.textContent = '✓';
        copyVisualBtn.style.backgroundColor = '#28a745';
      } else {
        // Fallback: download the image
        const link = document.createElement('a');
        link.download = 'rhythm-notation.png';
        link.href = canvas.toDataURL();
        link.click();
        
        copyVisualBtn.textContent = '💾';
        copyVisualBtn.style.backgroundColor = '#17a2b8';
      }
      
    } catch (error) {
      console.error('Failed to capture visual:', error);
      copyVisualBtn.textContent = '✗';
      copyVisualBtn.style.backgroundColor = '#dc3545';
    } finally {
      // Remove capturing class
      document.body.classList.remove('capturing');
      
      // Reset button after 2 seconds
      setTimeout(() => {
        copyVisualBtn.textContent = originalText;
        copyVisualBtn.style.backgroundColor = '';
      }, 2000);
    }
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
    let circlesPerBeat = timeSignatureDenominator === 8 ? 3 : 2;
    if (timeSignatureDenominator === 4 && sixteenthNoteModeActive) {
        circlesPerBeat = 4;
    }
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

  // Panel Toggle Button
  const panelToggleButton = document.getElementById('panel-toggle-button');
  const floatingPanel = document.getElementById('floating-panel');

  function updatePoemMargin() {
    const isPanelCollapsed = floatingPanel.classList.contains('collapsed');
    const isSmallScreen = window.innerWidth <= 720;
    
    if (isPanelCollapsed) {
      container.style.marginBottom = '40px';
    } else {
      container.style.marginBottom = isSmallScreen ? '150px' : '80px';
    }
  }


  panelToggleButton.addEventListener('click', () => {
    floatingPanel.classList.toggle('collapsed');
    panelToggleButton.classList.toggle('collapsed');
    updatePoemMargin();
  });


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
    lyricsDropdown.value = 'hickory-dickory-dock'; // Set default selection
  }
  lyricsDropdown.addEventListener('change', (e) => {
    const selectedKey = e.target.value;
    if (lyricsLibrary[selectedKey]) {
      words = lyricsLibrary[selectedKey].slice();
      syncopation = []; // Reset syncopation when changing songs
      syncopationStates = {};
      hasPickupMeasure = false; // Reset pickup on song change
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
    updateSixteenthNoteButtonState();
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
      if (newValue > 600) { // Set a maximum BPM
        newValue = 600;
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

  // Copy Visual button
  const copyVisualBtn = document.getElementById('copy-visual-btn');
  copyVisualBtn.addEventListener('click', captureVisual);

  // Paragraph (text input modal) setup
  const paragraphBtn = document.getElementById('paragraph-btn');
  const modal = document.getElementById('text-input-modal');
  const multiLineInput = document.getElementById('multi-line-input');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const toggleAddBtn = document.getElementById('toggle-add-btn');
  const toggleReplaceBtn = document.getElementById('toggle-replace-btn');

  function openModal() {
      // Generate the metadata header
      const timeSig = `${timeSignatureNumerator}/${timeSignatureDenominator}`;
      let sixteenthStatus = 'no';
      if (timeSignatureDenominator === 4 && sixteenthNoteModeActive) {
          sixteenthStatus = 'yes';
      }
      const header = `[BPM:${BPM} \\ Time Signature: ${timeSig} \\ 16th notes: ${sixteenthStatus}]`;

      // Generate the body text, handling pickup measures and syncopation
      let bodyText;
      const textWithSyncopation = wordsToText();

      if (hasPickupMeasure) {
          const config = getLayoutConfig();
          const wordTokens = textWithSyncopation.split(' ');
          const pickupText = wordTokens.slice(0, config.circlesPerBeat).join(' ');
          const remainingText = wordTokens.slice(config.circlesPerBeat).join(' ');
          bodyText = `${pickupText} | ${remainingText}`;
      } else {
          bodyText = textWithSyncopation;
      }

      const fullText = `${header}\n${bodyText}`;
      multiLineInput.value = fullText;
      
      savedTextInput = fullText;
      modal.style.display = 'flex';
  }

  function closeModal() {
      modal.style.display = 'none';
  }

  paragraphBtn.addEventListener('click', openModal);
  modalCancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModal();
      }
  });

  toggleAddBtn.addEventListener('click', () => {
      textImportMode = 'add';
      toggleAddBtn.classList.add('active');
      toggleReplaceBtn.classList.remove('active');
  });

  toggleReplaceBtn.addEventListener('click', () => {
      textImportMode = 'replace';
      toggleReplaceBtn.classList.add('active');
      toggleAddBtn.classList.remove('active');
  });

  // Copy button functionality
  modalCopyBtn.addEventListener('click', async () => {
      const textToCopy = multiLineInput.value;
      const success = await copyToClipboard(textToCopy);
      
      // Visual feedback
      const originalText = modalCopyBtn.innerHTML;
      if (success) {
          modalCopyBtn.innerHTML = '<div class="copy-icon copied">✓</div>';
          modalCopyBtn.style.backgroundColor = '#28a745';
      } else {
          modalCopyBtn.innerHTML = '<div class="copy-icon error">✗</div>';
          modalCopyBtn.style.backgroundColor = '#dc3545';
      }
      
      // Reset after 1 second
      setTimeout(() => {
          modalCopyBtn.innerHTML = originalText;
          modalCopyBtn.style.backgroundColor = '';
      }, 1000);
  });
  
  modalSubmitBtn.addEventListener('click', () => {
      const text = multiLineInput.value;
      if (text) {
          savedTextInput = text;
          const lines = text.split('\n');
          let firstLine = lines[0];
          let contentText;

          if (firstLine.startsWith('[') && firstLine.endsWith(']')) {
              const settingsStr = firstLine.slice(1, -1);
              
              const bpmMatch = settingsStr.match(/BPM:(\d+)/);
              if (bpmMatch && bpmMatch[1]) {
                  let newBPM = parseInt(bpmMatch[1], 10);
                  if (!isNaN(newBPM)) {
                      if (newBPM > 600) newBPM = 600;
                      if (newBPM <= 20) newBPM = 21;
                      BPM = newBPM;
                      bpmValueSpan.textContent = BPM;
                  }
              }

              const tsMatch = settingsStr.match(/Time Signature: (\d+)\/(\d+)/);
              if (tsMatch && tsMatch[1] && tsMatch[2]) {
                  const newNumerator = parseInt(tsMatch[1], 10);
                  const newDenominator = parseInt(tsMatch[2], 10);
                  if (!isNaN(newNumerator) && !isNaN(newDenominator)) {
                      timeSignatureNumerator = newNumerator;
                      timeSignatureDenominator = newDenominator;
                      timeSignatureTopBtn.textContent = newNumerator;
                      timeSignatureBottomBtn.textContent = newDenominator;
                      timeSignatureButton.classList.toggle('compound', newDenominator === 8);
                  }
              }

              const sixteenthMatch = settingsStr.match(/16th notes: (yes|no)/);
              if (sixteenthMatch && sixteenthMatch[1]) {
                  if (timeSignatureDenominator === 8) {
                      sixteenthNoteModeActive = false;
                  } else {
                      sixteenthNoteModeActive = (sixteenthMatch[1] === 'yes');
                  }
                  sixteenthNoteBtn.classList.toggle('active', sixteenthNoteModeActive);
              }
              updateSixteenthNoteButtonState();
              
              contentText = lines.slice(1).join('\n');
          } else {
              contentText = text;
          }
          
          if (contentText.includes('|')) {
              hasPickupMeasure = true;
              contentText = contentText.replace(/\|/g, ''); // Use regex to remove all instances
          } else {
              hasPickupMeasure = false;
          }

          const newSyncopation = [];
          const newSyncopationStates = {};
          const finalWords = [];
          
          const tokens = contentText.trim().replace(/\n/g, ' ').split(/(\[[^\]]+\])|\s+/).filter(Boolean);

          for(let i=0; i<tokens.length; i++) {
              let token = tokens[i].trim();
              if (token.startsWith('[') && token.endsWith(']')) {
                  const syncGroup = token.slice(1, -1).split(/\s+/).filter(Boolean);
                  const w1 = syncGroup[0] || '-';
                  const w2 = syncGroup[1] || '-';
                  const w3 = syncGroup[2] || '-';

                  const syncStartIndex = finalWords.length;
                  const syncTriggerPos = syncStartIndex + 1;
                  const affectedBeatStart = syncStartIndex + 2;

                  newSyncopation.push(syncTriggerPos);
                  
                  finalWords.push(w1 === '\\' ? '-' : w1);
                  finalWords.push(w2 === '\\' ? '-' : w2);
                  finalWords.push('-');
                  finalWords.push(w3 === '\\' ? '-' : w3);

                  newSyncopationStates[affectedBeatStart] = false;
                  newSyncopationStates[affectedBeatStart + 1] = (w3 !== '-' && w3 !== '\\');
              } else {
                  finalWords.push(token === '\\' ? '-' : token);
              }
          }

          if (textImportMode === 'replace') {
              words = finalWords;
              syncopation = newSyncopation;
              syncopationStates = newSyncopationStates;
          } else {
              words = words.concat(finalWords);
          }
          render();
      }
      closeModal();
  });

  // 16th Note Button
  const sixteenthNoteBtn = document.getElementById('sixteenth-note-btn');
  sixteenthNoteBtn.addEventListener('click', () => {
      if (timeSignatureDenominator === 4) {
          sixteenthNoteModeActive = !sixteenthNoteModeActive;
          sixteenthNoteBtn.classList.toggle('active', sixteenthNoteModeActive);
          render();
      }
  });

  function updateSixteenthNoteButtonState() {
      if (timeSignatureDenominator === 8) {
          sixteenthNoteModeActive = false;
          sixteenthNoteBtn.classList.remove('active');
          sixteenthNoteBtn.classList.add('disabled');
      } else {
          sixteenthNoteBtn.classList.remove('disabled');
      }
  }


  // --- PLAYBACK LOGIC ---

  function startPlayback() {
    initAudioContext();
    isPlaying = true;
    currentPlayPosition = 0;
    playButton.textContent = '⏸';
    playButton.classList.add('playing');

    const rhythmPattern = getRhythmPattern();
    const beatInterval = 60000 / BPM;

    const startPoetry = (delay = 0) => {
        let noteInterval, notesPerBeat;
        
        if (timeSignatureDenominator === 8) {
            noteInterval = beatInterval / 3;
            notesPerBeat = 3;
        } else {
            noteInterval = sixteenthNoteModeActive ? beatInterval / 4 : beatInterval / 2;
            notesPerBeat = sixteenthNoteModeActive ? 4 : 2;
        }
        
        const totalBeats = Math.ceil(rhythmPattern.length / notesPerBeat);
        
        // Schedule BEAT track
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

        // Schedule RHYTHM track
        rhythmPattern.forEach((hasSound, index) => {
          const timeDelay = delay + (index * noteInterval);
          const rhythmTimeout = setTimeout(() => {
            if (isPlaying && hasSound) playTriangleTone(noteInterval * 0.8 / 1000);
          }, timeDelay);
          playTimeouts.push(rhythmTimeout);
        });
    };

    if (beatEnabled) {
        let countInBeats = hasPickupMeasure ? 3 : 4;
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

  function createBeatGroup(beatStartPosition, config, displayWords) {
    const group = document.createElement('div');
    group.className = 'group';

    // Add dblclick listener only to the very first beat group of the song
    if (beatStartPosition === 0) {
        group.addEventListener('dblclick', (e) => {
            e.preventDefault();
            hasPickupMeasure = !hasPickupMeasure;
            render();
        });
    }

    const circlesDiv = document.createElement('div');
    circlesDiv.className = 'circles';
    if (!circleIconActive) circlesDiv.classList.add('hidden');
    
    if (beatStartPosition === 0 && hasPickupMeasure) {
        circlesDiv.classList.add('pickup');
    }

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

            // If the user clicks the green syncopation trigger, undo it.
            if (syncopation.includes(idx)) {
                const syncopationIndex = syncopation.indexOf(idx);
                syncopation.splice(syncopationIndex, 1);
                
                // Remove the placeholder rest and clean up states
                words.splice(idx + 1, 1);
                delete syncopationStates[idx + 1];
                delete syncopationStates[idx + 2];
                
                render();
                return;
            }

            if (isAffectedBySyncopation(idx)) {
                syncopationStates[idx] = !syncopationStates[idx];
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

    if (config.circlesPerBeat === 4) {
        notesBox.classList.add('sixteenth');
        const i = beatStartPosition;
        const active1 = isPositionActive(i, displayWords);
        const active2 = isPositionActive(i + 1, displayWords);
        const active3 = isPositionActive(i + 2, displayWords);
        const active4 = isPositionActive(i + 3, displayWords);
        const pattern = (active1 ? 'X' : 'O') + (active2 ? 'X' : 'O') + (active3 ? 'X' : 'O') + (active4 ? 'X' : 'O');
        const imageUrl = `https://visualmusicalminds.github.io/images/Wordrhythms-${pattern}.svg`;
        notesBox.appendChild(createImage(imageUrl));
    } else if (config.circlesPerBeat === 2) {
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
            input.value = displayWords[idx];
            input.className = 'word-input';
            wc.appendChild(input);
            wordsDiv.appendChild(wc);
            setTimeout(() => { input.focus(); input.select(); });
            function cleanup() { input.removeEventListener('keydown', onKey); input.removeEventListener('blur', onBlur); }
            function onKey(e) {
                if (e.key === 'Enter') { e.preventDefault(); words[idx] = input.value; editingIndex = null; cleanup(); render(); }
                else if (e.key === 'Escape') { e.preventDefault(); editingIndex = null; cleanup(); render(); }
                else if (e.key === ' ' || e.code === 'Space') { 
                    e.preventDefault(); 
                    words[idx] = input.value === '' ? '-' : input.value;
                    editingIndex = idx + 1; 
                    if (editingIndex >= words.length) {
                        words.push('-');
                    }
                    cleanup(); 
                    render();
                }
                else if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') { 
                  e.preventDefault(); 
                  words.splice(idx, 1); 
                  editingIndex = Math.max(idx - 1, 0); 
                  if (words.length === 0) {
                    words.push('-');
                  }
                  cleanup(); 
                  render(); 
                }
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
    return group;
  }

  function createDivider(isFinal = false) {
    const divider = document.createElement('div');
    divider.className = isFinal ? 'final-measure-divider' : 'measure-divider';
    return divider;
  }

  function validateSyncopationPositions() {
      const config = getLayoutConfig();
      const syncsToDissolve = [];

      for (const syncTriggerPos of syncopation) {
          const startIndex = syncTriggerPos - 1;
          const isDownbeat = startIndex % 2 === 0;
          const posInMeasure = startIndex % config.circlesPerMeasure;
          const beatInMeasure = Math.floor(posInMeasure / config.circlesPerBeat);
          const hasSpace = beatInMeasure < config.beatsPerMeasure - 1;
          const isValidTimeSig = config.circlesPerBeat === 2;

          if (!isDownbeat || !hasSpace || !isValidTimeSig) {
              syncsToDissolve.push(syncTriggerPos);
          }
      }

      if (syncsToDissolve.length === 0) {
          return false; // No changes were made
      }

      const newWords = [];
      let i = 0;
      while (i < words.length) {
          const currentSyncTrigger = i + 1;
          if (syncopation.includes(currentSyncTrigger) && syncsToDissolve.includes(currentSyncTrigger)) {
              // This is an invalid syncopation, dissolve it.
              newWords.push(words[i], words[i+1], words[i+3]);
              i += 4;
          } else {
              newWords.push(words[i]);
              i++;
          }
      }
      words = newWords;

      // Filter out the dissolved syncopations
      syncopation = syncopation.filter(pos => !syncsToDissolve.includes(pos));
      
      // Clear out old states (simpler than trying to remap them)
      syncopationStates = {};

      return true; // Changes were made
  }

  function render() {
    // If validation makes changes, we need to re-render to show them.
    // This prevents trying to render a broken state.
    if (validateSyncopationPositions()) {
        // The validation function changed the arrays, so we immediately call render again
        // with the corrected data. The second time, validation will pass and the
        // function will return false, allowing the rest of the render to proceed.
        render();
        return;
    }

    container.innerHTML = '';
    notesBoxElements = [];
    updateSixteenthNoteButtonState();
    const config = getLayoutConfig();

    const displayWords = [...words];
    
    let circlesToPad;
    if (hasPickupMeasure) {
        const bodyLength = displayWords.length > config.circlesPerBeat ? displayWords.length - config.circlesPerBeat : 0;
        circlesToPad = (config.circlesPerMeasure - (bodyLength % config.circlesPerMeasure)) % config.circlesPerMeasure;
    } else {
        circlesToPad = (config.circlesPerMeasure - (displayWords.length % config.circlesPerMeasure)) % config.circlesPerMeasure;
    }
    if (displayWords.length > 0 || circlesToPad > 0) {
        for (let i = 0; i < circlesToPad; i++) {
            displayWords.push('-');
        }
    }
    
    const allBeatGroups = [];
    for (let i = 0; i < displayWords.length; i += config.circlesPerBeat) {
        allBeatGroups.push(createBeatGroup(i, config, displayWords));
    }

    if (allBeatGroups.length === 0) return;

    let currentBeatIndex = 0;
    while(currentBeatIndex < allBeatGroups.length) {
        const line = document.createElement('div');
        line.className = 'line';
        
        let beatsOnThisLine = 0;
        let measuresOnThisLine = 0;
        
        if (currentBeatIndex === 0 && hasPickupMeasure) {
            // Pickup beat
            line.appendChild(allBeatGroups[currentBeatIndex++]);
            line.appendChild(createDivider());
            beatsOnThisLine = 1;
        }

        // Add full measures
        const measuresPerLine = (currentBeatIndex === 0 && hasPickupMeasure) ? 1 : config.measuresPerLine;
        
        while(measuresOnThisLine < measuresPerLine && currentBeatIndex < allBeatGroups.length) {
            const measure = document.createElement('div');
            measure.className = 'measure';
            for(let i=0; i < config.beatsPerMeasure && currentBeatIndex < allBeatGroups.length; i++) {
                measure.appendChild(allBeatGroups[currentBeatIndex++]);
            }
            line.appendChild(measure);
            measuresOnThisLine++;

            if (measuresOnThisLine < measuresPerLine && currentBeatIndex < allBeatGroups.length) {
                line.appendChild(createDivider());
            }
        }
        
        line.appendChild(createDivider(currentBeatIndex >= allBeatGroups.length));
        container.appendChild(line);
    }
  }

  // --- INITIALIZATION ---
  populateLyricsDropdown();
  updatePoemMargin();
  window.addEventListener('resize', updatePoemMargin);
  // Set initial state of toggle buttons
  toggleReplaceBtn.classList.add('active');
  toggleAddBtn.classList.remove('active');
  render();
})();
