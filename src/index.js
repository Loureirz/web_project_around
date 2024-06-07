import "./styles/index.css";

import {
  profileButton,
  formElement,
  nameInput,
  jobInput,
  cardButton,
  formCard,
  formAvatar,
  openEditAvatar,
} from "./script/utils.js"

import FormValidator from './script/FormValidator.js';
import Card from './script/card.js';
import { Section } from './script/section.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { PopupWithConfirmation } from './script/PopupWithConfirmation.js'
import { UserInfo } from './script/UserInfo.js';
import { Api } from './script/Api.js';

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-10",
  headers: {
    authorization: "cc445779-d6db-4667-8701-d2576b6346ad",
    "Content-Type": "application/json"
  }
})

// Validação de formulários //

const configUserValidate = { inputSelectorOne: ".form__input-name", inputSelectorTwo: ".form__input-job", submitButtonSelector: ".form__submit", errorClassOne: ".form__input-name-error", errorClassTwo: ".form__input-job-error" }
const configFormValidade = { inputSelectorOne: ".formcard__input-title", inputSelectorTwo: ".formcard__input-link", submitButtonSelector: ".formcard__submit", errorClassOne: ".formcard__input-title-error", errorClassTwo: ".formcard__input-link-error" }
const configAvatarValidade = { inputSelectorTwo: ".formavatar__input-link", submitButtonSelector: ".formavatar__submit", errorClassTwo: ".formavatar__input-link-error" }

new FormValidator(configUserValidate, formElement).enableValidation();
new FormValidator(configFormValidade, formCard).enableValidation();
new FormValidator(configAvatarValidade, formAvatar).enableValidation();


// Confirmação de exclusão do card //

const popupDelete = new PopupWithConfirmation({
  popupSelector: "#popup-confirm",
  submitCallback: (card) => {
  return api
          .removeCard(card._cardId)
          .then(() => {
        card.removeElement();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

  popupDelete.setEventListeners();

// Instância de usuário //

const infoUser = new UserInfo(".profile__info-name", ".profile__info-text", ".profile__image" );

api
  .getUserInfo()
  .then(({name, about, avatar}) => {
    infoUser.setUserInfo(name, about, avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const popupInfoUser = new PopupWithForm("#popup-user", ({name, about}) => {
  api.editUserInfo(name, about);
  const { avatar } = infoUser.getUserInfo();
  infoUser.setUserInfo(name, about, avatar);
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

// Edit Avatar //

const avatarEdit = new PopupWithForm("#popup-avatar", ({image}) => {
  api.editAvatar({
    avatar: document.querySelector(".formavatar__input-link").value,
  });
  const { name, about } = infoUser.getUserInfo();
  infoUser.setUserInfo(name, about, image);
},
  ".popup__avatar-form"
);

avatarEdit.setEventListeners();

openEditAvatar.addEventListener("click", () => {
  avatarEdit.open();
})


// Gerador de cards //

const createNewCard = (item) => {
  const card = new Card(
    item,
    "#template",
    (image, title) => {
    popupImg.open(image, title);
    popupImg.setEventListeners();
  },
  () => {
    popupDelete.open(card);
  },
    api.addLikes.bind(api),
    api.removeLike.bind(api),
  );
  return card.generateCard();
}

api
  .getInitialCards()
  .then((initialCards) => {
    const section = new Section ({
      items: initialCards,
      renderer: (item) => {
      const card = new Card(item, document.querySelector("#template"), (image, title) => {
        popupImg.open(image, title);
        popupImg.setEventListeners();
      },
   () => {
    popupDelete.open(card);
  },
      api.addLikes,
      api.removeLike,);

      return card.generateCard();
      },
    }, ".elements");
    section.renderItems();
  })
  .catch((err => {
    console.log(err);
  }));

// Função para criar novos cards //

// Instância para adicionar novos Cards //

const formCardAdd = new PopupWithForm(".popup_add", () => {
  api
    .addCard({
      name: document.querySelector(".formcard__input-title").value,
      link: document.querySelector(".formcard__input-link").value,
    })
    .then((result) => {
      document
          .querySelector(".elements__card")
          .prepend(createNewCard(result));
    })
},
  ".formcard__fieldset"
);

formCardAdd.setEventListeners();

cardButton.addEventListener("click", () => {
  formCardAdd.reset();
  formCardAdd.open();
});

// Zoom imagens //

const popupImg = new PopupWithImage(
  ".popup__zoom-image",
   ".popup__zoom-text",
    ".popup_image");

