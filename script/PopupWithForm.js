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
          values[input] = input.value;
      });
      console.log(values);
      return values;
  }

    setEventListeners(){
      super.setEventListeners();
      console.log(this._formElement);
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();

        const valores = this._getInputValues();
        console.log(valores);
        this._submitCallBack(valores);
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