const showComments = () => {
    document.location.replace('/comments')
};

const postComment = (e) => {
    e.preventDefault();

    const comment = document.querySelector('#comment-input');

    if (comment) {
        //FINISH THIS ROUTE
        const res = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            
        } else {
            alert('Please enter a comment.');
        }
    }
};

//WRAP QUERY SELECTORS IN TRY/ CATCH TO PREVENT ERRORS IF NOT FOUND
try {
    document
    .querySelector('#comment-btn')
    .addEventListener('click', showComments);
} catch {}

try {
    document
        .querySelector('#comment-submit')
        .addEventListener('submit', postComment);
} catch {}