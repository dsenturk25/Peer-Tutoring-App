
/* type includes success error confirm and question */

async function popUp (type, title, text) {

  const popUpWrapper = document.createElement("div");
  popUpWrapper.classList.add("popup-wrapper");
  setTimeout(( ) => {
    popUpWrapper.style.filter = "opacity(1)";
  }, 1)

  
  type == "success" ? popUpWrapper.style.borderTop = "10px solid lightgreen" : type == "error" ? popUpWrapper.style.borderTop = "10px solid lightcoral" : popUpWrapper.style.borderTop = "10px solid lightblue";

  const headerWrapper = document.createElement("div");
  headerWrapper.classList.add("popup-header-wrapper");
  
  const titleContent = document.createElement("div");
  titleContent.classList.add("popup-title-content");
  titleContent.innerHTML = title;

  const descriptionContent = document.createElement("div");
  descriptionContent.classList.add("popup-description-content");
  descriptionContent.innerHTML = text;

  headerWrapper.appendChild(titleContent);
  headerWrapper.appendChild(descriptionContent);

  popUpWrapper.appendChild(headerWrapper);

  const proceedButton = document.createElement("div");
  proceedButton.classList.add("popup-proceed-button");
  proceedButton.innerHTML = "Go back"

  proceedButton.addEventListener("click", (event) => {
    document.body.removeChild(popUpWrapper);
  })

  if (type == "confirm") {

    const confirmButtonsWrapper = document.createElement("div");
    confirmButtonsWrapper.classList.add("popup-confirm-buttons-wrapper");

    const yesButton = document.createElement("div");
    yesButton.classList.add("popup-button");
    yesButton.classList.add("popup-yes-button");
    yesButton.innerHTML = "☑ Confirm";

    const noButton = document.createElement("div");
    noButton.classList.add("popup-button");
    noButton.classList.add("popup-no-button");
    noButton.innerHTML = "☒ Cancel"

    confirmButtonsWrapper.appendChild(noButton);
    confirmButtonsWrapper.appendChild(yesButton);

    popUpWrapper.appendChild(confirmButtonsWrapper);

    popUpWrapper.appendChild(proceedButton);
    document.body.appendChild(popUpWrapper);

    return new Promise((resolve, reject) => {
      yesButton.onclick = () => {
        document.body.removeChild(popUpWrapper);
        resolve(true);
      }
      
      noButton.onclick = () => {
        document.body.removeChild(popUpWrapper);
        resolve(false);
      }

      setTimeout(() => reject(), 10000000);
    })

  } else if (type == "question") {
    const questionTextAreaWrapper = document.createElement("div");
    questionTextAreaWrapper.classList.add("popup-question-wrapper");

    const questionTextAreaInput = document.createElement("textarea");
    questionTextAreaInput.classList.add("popup-question-input-content");

    questionTextAreaWrapper.appendChild(questionTextAreaInput);
    popUpWrapper.appendChild(questionTextAreaWrapper);

    const saveQuestionButton = document.createElement("div");
    saveQuestionButton.classList.add("popup-save-question-proceed-button");
    saveQuestionButton.innerHTML = "Proceed";

    questionTextAreaWrapper.appendChild(saveQuestionButton);

    popUpWrapper.appendChild(proceedButton);
    document.body.appendChild(popUpWrapper);

    return new Promise((resolve, reject) => {
    
      saveQuestionButton.addEventListener("click", (event) => {

        document.body.removeChild(popUpWrapper);
        resolve(questionTextAreaInput.value);
      })

      setTimeout(() => reject(), 10000000)
    })

  } else {
    popUpWrapper.appendChild(proceedButton);
    document.body.appendChild(popUpWrapper);
  }
}
