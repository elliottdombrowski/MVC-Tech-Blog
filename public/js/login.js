const loginFormHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#log-in-email').value.trim();
    const password = document.querySelector('#log-in-password').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (e) => {
    e.preventDefault();
    console.log('hitting sign up form handler');

    const first_name = document.querySelector('#sign-up-fname').value.trim();
    const last_name = document.querySelector('#sign-up-lname').value.trim();
    const email = document.querySelector('#sign-up-email').value.trim();
    const password = document.querySelector('#sign-up-password').value.trim();

    if(first_name && last_name && email && password) {
        console.log('hitting sign up IF/ELSE')
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password }),
            headers: { 'Content-Type': 'application/json'},
        }); 

        if(response.ok) {
            console.log('res ok');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);