window.addEventListener('DOMContentLoaded', () => {

    let mainCard = document.querySelector('.edit-profile__container-main');
    let frontCard = document.querySelector('.edit-profile__container-front');
    let backCard = document.querySelector('.edit-profile__container-back');

    mainCard.addEventListener('mouseover', (event) => {
        frontCard.classList.add('hide');
        backCard.classList.remove('hide');
    });

})