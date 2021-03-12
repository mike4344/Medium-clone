const userArray = [
    'eren@gmail.com',
    'naruto@gmail.com',
    'goku@gmail.com',
    'kakashi@gmail.com',
    'obito@gmail.com',
]

function returnRandomEmail(arr){
    let rng = Math.floor(Math.random() * Math.floor(arr.length - 1))
    return arr[rng]
}

document.addEventListener('DOMContentLoaded', async () => {
    const randomDemoUserButton = document.getElementById('random-demo-user')
    randomDemoUserButton.addEventListener('click', async () => {

        await fetch('/logout');        
        const demoCreds = {
            email: returnRandomEmail(userArray),
            password: 'Passw0rd!'
        }
        
        await fetch('login/random-demo', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(demoCreds)
        });
    })

})