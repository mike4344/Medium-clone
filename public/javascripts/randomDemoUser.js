const userArray = [
    'LightYagami@gmail.com',
    'meliodas@gmail.com',
    'ban@gmail.com',
    'escanor@gmail.com',
    'Goku@gmail.com',
    'vegeta@gmail.com',
    'naruto@gmail.com',
    'sasuke@gmail.com',
    'itachi@gmail.com',
    'kakashi@gmail.com',
    'hinata@gmail.com',
    'obito@gmail.com',
    'madara@gmail.com',
    'Hashirama@gmail.com',
    'tobirama@gmail.com',
    'hiruzen@gmail.com',
    'Tsunade@gmail.com',
    'deku@gmail.com',
    'allMight@gmail.com',
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

        const fetchRes = await fetch('login/random-demo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(demoCreds)
        })
        if (fetchRes) {
            window.location.replace('/')
        }

    })

})
