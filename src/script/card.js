export default class Card {
  constructor(
    dataCard,
    dataTemplate,
    handleImagePopup,
    handleCardDelete,
    handleAddLike,
    handleRemoveLike,
  ) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this.owner = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._data = dataCard;

    this._dataTemplate = dataTemplate;

    this._handleImagePopup = handleImagePopup;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector("#template").content.querySelector(".elements__card").cloneNode(true);
    return cardElement;
  }

  removeElement() {
    this._element.remove();
  }

  _setEventListeners() {

    this._trash();
    this._element.querySelector(".elements__card-image").addEventListener("click", () => {
      this._handleImagePopup(this._link, this._name);
    });

    this._element.querySelector(".elements__like-button").addEventListener("click", () => {
      this._likedButton();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const currentCardName = this._element.querySelector(".elements__card-name");
    currentCardName.textContent = this._name;
    this._element.querySelector(".elements__like-counter").textContent = this._likes.length;

    const imageElement = this._element.querySelector(".elements__card-image");
    imageElement.setAttribute("src", this._link);
    imageElement.setAttribute("alt", this._name);

    const remove = () => {
      const myId = "40bf3b12a3d0fe74bfbe12d1";
      if (this.owner === myId) {
        this._element.querySelector(".elements__delete-button").classList.add("elements__delete-button-hidden");
        return true;
      }
    };
    remove();

    if (this.isLiked()) {
      const likeButton = this._element.querySelector(".elements__like-button");
      likeButton.classList.add("elements__like-button_press");
    }

    return this._element;
  }

  isLiked() {
    const myId = "40bf3b12a3d0fe74bfbe12d1";
    return this._likes.find((res) => res._id === myId);
  }

  _likedButton() {
      const likeButton = this._element.querySelector(".elements__like-button");
      const likeCount = this._element.querySelector(".elements__like-counter");

      if (!this.isLiked()) {
        this._handleAddLike(this._cardId).then((res) => {
          likeButton.classList.add("elements__like-button_press");
          likeCount.textContent = res.likes.length;
          this._likes = res.likes;
        });
      } else {
        this._handleRemoveLike(this._cardId).then((res) => {
          likeButton.classList.remove("elements__like-button_press");
          likeCount.textContent = res.likes.length;
          this._likes = res.likes;
        });
      }
    };

    _trash() {
      const trashClick = this._element.querySelector(".elements__delete-button");
      trashClick.addEventListener("click", () => {
        this._handleCardDelete();
      })
    }
}
