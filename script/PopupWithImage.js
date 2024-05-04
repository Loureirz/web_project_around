import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(imageSelector, titleSelector, popupSelector){
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imageSelector = this._popup.querySelector(imageSelector);
    this._titleSelector = this._popup.querySelector(titleSelector);
  }

  close(){
    super.close();
  }

  open(image, name){
    const imageElement = document.querySelector('.zoom__popup-image');
    const nameElement = document.querySelector('.zoom__popup-text');

    imageElement.src = image;
    imageElement.alt = name;
    nameElement.textContent = name;
    super.open();
  }

  setEventListeners(){
    const closeZoom = this._popup.querySelector(".zoom__close");
    closeZoom.addEventListener("click", () => this.close());
  }
}