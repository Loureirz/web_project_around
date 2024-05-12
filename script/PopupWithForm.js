import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack, popupForm){
        super(popupSelector);
        this._submitCallBack = submitCallBack;
        this._formElement = document.querySelector(popupForm);
    }

    _getInputValues() {
     const inputs = Array.from(this._formElement.querySelectorAll("input"));
     console.log(inputs);
      const values = {};

      inputs.forEach(input => {
          values[input.name] = input.value;
      });
      console.log(values);
      return values;

      /*const title = this._formElement.querySelector(".formcard__input-title").value;
      const link = this._formElement.querySelector(".formcard__input-link").value;

      const newCard = {
        title,
        link
      }

      return newCard;*/
  }

    setEventListeners(){
      super.setEventListeners();
      console.log(this._formElement);
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();

        const values = this._getInputValues();
        console.log(values);
        this._submitCallBack(values);
        this.close();
      })
    }

    close(){
        super.close();
    }

    reset(){
        this._formElement.reset()
    }

}