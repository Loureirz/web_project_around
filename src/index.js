import FormValidator from '../script/FormValidator.js';
import Card from '../script/card.js';
import { Section } from '../script/section.js';
import { PopupWithImage } from '../script/PopupWithImage.js';
import { Popup } from '../script/Popup.js';
import { PopupWithForm } from '../script/PopupWithForm.js';
import { UserInfo } from '../script/UserInfo.js';

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

//Constantes//

export const profileButton = document.querySelector('.profile__info-button');
export const formOpen = document.querySelector('.popup-opened');
export const formElement = document.querySelector('.form__fieldset');
export const nameInput = document.querySelector('.form__input-name');
export const jobInput = document.querySelector('.form__input-job');
export const nameProfile = document.querySelector('.profile__info-name');
export const jobProfile = document.querySelector('.profile__info-text');
export const cardButton = document.querySelector('.profile__button');
export const Overlay = document.querySelector('.overlay');
export const zoomOpen = document.querySelector('.zoom-open');
export const zoom = document.querySelector('.popup_image');
export const formCard = document.querySelector('.formcard__fieldset');
const imgbtn = document.querySelector(".profile__info-button-image");

//Validação de formulários

const configUserValidate = { inputSelectorOne: ".form__input-name", inputSelectorTwo: ".form__input-job", submitButtonSelector: ".form__submit", errorClassOne: ".form__input-name-error", errorClassTwo: ".form__input-job-error" }
const configFormValidade = { inputSelectorOne: ".formcard__input-title", inputSelectorTwo: ".formcard__input-link", submitButtonSelector: ".formcard__submit", errorClassOne: ".formcard__input-title-error", errorClassTwo: ".formcard__input-link-error" }

new FormValidator(configUserValidate, formElement).enableValidation();
new FormValidator(configFormValidade, formCard).enableValidation();

//Instancia de usuario

const infoUser = new UserInfo(".profile__info-name", ".profile__info-text");

const popupInfoUser = new PopupWithForm("#popup-user", ({name, job}) => {
  infoUser.setUserInfo(name, job)
},
  ".form__fieldset"
);

popupInfoUser.setEventListeners();

profileButton.addEventListener("click", () => {
  const { name, job } = infoUser.getUserInfo();

  nameProfile.value = name,
  jobProfile.value = job,

  console.log(name, job);

  popupInfoUser.open();
})

const popupImg = new PopupWithImage(
  ".zoom__popup-image",
   ".zoom__popup-text",
    ".popup_image");

// Gerador de cards //

const section = new Section ({
  items: initialCards,
  renderer: (item) => {
    console.log(item)
  const card = new Card(item, document.querySelector("#template"), (image, title) => {
    console.log(image)
    popupImg.open(image, title);
    popupImg.setEventListeners();
  });
  return card.generateCard();
  },
}, ".elements");
section.renderItems();

//Instância para adicionar novos Cards

const formCardAdd = new PopupWithForm(".popup_add", (item) => {
  const card = new Card(item, "#template", (image, title) => {
    popupImg.open(image, title);
    popupImg.setEventListeners();
  });

  const cardElement = card.generateCard();

  console.log(cardElement);

  section.addElement(cardElement);
},
  ".formcard__fieldset"
);

formCardAdd.setEventListeners();

cardButton.addEventListener("click", () => {
  formCardAdd.reset();
  formCardAdd.open();
});