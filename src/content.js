// Listen for mouseup events on the page
document.addEventListener('mouseup', () => {
  if (typeof chrome !== 'undefined') {
    // Get the selected text
    const selectedText = window.getSelection().toString();

    // Check if there is any selected text
    if (selectedText) {
      // Send a message to the background script to get flashcards for the selected text
      chrome.runtime.sendMessage({ type: 'getFlashcards', text: selectedText });
    }
  }
});
