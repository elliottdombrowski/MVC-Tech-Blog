const showComments = (id) => {
    console.log('clicking');
    document.location.replace('/comments/' + id)
};

const postComment = async (id) => {
    // event.preventDefault();
    const comment = document.querySelector('#comment-input').value.trim();

    if (comment) {
        //FINISH THIS ROUTE
        const res = await fetch('/api/comment/' + id, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            console.log("worked");
        } else {
            alert(res.statusText);
        }

    } else {
        alert('Please enter a comment.');
    }
};

//WRAP QUERY SELECTORS IN TRY/ CATCH TO PREVENT ERRORS IF NOT FOUND
// try {
//     document
//     .querySelectorAll('.comment-btn')
//     .addEventListener('click', showComments);
// } catch {}

// try {
//     document
//         .querySelector('#comment-submit')
//         .addEventListener('submit', postComment);
// } catch {}