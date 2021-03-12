document.addEventListener('DOMContentLoaded', async () => {
    const commentSubmit = document.getElementById('comment__submit');
    const commentViewButton = document.getElementById('view-comment-button');
    const commentAddButton = document.getElementById('add-comment-button');

    let commentsVisible = false;

    commentSubmit.addEventListener('click', async () => {
        const textArea = document.getElementById('comment__body');
        const body = textArea.value;
        const storyId = textArea.classList[0];
        const userId = textArea.classList[1];
        

        if(body){
            const futureComment = {
                body: body, 
                userId: userId,
                storyId: storyId
            }

            await fetch(`/stories/${storyId}/comments`, { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(futureComment),
            })
            
            if(commentsVisible){
                const commentUL = document.getElementById('comment__view-list');
                const screenName = textArea.classList[2]
                const pictureURL = textArea.classList[3]
                
                const container = document.createElement('li');
                const author = document.createElement('h3');
                const body = document.createElement('pre');
                
                author.innerText = screenName;
                body.innerText = futureComment.body;
                
                // container.classlist.add('')
                // author.classlist.add('')
                // body.classlist.add('')
                
                container.appendChild(author);
                container.appendChild(body);
                
                commentUL.appendChild(container);
                
            }
                
            }
    })

    commentViewButton.addEventListener('click', async () => {
        const commentUL = document.getElementById('comment__view-list');
        
        if(!commentsVisible){
            const storyId = commentViewButton.classList[0];
            const commentsResponse = await fetch(`/stories/${storyId}/comments`);
            const comments = await commentsResponse.json()

                comments.forEach(comment => {
                    const container = document.createElement('li');
                    const author = document.createElement('h3');
                    const body = document.createElement('pre');

                    author.innerText = comment.User.screenName;
                    body.innerText = comment.body;

                    // container.classlist.add('')
                    // author.classlist.add('')
                    // body.classlist.add('')

                    container.appendChild(author);
                    container.appendChild(body);

                    commentUL.appendChild(container);

                })
                commentViewButton.innerText = 'Hide Comments...'
                commentsVisible = true;
            }else{
                commentViewButton.innerText = 'View Comments...'
                commentUL.innerHTML = '';
                commentsVisible = false;
            }
    })

})