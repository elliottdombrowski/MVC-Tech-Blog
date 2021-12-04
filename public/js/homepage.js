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

const deleteComment = async (id) => {
    console.log('clicked delete');
    const res = await fetch('/api/comment/' + id, {
        method: 'DELETE'
    }); 

    //THIS IS TOTALLY A COUNTERINTUITIVE WAY TO DO THIS. I'LL FIX IT LATER THOUGH.
    if (res.ok) {
        return location.reload();
    }
    alert(res.statusText);
};

//FUTURE DEVELOPMENTS! DON'T JUDGE ME TOO HARD!
const updateComment = async (id) => {
    // const res = await fetch ('/api/comment/' + id, {
    //     method: 'PUT',
    // });

    // if (res.ok) {

    // } else {
    //     alert(res.statusText);
    // }
};