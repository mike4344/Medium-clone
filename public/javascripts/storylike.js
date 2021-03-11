document.addEventListener('DOMContentLoaded', async () => {
    const likeButton = document.getElementById('like-button')

    likeButton.addEventListener('click', async () => {
        // console.log(likeButton.classList[1]);
        const storyId = parseInt(likeButton.classList[1], 10);
        
        const likeImage = document.querySelector('.story-titlebox__like-button-image')

        if(likeImage.classList[1] != undefined){
            likeImage.src = '../icons8-star-64.png'
            likeImage.classList.remove('active');
        }else{
            likeImage.src = '../icons8-star-64-yellow.png'
            likeImage.classList.add('active');
        }

        await fetch(`/stories/${storyId}/likes`, { method: 'POST'})
        return
    })
})