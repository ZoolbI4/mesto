const popup = document.querySelector(".popup");
const popupForm = popup.querySelector('[name="profileEdit"]');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector(".popup__close-btn");
const profileName = document.querySelector (".profile__title");
const profileProffesional = document.querySelector(".profile__subtitle");
const nameInput = popup.querySelector ("#name");
const proffesionalInput = popup.querySelector ("#proffesional");

function openPopup() {
    popup.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    proffesionalInput.value = profileProffesional.textContent;
}

function closePopup() {
    popup.classList.remove('popup_open');
}

function editFormPopup(evt) {
evt.preventDefault();
profileName.textContent = nameInput.value;
profileProffesional.textContent = proffesionalInput.value;
closePopup();
}

popupForm.addEventListener('submit', editFormPopup);
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

