import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({popupSelector, submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  open(card){
    this._card = card;
    super.open();
  }

  setEventListeners(){
    super.setEventListeners();
    const deleteConfirm = document.querySelector(".popup-confirm__btn");

    deleteConfirm.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._card).then(() => {
        this.close();
      });
    });
  }
}