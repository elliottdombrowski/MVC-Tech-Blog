// HANDLER FOR POST SUBMIT FORM
const blogPostHandler = async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    if (title && body) {
        //FINISH THIS LATER
        const response = await fetch('/api/???', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            //DO WHAT? DOCUMENT LOCATION REPLACE?
        } else {
            alert(response.statusText);
        }
    }
};


document
    .querySelector('#blog-submit')
    .addEventListener('submit', blogPostHandler);