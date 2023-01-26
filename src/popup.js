
const crypto = window.crypto;

// Listen for flashcards from the background script
chrome.runtime.onMessage.addListener((request) => {
    console.log('------- res: ', request)
    if (request.type === 'flashcards') {
        const flashcardsDiv = document.getElementById('flashcards');
        flashcardsDiv.innerHTML = '';
        flashcardsDiv.innerHTML += `<div style="white-space: pre-line;">
            <div><strong>Q/A:</strong> ${request.flashcards}</div>
        </div>`;
    }
    if (request.type === 'loading' && request.data) {
        const flashcardsDiv = document.getElementById('flashcards');
        flashcardsDiv.innerHTML = '';
        flashcardsDiv.innerHTML += `<div>
            <img style="width: 50px;" src="./icons/spinner.svg" />
        </div>`
    }
    if (request.type === 'gpt-error' && request.data) {
        const flashcardsDiv = document.getElementById('flashcards');
        flashcardsDiv.innerHTML = '';
        flashcardsDiv.innerHTML += `<div>
            ${request.data}
        </div>`
    }
});

// const nonce = crypto.randomBytes(16).toString('hex');
// console.log(nonce); // this will log the nonce value

// Send a message to the background script to get flashcards
chrome.runtime.sendMessage({ type: 'getFlashcards' });


