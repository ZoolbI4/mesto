function enableValidation(classData) {
  const formList = document.querySelectorAll(`.${classData.formSelector}`);
  formList.forEach(function (formElement) {
    setEventListeners(formElement, classData);
  });
}

function setEventListeners(formElement, classData) {
  const inputList = Array.from(formElement.querySelectorAll(`.${classData.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${classData.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, classData.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, classData.errorClass, classData.inputErrorClass);
      toggleButtonState(inputList, buttonElement, classData.inactiveButtonClass);
    });
  });
}

function checkInputValidity(formElement, inputElement, errorClass, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
}

function showInputError(formElement, inputElement, validationMessage, errorClass, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

 enableValidation(classData);
