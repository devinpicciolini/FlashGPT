// Import the OpenAI API key
const API_KEY = process.env.OPEN_AI_API_KEY;

let flashcards = [];

// Listen for message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getFlashcards") {
    // Get the selected text from the content script
    const reqText = request.text;
    chrome.runtime.sendMessage({
      type: 'loading',
      data: true
    });
    if (reqText) {
      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          prompt: `Act like a teacher. Please generate 5 short Q&A flashcards to test my comprehension of this material only, make it 1 sentence question and 1 sentence answer: ${reqText}`,
          max_tokens: 300,
          temperature: 0.7,
        })
      })
        .then(response => response.json())
        .then(data => {
          chrome.runtime.sendMessage({
            type: 'flashcards',
            question: reqText,
            flashcards: data.choices[0].text
          });
          chrome.runtime.sendMessage({
            type: 'loading',
            data: false
          });
        })
        .catch(error => {
          chrome.runtime.sendMessage({
            type: 'gpt-error',
            data: error
          });
          chrome.runtime.sendMessage({
            type: 'loading',
            data: false
          });
        });

      // Send the flashcards to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "flashcards", flashcards });
      });
    }

  }
});

function generateNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

