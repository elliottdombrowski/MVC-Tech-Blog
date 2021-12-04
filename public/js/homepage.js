const showComments = (id) => {
    console.log('clicking');
    document.location.replace('/comments/' + id)
};

const postComment = async (id) => {
    const comment = document.querySelector('#comment-input').value.trim();

    if (comment) {
        const res = await fetch('/api/comment/' + id, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
        } else {
            alert(res.statusText);
        }
    } else {
        alert('Please enter a comment.');
    }
};

const deleteComment = async (id) => {
    const res = await fetch('/api/comment/' + id, {
        method: 'DELETE'
    }); 

    //THIS IS TOTALLY A COUNTERINTUITIVE WAY TO DO THIS. I'LL FIX IT LATER THOUGH.
    if (res.ok) {
        //RELOAD PAGE SO UPDATED COMMENTS RENDER PROPERLY AFTER DELETE
        return location.reload();
    }
    alert(res.statusText);
};

//FUTURE DEVELOPMENTS! DON'T JUDGE ME TOO HARD!
const updateComment = async (id) => {
};