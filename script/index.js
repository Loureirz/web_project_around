const profileButton = document.querySelector('.profile__info-button');
const formEdit = document.querySelector('.popup');
const formOpen = document.querySelector('.popup__opened');
const formClose = document.querySelector('.popup__close');

const formElement = document.querySelector('.form__fieldset');
const nameInput = document.querySelector('.form__name-input');
const jobInput = document.querySelector('.form__about-input');
const nameProfile = document.querySelector('.profile__info-name');
const jobProfile = document.querySelector('.profile__info-text');

profileButton.addEventListener("click", function(){
  formOpen.style.display = 'flex';
});

formClose.addEventListener("click", function(){
  formOpen.style.display = 'none';
})

formElement.addEventListener("submit", function(evt){
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  formOpen.style.display = 'none';
})