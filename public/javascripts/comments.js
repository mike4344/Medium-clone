document.addEventListener('DOMContentLoaded', async () => {
    const commentSubmit = document.getElementById('comment__submit');
    const cancelCommentButton = document.getElementById('comment__cancel')
    const commentViewButton = document.getElementById('view-comment-button');
    const commentAddButton = document.getElementById('add-comment-button');
    const commentFormContainer = document.getElementById('comment-form-container');
    const commentUL = document.getElementById('comment__view-list');
    
    let commentsVisible = false;
    let emptyMessage = false;
    let errorMessage = false;


    //Add comments ---
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
                const screenName = textArea.classList[2]
                const pictureURL = textArea.classList[3]
                
                //creates new comment display elements
                const container = document.createElement('li');
                const author = document.createElement('h3');
                const body = document.createElement('pre');
                
                //sets texts for each element
                author.innerText = screenName;
                body.innerText = futureComment.body;
                
                //sets classes for styles for each element
                // container.classlist.add('')
                // author.classlist.add('')
                // body.classlist.add('')
                
                //Append to page flow
                container.appendChild(author);
                container.appendChild(body);
                
                commentUL.appendChild(container);
                
            }
            //Resets text area and disables the comment form if comment post successful
            textArea.value = '';
            commentFormContainer.classList.add('hidden');
            commentAddButton.classList.remove('hidden');         
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
        commentFormContainer.classList.remove('hidden');
        commentAddButton.classList.add('hidden');
    })

    //'trash' comment icon deactivates comment form
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
})