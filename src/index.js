import "./styles/index.css";

import {
  initialCards,
  profileButton,
  formElement,
  nameInput,
  jobInput,
  cardButton,
  formCard,
} from "./script/utils.js"

import FormValidator from './script/FormValidator.js';
import Card from './script/card.js';
import { Section } from './script/section.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { UserInfo } from './script/UserInfo.js';

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

profileButton.addEventListener("click", () => {

  const infoUser = new UserInfo(".profile__info-name", ".profile__info-text");
  const { name, job } = infoUser.getUserInfo();

  nameInput.value = name;
  jobInput.value = job;

  popupInfoUser.open();
})

popupInfoUser.setEventListeners();

const popupImg = new PopupWithImage(
  ".popup__zoom-image",
   ".popup__zoom-text",
    ".popup_image");

// Gerador de cards //

const section = new Section ({
  items: initialCards,
  renderer: (item) => {
  const card = new Card(item, document.querySelector("#template"), (image, title) => {
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

  section.addElement(cardElement);
},
  ".formcard__fieldset"
);

formCardAdd.setEventListeners();

cardButton.addEventListener("click", () => {
  formCardAdd.reset();
  formCardAdd.open();
});