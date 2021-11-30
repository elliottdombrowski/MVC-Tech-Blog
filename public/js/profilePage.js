// HANDLER FOR POST SUBMIT FORM
const confirmPost = document.getElementById('post-confirm');

const blogPostHandler = async (e) => {
    const name = document.getElementById('title').value.trim();
    const content = document.getElementById('post-body').value.trim();

    
    if (name && content) {
        //FINISH THIS LATER
        const response = await fetch('/api/projects/', {
            method: 'POST',
            body: JSON.stringify({ name, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // alert('Post created!');
            // confirmPost.innerHTML = 'post created!'
        } else {
            alert(response.statusText);
        }
    } else {
        e.preventDefault();
        alert('Please enter all forms!');
    }
};


document
    .querySelector('#blog-form')
    .addEventListener('submit', blogPostHandler);