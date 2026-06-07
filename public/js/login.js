const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // console.log("Frontend captured data: ", { username, password });
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log('Server responded: ', data);

        if (data.success) {
            localStorage.setItem('sessionToken', data.token);

            window.location.href = '/homepage';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error', error);
    }
});