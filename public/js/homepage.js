const showComments = () => {
    document.location.replace('/comments')
};

document
    .querySelector('#comment-btn')
    .addEventListener('click', showComments);