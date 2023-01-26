// Generate a nonce
function generateNonce() {
    return (Math.random() + 1).toString(36).substring(2, 12);
}

// Use the nonce in your script tag
document.querySelector('script').setAttribute('nonce', generateNonce());
