document.addEventListener('DOMContentLoaded', async () => {
    const likeButton = document.getElementById('like-button')

    likeButton?.addEventListener('click', async () => {
        // console.log(likeButton.classList[1]);
        const storyId = parseInt(likeButton.classList[1], 10);

        const likeImage = document.getElementById('story-titlebox__like-button-image')
        const likeCount = document.getElementById('story-titlebox__like-count')

        if(likeImage.classList[1] != undefined){
            likeImage.src = '../icons8-star-64.png'
            likeImage.classList.remove('active');
            likeCount.innerHTML--
            likeImage.title ='Like'
        }else{
            likeImage.src = '../icons8-star-64-yellow.png'
            likeImage.classList.add('active');
            likeCount.innerHTML++
            likeImage.title = 'Unlike'
        }

        await fetch(`/stories/${storyId}/likes`, { method: 'POST'})

        return
    })
})
