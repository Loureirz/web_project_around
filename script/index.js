//INITIAL CARDS//
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

//POPUP PROFILE - Open, Close and Edit//

const profileButton = document.querySelector('.profile__info-button');
const formEdit = document.querySelector('.popup');
const formOpen = document.querySelector('.popup-opened');
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

//POPUP CARD - Open and Close//

const cardButton = document.querySelector('.profile__button');
const cardOpen = document.querySelector('.overlay__open');
const cardClose = document.querySelector('.overlay__close');

cardButton.addEventListener("click", function(){
  cardOpen.style.display = 'flex';
})

cardClose.addEventListener("click", function(){
  cardOpen.style.display = 'none';
})