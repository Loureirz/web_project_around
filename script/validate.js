export function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputOne = formElement.querySelector(config.inputSelectorOne);
  const inputTwo = formElement.querySelector(config.inputSelectorTwo);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const errorElementOne = formElement.querySelector(config.errorClassOne);
  const errorElementTwo = formElement.querySelector(config.errorClassTwo);

  function validateInputLength(input, errorElement) {
    if (input.value.trim().length === 0) {
      errorElement.textContent = "Preencha este campo.";
      return false;
    } else if (input.value.trim().length < 2) {
      errorElement.textContent = "O campo deve ter pelo menos 2 caracteres.";
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  function validateInputValidity(input, errorElement) {
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  function validateForm() {
    const isInputOneValid = validateInputLength(inputOne, errorElementOne);
    const isInputTwoValid = validateInputLength(inputTwo, errorElementTwo) && validateInputValidity(inputTwo, errorElementTwo);

    submitButton.disabled = !(isInputOneValid && isInputTwoValid);
  }

  function handleInputChange(evt) {
    validateForm();
  }

  function clearErrorMessages() {
    errorElementOne.textContent = "";
    errorElementTwo.textContent = "";
  }

  inputOne.addEventListener("input", handleInputChange);
  inputTwo.addEventListener("input", handleInputChange);

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    validateForm();
  });

  validateForm();

  clearErrorMessages();
}