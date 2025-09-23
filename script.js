(function() {
  const container = document.getElementById('poem');

  const lyricsLibrary = {
    'new-song': [
        'Press', 'the', 'lyrics', 'to', 'edit.', 'Spacebar', 'moves', 'foward,', 'backspace', 'moves', 'back.'
    ],
    'instructions': {
        bpm: 120,
        pickup: true,
        words: [
            'Hel-', '-', 'lo', '-', '-', 'and', 'wel-', 'come!', '-', '-', "Let's", '-', 'write', 'a', 'verse.', '-', 'We', 'can', 'start', '-', 'with', 'the', 'but-', 'tons', '-', 'to', 'help', 'you', 're-', '-', 'hearse.', '-', 'On', 'the', 'left,', 'the', 'but-', 'ton', 'Play,', '-', '-', "you'll", 'want', 'to', 'press', '-', 'that.', '-', 'B', 'P', 'M', 'to', 'set', 'the', 'beat,', '-', 'Green', 'and', 'Blue', 'just', 'mix', 'and', 'match.', '-', 'Pre-', 'load',
            'Rhymes', 'make', '-', 'a', // Syncopation 1 (starts at index 67)
            'rhy-', 'thm,', '-', '-', 'pick', 'the', 'one', 'you', 'want.', '-', 'Switch', 'to',
            '9/', '8,', '-', 'or', // Syncopation 2 (starts at index 82)
            '6/', '4,', '-', 'use', 'six-', 'teenth', 'notes', 'too', 'much.', '-', '-', 'But', 'when', 'you', 'want', 'to', 'save,', '-', 'make', 'an', 'ed-', 'it,', 'add', "what's", 'new...', '-', 'Press', 'the',
            'Pa-', 'ra-', '-', 'graph', // Syncopation 3 (starts at index 113)
            'but-', 'ton', '-', 'and', 'see', 'what', 'it', 'can', 'do!', '-', 'Grab', 'the', 'text', '-', 'from', 'the', 'box,', '-', 'store', 'it', 'safe', 'and', 'use', 'it', 'la-', 'ter,', 'make', 'a', 'screen', 'shot', 'on', 'your', 'clip-', 'board,', 'keep', 'the', 'pic-', 'ture', 'for', 'the', 'ha-', 'ters.', 'Then', '-', 'turn', 'the', 'e-', 'dit', 'off,', '-', 'see', 'the', 'Rhyme', 'in', 'all', 'its', 'glo-', 'ry', 'as', 'you', 'plot', 'the', 'se-', 'cond', 'verse', '-', 'and', 'con-', 'ti-', 'nue', 'with', 'your', 'sto-', 'ry.'
        ],
        syncopation: [67, 83, 115], // Trigger positions (index of 2nd sound)
        syncopationStates: {
            69: true, 70: false,   // After '[Rhymes make - a]' -> 'rhy-' is active, 'thm,' is not
            85: true, 86: false,   // After '[9/ 8, - or]' -> '6/' is active, '4,' is not
            117: true, 118: false  // After '[Pa- ra- - graph]' -> 'but-' is active, 'ton' is not
        }
    },
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

  const rhythmSystems = {
    "Simplified Kodály": {
      "2": { "B/G": ["Ta", "-"], "B/B": ["Ti", "ti"], "G/B": ["-", "ti"], "G/G": ["-", "-"] },
      "3": { "B/G/G": ["Ta", "-", "-"], "B/B/B": ["Ti", "ti", "ti"], "B/B/G": ["Ti", "ta", "-"], "B/G/B": ["Ta", "-", "ti"], "G/B/G": ["-", "Ta", "-"], "G/B/B": ["-", "ti", "ti"], "G/G/B": ["-", "-", "ti"], "G/G/G": ["-", "-", "-"] },
      "4": { "B/G/G/G": ["Ta", "-", "-", "-"], "B/G/B/G": ["Ti", "-", "ti", "-"], "B/B/B/B": ["Ti", "ki", "ti", "ki"], "G/B/B/B": ["-", "ki", "ti", "ki"], "B/B/B/G": ["Ti", "ki", "ti", "-"], "B/B/G/B": ["Ti", "ki", "-", "ki"], "B/G/B/B": ["Ti", "-", "ti", "ki"], "B/B/G/G": ["Ti", "ki", "-", "-"], "G/B/B/G": ["-", "ki", "ti", "-"], "G/G/B/B": ["-", "-", "ti", "ki"], "G/B/G/B": ["-", "ki", "-", "ki"], "B/G/G/B": ["Ti", "-", "-", "ki"], "G/B/G/G": ["-", "ki", "-", "-"], "G/G/B/G": ["-", "-", "ti", "-"], "G/G/G/B": ["-", "-", "-", "ki"], "G/G/G/G": ["-", "-", "-", "-"] }
    },
    "Beat Centered Kodály": {
      "2": { "B/G": ["Ta", "-"], "B/B": ["Ta", "ti"], "G/B": ["-", "ti"], "G/G": ["-", "-"] },
      "3": { "B/G/G": ["Ta", "-", "-"], "B/B/B": ["Ta", "ti", "ti"], "B/B/G": ["Ta", "ti", "-"], "B/G/B": ["Ta", "-", "ti"], "G/B/G": ["-", "Ta", "-"], "G/B/B": ["-", "ti", "ti"], "G/G/B": ["-", "-", "ti"], "G/G/G": ["-", "-", "-"] },
      "4": { "B/G/G/G": ["Ta", "-", "-", "-"], "B/G/B/G": ["Ta", "-", "ti", "-"], "B/B/B/B": ["Ta", "ka", "ti", "ka"], "G/B/B/B": ["-", "ka", "ti", "ka"], "B/B/B/G": ["Ta", "ka", "ti", "-"], "B/B/G/B": ["Ta", "ka", "-", "ka"], "B/G/B/B": ["Ta", "-", "ti", "ka"], "B/B/G/G": ["Ta", "ka", "-", "-"], "G/B/B/G": ["-", "ka", "ti", "-"], "G/G/B/B": ["-", "-", "ti", "ka"], "G/B/G/B": ["-", "ka", "-", "ka"], "B/G/G/B": ["Ta", "-", "-", "ka"], "G/B/G/G": ["-", "ka", "-", "-"], "G/G/B/G": ["-", "-", "ti", "-"], "G/G/G/B": ["-", "-", "-", "ka"], "G/G/G/G": ["-", "-", "-", "-"] }
    },
    "Gordon System": {
      "2": { "B/G": ["Du", "-"], "B/B": ["Du", "de"], "G/B": ["-", "de"], "G/G": ["-", "-"] },
      "3": { "B/G/G": ["Du", "-", "-"], "B/B/B": ["Du", "da", "di"], "B/B/G": ["Du", "da", "-"], "B/G/B": ["Du", "-", "di"], "G/B/G": ["-", "da", "-"], "G/B/B": ["-", "da", "di"], "G/G/B": ["-", "-", "di"], "G/G/G": ["-", "-", "-"] },
      "4": { "B/G/G/G": ["Du", "-", "-", "-"], "B/G/B/G": ["Du", "-", "de", "-"], "B/B/B/B": ["Du", "ta", "de", "ta"], "G/B/B/B": ["-", "ta", "de", "ta"], "B/B/B/G": ["Du", "ta", "de", "-"], "B/B/G/B": ["Du", "ta", "-", "ta"], "B/G/B/B": ["Du", "de", "ta", "-"], "B/B/G/G": ["Du", "ta", "-", "-"], "G/B/B/G": ["-", "ta", "de", "-"], "G/G/B/B": ["-", "-", "de", "ta"], "G/B/G/B": ["-", "ta", "-", "ta"], "B/G/G/B": ["Du", "-", "-", "ta"], "G/B/G/G": ["-", "ta", "-", "-"], "G/G/B/G": ["-", "-", "de", "-"], "G/G/G/B": ["-", "-", "-", "ta"], "G/G/G/G": ["-", "-", "-", "-"] }
    },
    "Takadimi System": {
      "2": { "B/G": ["Ta", "-"], "B/B": ["Ta", "di"], "G/B": ["-", "di"], "G/G": ["-", "-"] },
      "3": { "B/G/G": ["Ta", "-", "-"], "B/B/B": ["Ta", "ki", "da"], "B/B/G": ["Ta", "ki", "-"], "B/G/B": ["Ta", "-", "da"], "G/B/G": ["-", "ki", "-"], "G/B/B": ["-", "ki", "da"], "G/G/B": ["-", "-", "da"], "G/G/G": ["-", "-", "-"] },
      "4": { "B/G/G/G": ["Ta", "-", "-", "-"], "B/G/B/G": ["Ta", "-", "di", "-"], "B/B/B/B": ["Ta", "ka", "di", "mi"], "G/B/B/B": ["-", "ka", "di", "mi"], "B/B/B/G": ["Ta", "ka", "di", "-"], "B/B/G/B": ["Ta", "ka", "-", "mi"], "B/G/B/B": ["Ta", "-", "di", "mi"], "B/B/G/G": ["Ta", "ka", "-", "-"], "G/B/B/G": ["-", "ka", "di", "-"], "G/G/B/B": ["-", "-", "di", "mi"], "G/B/G/B": ["-", "ka", "-", "mi"], "B/G/G/B": ["Ta", "-", "-", "mi"], "G/B/G/G": ["-", "ka", "-", "-"], "G/G/B/G": ["-", "-", "di", "-"], "G/G/G/B": ["-", "-", "-", "mi"], "G/G/G/G": ["-", "-", "-", "-"] }
    },
    "Fruit Rhythms": {
      "2": { "B/G": ["Pie", "-"], "B/B": ["Ap", "ple"], "G/B": ["-", "Sweet"], "G/G": ["-", "-"] },
      "3": { "B/G/G": ["Pie", "-", "-"], "B/B/B": ["Pine", "ap", "ple"], "B/B/G": ["Yo", "gurt", "-"], "B/G/B": ["Le", "-", "mon"], "G/B/G": ["-", "Peas", "-"], "G/B/B": ["-", "Spi", "cy"], "G/G/B": ["-", "-", "Sweet"], "G/G/G": ["-", "-", "-"] },
      "4": { "B/G/G/G": ["Pie", "-", "-", "-"], "B/G/B/G": ["Ap", "-", "ple", "-"], "B/B/B/B": ["Wa", "ter", "me", "lon"], "G/B/B/B": ["-", "To", "ma", "to"], "B/B/B/G": ["Co", "co", "nut", "-"], "B/B/G/B": ["Ba", "na", "-", "na"], "B/G/B/B": ["Blue", "-", "ber", "ry"], "B/B/G/G": ["Ki", "wi", "-", "-"], "G/B/B/G": ["-", "fi", "let", "-"], "G/G/B/B": ["-", "-", "Ber", "ry"], "G/B/G/B": ["-", "Sal", "-", "sa"], "B/G/G/B": ["Cher", "-", "-", "ry"], "G/B/G/G": ["-", "Peas", "-", "-"], "G/G/B/G": ["-", "-", "Sweet", "-"], "G/G/G/B": ["-", "-", "-", "&"], "G/G/G/G": ["-", "-", "-", "-"] }
    }
  };

  let words = lyricsLibrary['hickory-dickory-dock'].slice(); // Start with default lyrics
  
  let syncopation = []; // Track syncopated positions
  let syncopationStates = {}; // Track the state of affected positions independently
  let editingIndex = null;
  let circleIconActive = true;
  let timeSignatureNumerator = 4;
  let timeSignatureDenominator = 4;
  let sixteenthNoteModeActive = false;
  let originalEighthNotePattern = []; // Store the original 8th note pattern
  let hasPickupMeasure = false;
  let isFirstPlay = true;
  let isPlaying = false;
  let playTimeouts = [];
  let currentPlayPosition = 0;
  let selectedPlayStartPosition = null; // To store the selected starting beat
  let notesBoxElements = []; // Store references to notes boxes for highlighting
  let beatEnabled = true; // Beat checkbox state
  let rhythmEnabled = true; // Rhythm checkbox state
  let BPM = 82;
  let textImportMode = 'replace'; // 'add' or 'replace'
  let savedTextInput = ''; // Store the text from the modal
  let chantModeActive = false;
  let currentRhythmSystem = 'Simplified Kodály';

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

  // Convert 8th note pattern to 16th note pattern by inserting inactive notes
  function convertTo16thNotePattern(eighthNoteWords) {
    const sixteenthNoteWords = [];
    for (let i = 0; i < eighthNoteWords.length; i += 2) {
      // For each beat (2 eighth notes), expand to 4 sixteenth notes
      const firstEighth = eighthNoteWords[i] || '-';
      const secondEighth = eighthNoteWords[i+1] || '-';
      
      // Add the first eighth note
      sixteenthNoteWords.push(firstEighth);
      // Add an inactive note after the first eighth note
      sixteenthNoteWords.push('-');
      // Add the second eighth note
      sixteenthNoteWords.push(secondEighth);
      // Add an inactive note after the second eighth note
      sixteenthNoteWords.push('-');
    }
    return sixteenthNoteWords;
  }

  // Convert 16th note pattern back to 8th note pattern by removing inactive notes
  function convertTo8thNotePattern(sixteenthNoteWords) {
    const eighthNoteWords = [];
    for (let i = 0; i < sixteenthNoteWords.length; i += 4) {
      // For each beat (4 sixteenth notes), compress to 2 eighth notes
      eighthNoteWords.push(sixteenthNoteWords[i] || '-');
      eighthNoteWords.push(sixteenthNoteWords[i+2] || '-');
    }
    return eighthNoteWords;
  }

  // Extract only the syllables/words that occupy active rhythm positions
  function extractActiveTokens(wordArray) {
    return wordArray.filter(word => word !== '-' && word !== '');
  }

  // Count trailing rests so we can keep them anchored at the end of the timeline
  function countTrailingRests(wordArray) {
    let count = 0;
    for (let i = wordArray.length - 1; i >= 0; i--) {
      if (wordArray[i] === '-' || wordArray[i] === '') count++;
      else break;
    }
    return count;
  }

  // Rebuild the words array so that the supplied active states receive tokens in order
  function rebuildWordsFromActiveStates(tokens, activeStates) {
    const rebuilt = [];
    let tokenIndex = 0;

    for (let i = 0; i < activeStates.length; i++) {
      if (activeStates[i]) {
        if (tokenIndex < tokens.length) rebuilt.push(tokens[tokenIndex++]);
        else rebuilt.push(' ');
      } else {
        rebuilt.push('-');
      }
    }

    while (tokenIndex < tokens.length) {
      rebuilt.push(tokens[tokenIndex++]);
    }

    return rebuilt;
  }

  // Toggle a rhythm position while preserving the surrounding beat patterns
  function applyIsolatedRhythmChange(position) {
    if (syncopation.length > 0) return false; // Avoid breaking stored syncopation indices

    const tokens = extractActiveTokens(words);
    const activeStates = words.map(word => word !== '-' && word !== '');

    if (!activeStates[position] && tokens.length === 0 && position >= words.length) {
      // Nothing to shift yet – fall back to legacy behaviour
      return false;
    }

    const wasActive = activeStates[position] || false;
    const trailingRestCount = countTrailingRests(words);

    activeStates[position] = !wasActive;

    let activeCount = activeStates.reduce((sum, state) => sum + (state ? 1 : 0), 0);
    if (activeCount < tokens.length) {
      const needed = tokens.length - activeCount;
      let insertPos = Math.max(position + 1, activeStates.length - trailingRestCount);
      for (let i = 0; i < needed; i++) {
        activeStates.splice(insertPos, 0, true);
        insertPos++;
      }
    }

    words = rebuildWordsFromActiveStates(tokens, activeStates);
    return true;
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
    const floatingPanelHeight = 60; // The height of the bottom control panel

    // Calculate the ideal vertical center of the screen, accounting for the floating panel
    const viewCenterY = (windowHeight - floatingPanelHeight) / 2;

    // Check if the element is more than a small tolerance away from the center
    const tolerance = 50; // A 50px tolerance zone around the center
    if (Math.abs(elementRect.top - viewCenterY) > tolerance) {
      const elementTopInDocument = elementRect.top + window.pageYOffset;
      // Calculate the target scroll position to place the element in the center
      const targetY = elementTopInDocument - viewCenterY + (elementRect.height / 2);
      
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
  const rhythmSystemsDropdown = document.getElementById('rhythm-systems-dropdown');

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
    const songData = lyricsLibrary[selectedKey];

    if (songData) {
        // Reset song-specific properties
        syncopation = [];
        syncopationStates = {};
        hasPickupMeasure = false;
        selectedPlayStartPosition = null; // Reset selection

        // Check if the song data is in the new object format or the old array format
        if (Array.isArray(songData)) {
            // Old format: just an array of words
            words = songData.slice();
        } else {
            // New format: an object with properties
            words = songData.words.slice();
            hasPickupMeasure = songData.pickup || false;
            if (songData.syncopation) {
                syncopation = songData.syncopation.slice();
            }
            if (songData.syncopationStates) {
                syncopationStates = { ...songData.syncopationStates };
            }
            if (songData.bpm) {
                BPM = songData.bpm;
                bpmValueSpan.textContent = BPM;
            }
        }
        
        // Reset to 8th note mode when changing songs
        if (sixteenthNoteModeActive) {
            sixteenthNoteModeActive = false;
            sixteenthNoteBtn.classList.remove('active');
            originalEighthNotePattern = [];
        }
        
        render();
    }
  });

  rhythmSystemsDropdown.addEventListener('change', (e) => {
    currentRhythmSystem = e.target.value;
    render();
  });


  // Mode Toggle
  const poetryModeBtn = document.getElementById('poetry-mode-btn');
  const chantModeBtn = document.getElementById('chant-mode-btn');

  function setMode(isChant) {
    chantModeActive = isChant;
    poetryModeBtn.classList.toggle('active', !isChant);
    chantModeBtn.classList.toggle('active', isChant);
    lyricsDropdown.classList.toggle('hidden', isChant);
    rhythmSystemsDropdown.classList.toggle('hidden', !isChant);
    render();
  }

  poetryModeBtn.addEventListener('click', () => {
    if (chantModeActive) {
      setMode(false);
    }
  });

  chantModeBtn.addEventListener('click', () => {
    if (!chantModeActive) {
      setMode(true);
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
    
    // Reset to 8th note mode when changing time signature
    if (sixteenthNoteModeActive) {
        sixteenthNoteModeActive = false;
        sixteenthNoteBtn.classList.remove('active');
        words = originalEighthNotePattern.slice();
        originalEighthNotePattern = [];
    }
    
    render();
  });

  timeSignatureBottomBtn.addEventListener('click', () => {
    // Reset to 8th note mode when changing time signature
    if (sixteenthNoteModeActive) {
        sixteenthNoteModeActive = false;
        sixteenthNoteBtn.classList.remove('active');
        words = originalEighthNotePattern.slice();
        originalEighthNotePattern = [];
    }
    
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

  // Save (text input modal) setup
  const saveBtn = document.getElementById('save-btn');
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

  saveBtn.addEventListener('click', openModal);
  modalCancelBtn.addEventListener('click', closeModal);
  let modalMousedownOnBackdrop = false;
  modal.addEventListener('mousedown', e => {
      if (e.target === modal) {
          modalMousedownOnBackdrop = true;
      }
  });

  modal.addEventListener('mouseup', e => {
      if (e.target === modal && modalMousedownOnBackdrop) {
          closeModal();
      }
      modalMousedownOnBackdrop = false;
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
                      const newSixteenthModeActive = (sixteenthMatch[1] === 'yes');
                      // Don't toggle the 16th note mode yet; it will be handled properly when processing the content
                      sixteenthNoteModeActive = newSixteenthModeActive;
                      sixteenthNoteBtn.classList.toggle('active', newSixteenthModeActive);
                  }
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
          const tempConfig = getLayoutConfig(); // Use a temporary config based on modal settings

          for(let i=0; i<tokens.length; i++) {
              let token = tokens[i].trim();
              if (token.startsWith('[') && token.endsWith(']')) {
                  const syncGroup = token.slice(1, -1).split(/\s+/).filter(Boolean);
                  const w1 = syncGroup[0] || '-';
                  const w2 = syncGroup[1] || '-';
                  const w3 = syncGroup[2] || '-';

                  // --- Start of Re-implemented Creation-Time Logic ---
                  let currentPos = finalWords.length;
                  let posInMeasure = currentPos % tempConfig.circlesPerMeasure;
                  let beatInMeasure = Math.floor(posInMeasure / tempConfig.circlesPerBeat);

                  let isValid = (currentPos % 2 === 0) && (beatInMeasure < tempConfig.beatsPerMeasure - 1);

                  if (!isValid) {
                      let nextPos = currentPos;
                      if (nextPos % 2 !== 0) { // If it's on an upbeat, push to next downbeat
                          nextPos++;
                      }
                      
                      let nextPosInMeasure = nextPos % tempConfig.circlesPerMeasure;
                      let nextBeatInMeasure = Math.floor(nextPosInMeasure / tempConfig.circlesPerBeat);
                      
                      // If it's on the last beat, push to the next measure
                      if (nextBeatInMeasure >= tempConfig.beatsPerMeasure - 1) {
                          nextPos = currentPos - posInMeasure + tempConfig.circlesPerMeasure;
                      }

                      for (let j = currentPos; j < nextPos; j++) {
                          finalWords.push('-');
                      }
                  }
                  // --- End of Re-implemented Creation-Time Logic ---

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
              // Note: This doesn't adjust syncopation for the added part, but it's a minor case.
          }
          render();
      }
      closeModal();
  });

  // 16th Note Button
  const sixteenthNoteBtn = document.getElementById('sixteenth-note-btn');
  sixteenthNoteBtn.addEventListener('click', () => {
      if (timeSignatureDenominator === 4) {
          // Toggle 16th note mode
          if (sixteenthNoteModeActive) {
              // Switch back to 8th note mode
              sixteenthNoteModeActive = false;
              if (originalEighthNotePattern.length > 0) {
                  words = originalEighthNotePattern.slice();
                  originalEighthNotePattern = [];
              } else {
                  // Fallback: convert current pattern to 8th note pattern
                  words = convertTo8thNotePattern(words);
              }
          } else {
              // Switch to 16th note mode
              sixteenthNoteModeActive = true;
              // Store the original 8th note pattern
              originalEighthNotePattern = words.slice();
              // Convert to 16th note pattern
              words = convertTo16thNotePattern(words);
          }
          
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
    // Initialize audio context first
    initAudioContext();
    
    // Set playing state
    isPlaying = true;
    currentPlayPosition = selectedPlayStartPosition || 0;
    playButton.textContent = '⏸';
    playButton.classList.add('playing');

    const beatInterval = 60000 / BPM;

    const startPoetry = (delay = 0, startBeat = 0) => {
      const config = getLayoutConfig();
      const rhythmPattern = getRhythmPattern();
      
      let noteInterval = beatInterval / config.circlesPerBeat;
      
      // Calculate the total number of circles needed to fill complete measures
      let totalCircles;
      if (hasPickupMeasure) {
        const bodyCircles = rhythmPattern.length > config.circlesPerBeat ? rhythmPattern.length - config.circlesPerBeat : 0;
        const circlesInLastMeasure = bodyCircles % config.circlesPerMeasure;
        const paddedBodyCircles = circlesInLastMeasure === 0 ? bodyCircles : bodyCircles + (config.circlesPerMeasure - circlesInLastMeasure);
        totalCircles = config.circlesPerBeat + paddedBodyCircles;
      } else {
        const circlesInLastMeasure = rhythmPattern.length % config.circlesPerMeasure;
        totalCircles = circlesInLastMeasure === 0 ? rhythmPattern.length : rhythmPattern.length + (config.circlesPerMeasure - circlesInLastMeasure);
      }

      const totalDuration = (totalCircles * noteInterval) - (startBeat * beatInterval);
      const totalBeats = Math.ceil(totalCircles / config.circlesPerBeat);

      // Schedule BEAT track
      for (let beat = startBeat; beat < totalBeats; beat++) {
        const timeDelay = delay + ((beat - startBeat) * beatInterval);
        const beatTimeout = setTimeout(() => {
          if (isPlaying) {
            highlightNotesBox(beat);
            if (beatEnabled) playBrushDrum();
          }
        }, timeDelay);
        playTimeouts.push(beatTimeout);
      }

      // Schedule RHYTHM track
      const startCircle = startBeat * config.circlesPerBeat;
      rhythmPattern.slice(startCircle).forEach((hasSound, index) => {
        const timeDelay = delay + (index * noteInterval);
        const rhythmTimeout = setTimeout(() => {
          if (isPlaying && hasSound) playTriangleTone(noteInterval * 0.8 / 1000);
        }, timeDelay);
        playTimeouts.push(rhythmTimeout);
      });

      // Schedule the next loop to start after the total duration
      const loopTimeout = setTimeout(() => {
        if (isPlaying) {
          isFirstPlay = false; // Mark as no longer first play for subsequent loops
          startPoetry(0, 0); // Start the next loop from the beginning
        }
      }, delay + totalDuration);
      playTimeouts.push(loopTimeout);
    };

    // Play the count-in if it's the first play and beat is enabled
    const shouldPlayCountIn = (isFirstPlay || selectedPlayStartPosition !== null) && beatEnabled;

    if (shouldPlayCountIn) {
      let countInBeats = 4;
      if (isFirstPlay && hasPickupMeasure && selectedPlayStartPosition === null) {
        countInBeats = 3;
      }
      console.log("Playing count-in with " + countInBeats + " beats");
      
      // Schedule count-in beats
      for (let i = 0; i < countInBeats; i++) {
        const timeDelay = i * beatInterval;
        const countInTimeout = setTimeout(() => { 
          if (isPlaying) playBrushDrum(); 
        }, timeDelay);
        playTimeouts.push(countInTimeout);
      }
      
      // Start the actual poetry after the count-in
      startPoetry(countInBeats * beatInterval, currentPlayPosition);
    } else {
      // If it's not the first play or beat is disabled, start immediately
      startPoetry(0, currentPlayPosition);
    }
  }

  function stopPlayback() {
    isPlaying = false;
    currentPlayPosition = 0;
    isFirstPlay = true; // Reset this flag when stopping
    playButton.textContent = '▶';
    playButton.classList.remove('playing');
    clearHighlights();
    playTimeouts.forEach(timeout => clearTimeout(timeout));
    playTimeouts = [];
    selectedPlayStartPosition = null; // Clear selection on stop
    render(); // Re-render to remove selection highlight
  }

  function updateCircleVisibility() {
    document.querySelectorAll('.circles').forEach(box => {
      box.classList.toggle('hidden', !circleIconActive);
    });
  }

  // --- RENDERING LOGIC ---

  function dismantleSyncopation(syncStartIndex) {
      const syncTriggerPos = syncStartIndex + 1;
      const syncopationIndex = syncopation.indexOf(syncTriggerPos);
  
      if (syncopationIndex === -1) return; // Not a valid syncopation start
  
      // Ensure the group is intact before trying to dismantle
      if (syncStartIndex + 3 < words.length && words[syncStartIndex + 2] === '-') {
          const w1 = words[syncStartIndex];
          const w2 = words[syncStartIndex + 1];
          const w3 = words[syncStartIndex + 3];
  
          const replacement = [];
          if (w1 !== '-') replacement.push(w1);
          if (w2 !== '-') replacement.push(w2);
          if (w3 !== '-') replacement.push(w3);
  
          // Replace the 4-element syncopation group with its preserved words.
          words.splice(syncStartIndex, 4, ...replacement);
  
          // Clean up the corresponding syncopation data.
          const affectedBeatStart = syncStartIndex + 2;
          delete syncopationStates[affectedBeatStart];
          delete syncopationStates[affectedBeatStart + 1];
          syncopation.splice(syncopationIndex, 1);
  
          // Adjust subsequent syncopation indices due to the change in array length.
          const lengthChange = replacement.length - 4;
          for (let i = 0; i < syncopation.length; i++) {
              if (syncopation[i] > syncTriggerPos) {
                  syncopation[i] += lengthChange;
              }
          }
      }
  }

  function getChantText(activeStates, system, circlesPerBeat) {
    const pattern = activeStates.map(a => a ? 'B' : 'G').join('/');
    const systemData = rhythmSystems[system];
    if (systemData && systemData[circlesPerBeat] && systemData[circlesPerBeat][pattern]) {
      return systemData[circlesPerBeat][pattern];
    }
    return activeStates.map(a => a ? '?' : '-'); // Default fallback
  }

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

    const activeStates = [];
    for (let circleIndex = 0; circleIndex < config.circlesPerBeat; circleIndex++) {
        const idx = beatStartPosition + circleIndex;
        const circle = document.createElement('span');
        circle.className = 'circle';
        const isActive = isPositionActive(idx, displayWords);
        activeStates.push(isActive);

        if (syncopation.includes(idx)) {
            circle.classList.add('syncopated');
        } else if (isActive) {
            circle.classList.add('active');
        }
        circle.addEventListener('click', () => {
            // Proactively dismantle any syncopation that would be broken by this action.
            // A syncopation is broken if a word is added/removed right before it.
            for (let i = syncopation.length - 1; i >= 0; i--) {
                const syncTriggerPos = syncopation[i];
                const syncStartIndex = syncTriggerPos - 1;
                // If the click is right before a syncopation group, dismantle it first.
                if (idx === syncStartIndex -1 || idx === syncStartIndex) {
                    dismantleSyncopation(syncStartIndex);
                }
            }

            while (words.length <= idx) {
                words.push('-');
            }

            // If the user clicks the green syncopation trigger, undo it.
            if (syncopation.includes(idx)) {
                dismantleSyncopation(idx - 1); // We need to pass the start index
                render();
                return;
            }

            if (!isAffectedBySyncopation(idx) && applyIsolatedRhythmChange(idx)) {
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
    
    if (beatIndex === selectedPlayStartPosition) {
        notesBox.classList.add('selected');
    }

    notesBox.addEventListener('click', () => {
        if (selectedPlayStartPosition === beatIndex) {
            selectedPlayStartPosition = null; // Toggle off if already selected
        } else {
            selectedPlayStartPosition = beatIndex;
        }
        render(); // Re-render to show selection change
    });

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

    if (chantModeActive) {
        const chantSyllables = getChantText(activeStates, currentRhythmSystem, config.circlesPerBeat);
        const chantDiv = document.createElement('div');
        chantDiv.className = 'words';
        if (config.circlesPerBeat === 4) {
            chantDiv.classList.add('sixteenth-chant');
        } else if (config.circlesPerBeat === 3) {
            chantDiv.classList.add('triplet-chant');
        } else if (config.circlesPerBeat === 2) {
            chantDiv.classList.add('eighth-chant');
        }

        const pattern = activeStates.map(a => a ? 'B' : 'G').join('/');

        if ((pattern === 'B/G/G/G' && config.circlesPerBeat === 4) || (pattern === 'B/G/G' && config.circlesPerBeat === 3)) {
            chantDiv.classList.add('single-syllable-whole');
            const wc = document.createElement('span');
            wc.className = 'word-container';

            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = chantSyllables[0];
            wc.appendChild(span);
            chantDiv.appendChild(wc);
        } else {
            chantSyllables.forEach((syllable, i) => {
                const wc = document.createElement('span');
                wc.className = 'word-container';

                const span = document.createElement('span');
                span.className = 'word';
                if (syllable === '-') {
                    span.classList.add('rest');
                }
                span.textContent = syllable;
                wc.appendChild(span);
                chantDiv.appendChild(wc);
            });
        }
        group.appendChild(chantDiv);
    } else {
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
    }
    return group;
  }

  function createDivider(isFinal = false) {
    const divider = document.createElement('div');
    divider.className = isFinal ? 'final-measure-divider' : 'measure-divider';

    if (isFinal && words.length > 0) {
      const deleteBtn = document.createElement('div');
      deleteBtn.className = 'delete-measure-btn';
      deleteBtn.textContent = 'X';
      deleteBtn.title = 'Delete last measure';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent any other click events

        if (words.length === 0) {
          render();
          return;
        }

        const config = getLayoutConfig();
        let numToRemove;

        if (hasPickupMeasure) {
          const pickupSize = config.circlesPerBeat;
          if (words.length <= pickupSize) {
            // If only the pickup measure (or part of it) exists, delete it.
            words.length = 0;
          } else {
            // Calculate what's in the main body of the song
            const bodyLength = words.length - pickupSize;
            // Find out how many circles are in the last measure of the body
            numToRemove = bodyLength % config.circlesPerMeasure;
            if (numToRemove === 0) {
              // If the last measure is full, remove a full measure's worth
              numToRemove = config.circlesPerMeasure;
            }
            words.length -= numToRemove;
          }
        } else {
          // No pickup measure, simpler logic
          numToRemove = words.length % config.circlesPerMeasure;
          if (numToRemove === 0) {
            // If the last measure is full, remove a full measure's worth
            numToRemove = config.circlesPerMeasure;
          }
          words.length -= numToRemove;
        }
        
        render();
      });
      divider.appendChild(deleteBtn);

      const addBtn = document.createElement('div');
      addBtn.className = 'add-measure-btn';
      addBtn.textContent = '+';
      addBtn.title = 'Add a new measure';
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const config = getLayoutConfig();
        for (let i = 0; i < config.circlesPerMeasure; i++) {
          words.push('-');
        }
        render();
      });
      divider.appendChild(addBtn);
    }

    return divider;
  }

  function revalidateSyncopations() {
      const config = getLayoutConfig();
      // If syncopation is not possible (e.g., in compound time), dismantle all existing syncopations.
      if (config.circlesPerBeat !== 2) {
          if (syncopation.length > 0) {
              const newWords = [];
              for (let i = 0; i < words.length; i++) {
                  if (syncopation.includes(i + 1)) {
                      if (words[i] !== '-') newWords.push(words[i]);
                      if (words[i + 1] !== '-') newWords.push(words[i + 1]);
                      if (words[i + 3] !== '-') newWords.push(words[i + 3]);
                      i += 3;
                  } else {
                      newWords.push(words[i]);
                  }
              }
              words = newWords;
              syncopation = [];
              syncopationStates = {};
          }
          return;
      }
  
      // Now, check if any remaining syncopations have become invalid due to their position.
      for (let i = syncopation.length - 1; i >= 0; i--) {
          const syncTriggerPos = syncopation[i];
          const syncStartIndex = syncTriggerPos - 1;
  
          const isEvenPosition = syncStartIndex % 2 === 0;
          const positionInMeasure = syncStartIndex % config.circlesPerMeasure;
          const beatInMeasure = Math.floor(positionInMeasure / config.circlesPerBeat);
          const isLastBeat = beatInMeasure >= config.beatsPerMeasure - 1;
          const isGroupIntact = syncStartIndex + 3 < words.length && words[syncStartIndex + 2] === '-';
  
          if (!isEvenPosition || isLastBeat || !isGroupIntact) {
              dismantleSyncopation(syncStartIndex);
          }
      }
  }

  function render() {
    revalidateSyncopations(); // Always check syncopation placement before rendering

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

  // Zoom Controls
  const zoomFab = document.getElementById('zoom-fab');
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const poemContainer = document.getElementById('poem');

  const zoomLevels = [0.75, 1.0, 1.1, 1.25, 1.5, 1.75];
  let currentZoomIndex = 1; // Default is 1.0

  function applyZoom() {
    poemContainer.className = 'zoom-level-' + currentZoomIndex;
    zoomInBtn.disabled = currentZoomIndex === zoomLevels.length - 1;
    zoomOutBtn.disabled = currentZoomIndex === 0;
  }

  zoomFab.addEventListener('click', () => {
    zoomInBtn.classList.toggle('visible');
    zoomOutBtn.classList.toggle('visible');
  });

  zoomInBtn.addEventListener('click', () => {
    if (currentZoomIndex < zoomLevels.length - 1) {
      currentZoomIndex++;
      applyZoom();
    }
  });

  zoomOutBtn.addEventListener('click', () => {
    if (currentZoomIndex > 0) {
      currentZoomIndex--;
      applyZoom();
    }
  });
  
  applyZoom();
  setMode(chantModeActive); // Set initial mode
  render();
})();
