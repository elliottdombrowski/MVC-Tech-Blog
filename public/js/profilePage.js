// HANDLER FOR POST SUBMIT FORM
const blogPostHandler = async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    if (title && body) {
        //FINISH THIS LATER
        const response = await fetch('/api/projects/post', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('response: ' + JSON.stringify(response));
        if (response.ok) {
            console.log('hitting blog post handler');
            //DO WHAT? DOCUMENT LOCATION REPLACE?
        } else {
            console.log('fuckin up');
            alert(response.statusText);
        }
    }
};


document
    .querySelector('#blog-form')
    .addEventListener('submit', blogPostHandler);