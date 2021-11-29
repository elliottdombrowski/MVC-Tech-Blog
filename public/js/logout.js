const logout = async () => {
    try {
        const res = await fetch('/api/users/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('logged out');

        if(res.ok) {
            document.location.replace('/');
        } else {
            alert(res.statusText);
            document.location.replace('/');
        }
    } catch (err) {
        console.log(err);
        alert('logout failed');
    }
};

document.querySelector('#sign-out-button').addEventListener('click', logout);