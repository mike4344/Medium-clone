document.addEventListener('DOMContentLoaded', async () => {
    const commentSubmit = document.getElementById('comment__submit');
    const cancelCommentButton = document.getElementById('comment__cancel')
    const commentViewButton = document.getElementById('view-comment-icon');
    const commentAddButton = document.getElementById('add-comment-icon');
    const commentFormContainer = document.getElementById('comment-form-container');
    const commentUL = document.getElementById('comment__view-list');

    let commentsVisible = false;
    let emptyMessage = false;
    let errorMessage = false;


    //Add comments ---
    if(commentSubmit){
        console.log(commentSubmit);
        commentSubmit.addEventListener('click', async () => {
            //grab input
            const textArea = document.getElementById('comment__body');
            //grab comment body from input
            const body = textArea.value;
            //'hidden' inputs -- we used class list to store variables from our pug file, destructured here
            const storyId = textArea.classList[0];
            const userId = textArea.classList[1];

            //if comment body exists, comment is posted.  If no comment body exists, an error message is rendered.
            if(body){
                //Future comment stores variables from our text area
                const futureComment = {
                    body: body,
                    userId: userId,
                    storyId: storyId
                }

                //calling our post to our database
                await fetch(`/stories/${storyId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(futureComment),
                })

                //Checks to see if user has enabled "view comments"
                if(commentsVisible){
                    //Checks for and removes error messages before adding new comments
                    if(emptyMessage || errorMessage){
                        commentUL.innerHTML = '';
                        if(emptyMessage) emptyMessage = false;
                        if(errorMessage) errorMessage = false;
                    }

                    //more 'hidden' inputs from our text area -- aka class list
                    const screenName = textArea.classList[3]
                    const pictureURL = textArea.classList[2]

                    commentUL.appendChild(renderComment(screenName, body, pictureURL));

                }
                //Resets text area and disables the comment form if comment post successful
                textArea.value = '';
                commentFormContainer.classList.add('hidden');
                // commentAddButton.classList.remove('hidden');
            }else{
                //Displays an error message when body is empty//
                //if statement prevents message from being rendered twice
                if(!errorMessage){
                    const msg = document.createElement('h3');
                    msg.setAttribute('id', 'error-message');
                    msg.innerText = 'Please enter a comment!';
                    commentUL.appendChild(msg);
                    errorMessage = true;
                }
            }
        })
    }


    //Loads comments to list element
    commentViewButton.addEventListener('click', async () => {
        //If statment works as toggle -- if comments are visibile at time of click, we populate the view.
        //if comments are visibile at time of click, we clear the view(below)
        if(!commentsVisible){
            //using classlist to transfer variables through pug
            const storyId = commentViewButton.classList[0];
            //fetches and formats all comments related to this story
            const commentsResponse = await fetch(`/stories/${storyId}/comments`);
            const comments = await commentsResponse.json()
            
            //If no comments, renders message to user
            if(comments.length === 0){
                const msg = document.createElement('h1');
                msg.setAttribute('id', 'no-comments-message');
                msg.innerText = 'No comments yet!  Be the first to add one!'
                commentUL.appendChild(msg);
                emptyMessage = true;
            }
            
            //For each comment, creates elements, adds text to element, then appends element to page flow
            comments.forEach(async (comment) => {
                const likeAmountQuery = await fetch(`/comments/${comment.id}/likes`);
                const likes = await likeAmountQuery.json();
                
                const currentUserCheck = await fetch(`/comments/${comment.id}/current-user`)
                const currentUserLikeStatus = await currentUserCheck.json();
                
                console.log(currentUserLikeStatus);
                commentUL.appendChild(renderComment(comment.User.screenName, comment.body, comment.User.pictureURL, comment.id, currentUserLikeStatus, likes.count));
                console.log(commentUL);
                })
                //Toggles button text to 'hide comments' upon comment rendering and sets commentsVisible flag to true
                commentViewButton.innerText = 'Hide Comments...'
                commentsVisible = true;
            }else{
                //Upon click when 'commmentsVisible = true'
                //Clears comment view entirely, sets flag to false
                commentViewButton.innerText = 'View Comments...'
                commentUL.innerHTML = '';
                commentsVisible = false;
            }
    })


    //'add comment' button activates comment form
        commentAddButton.addEventListener('click', () => {
            commentFormContainer.classList[1] === 'hidden' ? commentFormContainer.classList.remove('hidden') : commentFormContainer.classList.add('hidden');
        })

        //Mouse over control
        commentAddButton.addEventListener('mouseover', () => {
            commentAddButton.src = '/icons8-edit.gif'
        })
        //mouse leave conrtol
        commentAddButton.addEventListener('pointerleave', () => {
            commentAddButton.src = '/icons8-edit-64.png'
        })
    
    

        //'trash' comment icon deactivates comment form
    if(cancelCommentButton){
        cancelCommentButton.addEventListener('click', () => {
            const textArea = document.getElementById('comment__body');
            textArea.value = ''
            commentFormContainer.classList.add('hidden');
            commentAddButton.classList.remove('hidden');
            if(errorMessage){
            const errMsg = document.getElementById('error-message');
            errMsg.remove();
            errorMessage = false;
            }
        })
    }

    //Comment renderer helper function
    function renderComment(author, body, imgURL, id = null, currentUserLike = null, currentLikes = 0) {
        //container
        const container = document.createElement('li');
        //authorbox
        const authorContainer = document.createElement('div');
        const authorScreenName = document.createElement('h3');
        const authorIMG = document.createElement('img');
        //comment body
        const bodyDisplay = document.createElement('pre');
        //like button
        const commentLikeDiv = document.createElement('div');
        const commentLikeIcon = document.createElement('img');
        const likeAMTDisplay = document.createElement('p');

        //Setting values of each element
        authorIMG.setAttribute('src', imgURL);
        authorScreenName.innerText = author;
        bodyDisplay.innerText = body;
        likeAMTDisplay.innerText = currentLikes;


        //Assigning classes to each element, used in 'comments' CSS
        container.classList.add('comment-view__comment-container')
        authorContainer.classList.add('comment-view__comment-author-container');
        authorIMG.classList.add('comment-view__comment-author-image')
        authorScreenName.classList.add('comment-view__comment-author-screen-name')
        bodyDisplay.classList.add('comment-view__comment-body')
        commentLikeDiv.classList.add('comment-view__comment-like-container')
        commentLikeIcon.classList.add('form__icon');
        commentLikeIcon.classList.add('comment-view__comment-like-icon');
        likeAMTDisplay.classList.add('comment-view__comment-like-amount')
        // if(id) commentLikeIcon.classList.add(id);

        if(currentUserLike){
            commentLikeIcon.classList.add('active')
            commentLikeIcon.setAttribute('src', '/icons8-star-64-yellow.png')
        }else{
            commentLikeIcon.setAttribute('src', '/icons8-star-64.png')
        }

        //Appends each element to its respective container
        commentLikeDiv.appendChild(likeAMTDisplay);
        commentLikeDiv.appendChild(commentLikeIcon);
        authorContainer.appendChild(authorIMG);
        authorContainer.appendChild(authorScreenName);

        if(id){
            //Assigns event listener to icon
            authorContainer.appendChild(commentLikeDiv);

            if(commentSubmit){
                commentLikeIcon.addEventListener('click', async () => {

                    if(commentLikeIcon.classList[1]){
                        commentLikeIcon.classList.remove('active');
                        commentLikeIcon.setAttribute('src', '/icons8-star-64.png')
                        likeAMTDisplay.innerText--;
                    }else{
                        commentLikeIcon.classList.add('active')
                        commentLikeIcon.setAttribute('src', '/icons8-star-64-yellow.png')
                        likeAMTDisplay.innerText++;
                    }

                    await fetch(`/comments/${id}/likes`, { method: 'POST'})
                    return
                })
            }

        }
        //Appending to overall container
        container.appendChild(authorContainer);
        container.appendChild(bodyDisplay);

        //returns container to be appended to parent
        return container;
    }



})

// async function likeComment(id){
//     await fetch(`/comments/${id}/likes`, { method: 'POST' })
// }
