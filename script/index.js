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
const cardOpen = document.querySelector('.overlay-open');
const cardClose = document.querySelector('.overlay__close');

cardButton.addEventListener("click", function(){
  cardOpen.style.display = 'flex';
})

cardClose.addEventListener("click", function(){
  cardOpen.style.display = 'none';
})

//POPUP CARD - Add image//

function renderCard(card) {
  const template = document
    .querySelector("#template")
    .content.querySelector(".elements__card");

  const currentCard = template.cloneNode(true);

  currentCard.querySelector(".elements__card-name").textContent = card.name;

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("src", card.link);

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("alt", card.name);

  currentCard
    .querySelector(".elements__card-image")
    .addEventListener("click", (evt) => {
      const zoomPopup = document.querySelector('.zoom__popup');
      const zoomOpen = document.querySelector('.zoom-open');

      const imageElement = document.querySelector('.zoom__popup-image');
      const nameElement = document.querySelector('.zoom__popup-text');

      imageElement.src = card.link;
      imageElement.alt = card.name;
      nameElement.textContent = card.name;

      zoomOpen.style.display = 'flex';

      const zoomClose = document.querySelector('.zoom__close');

      zoomClose.addEventListener("click", function(){
        zoomOpen.style.display = 'none';
      })
    })

  currentCard
    .querySelector(".elements__delete-icon")
    .addEventListener("click", (evt) => {
      const elements = document.querySelector(".elements");
      const card = evt.target.offsetParent;

      elements.removeChild(card);
    });

  currentCard
    .querySelector(".elements__like-icon")
    .addEventListener("click", (evt) => {
      if (evt.target.getAttribute("src") === "./images/heart.svg") {
        return evt.target.setAttribute(
          "src",
          "./images/like.svg"
        );
      }

      return evt.target.setAttribute("src", "./images/heart.svg");
    });

  return currentCard;
}

const elements = document.querySelector(".elements");

initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  elements.append(cardItem);
});

const formAddCard = document.querySelector('.formcard__fieldset');
formAddCard.addEventListener("submit", function(evt){
  evt.preventDefault();
  const inputTitle = formAddCard.querySelector('.formcard__title-input');
  const inputImage = formAddCard.querySelector('.formcard__link-input');

  const newCard = renderCard({
    name: inputTitle.value,
    link: inputImage.value,
  });

  document.querySelector(".elements").prepend(newCard);
  formAddCard.reset();

  cardOpen.style.display = 'none';
})