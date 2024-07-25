document.getElementById('feedback-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    try {
        const response = await fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, feedback })
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.innerHTML = '<div id="success">Thank you for your feedback!</div>';
            document.getElementById('feedback-form').reset();
        } else {
            responseDiv.innerHTML = `<div id="error">${data.message}</div>`;
        }
    } catch (error) {
        responseDiv.innerHTML = '<div id="error">Thanks from Chatbot</div>';
    }
});
