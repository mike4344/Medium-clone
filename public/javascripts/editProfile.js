window.addEventListener('DOMContentLoaded', () => {

    let flipped = false;
    let frontBack = document.querySelector('.edit-profile__container-back');

    frontBack.addEventListener('mouseover', (event) => {
        frontBack.classList.remove('edit-profile__container-front');
        flipped = true;
    });


})