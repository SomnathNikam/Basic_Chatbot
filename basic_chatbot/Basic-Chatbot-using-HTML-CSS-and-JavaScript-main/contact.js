document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.innerHTML = '<div id="success">Message sent successfully!</div>';
            document.getElementById('contact-form').reset();
        } else {
            responseDiv.innerHTML = `<div id="error">${data.message}</div>`;
        }
    } catch (error) {
        responseDiv.innerHTML = '<div id="error">Thanks for Contact Us</div>';
    }
});
