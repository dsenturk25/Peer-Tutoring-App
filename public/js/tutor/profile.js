
window.onload = () => {
  logoutButton();

  const zoomLinkInput = document.getElementById("tutor-zoom-link");
  const saveZoomLinkButton = document.getElementById("submit-zoom-link");

  saveZoomLinkButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/link"), "POST", {
      link: zoomLinkInput.value
    }, (response) => {
      if (response.success) popUp("success", "Meeting link updated!", "Your new Zoom link is successfully updated and saved.");
      else popUp("error", "Couldn't update Zoom link!", "There is an issue on our side. Thank you for your understanding.")
})
  })

  const profileImageContent = document.getElementById("profile-image-content");
  const profileImageInput = document.getElementById("profile-image-input");

  profileImageInput.addEventListener("mouseenter", (event) => {
    const editLabel = document.createElement("div");
    
    editLabel.innerHTML = "change profile photo";
    editLabel.classList.add("edit-label-image-top-content")
    profileImageInput.parentNode.appendChild(editLabel);

    profileImageInput.addEventListener("mouseleave", (event) => {
      
      profileImageInput.parentNode.removeChild(editLabel);
    })
  })

  profileImageInput.addEventListener("change", (event) => {
    
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;
            profileImageContent.src = imageSrc;

            const formData = new FormData();
            formData.append("file", file)
            serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/photo"), "FORM", formData, (response) => {
              if (response.success) popUp("success", "Photo successfully updated!", "Your new photo is successfully uploaded and saved.");
              else popUp("error", "Couldn't upload photo!", "There is an issue on our side. Thank you for your understanding.")
            })
        };
        reader.readAsDataURL(file);
    }
  })

  const bioEditContent = document.getElementById("bio-edit-content");
  const saveBioButton = document.getElementById("save-bio-button");

  const selectProgramInput = document.getElementById("select-program-input");

  selectProgramInput.addEventListener("change", (event) => {
    const program = selectProgramInput.value;

    serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/program"), "POST", {
      program: program
    }, (response) => {
      if (response.success) popUp("success", "Program successfully updated!", "Your new program is successfully updated and saved.");
      else popUp("error", "Couldn't update program!", "There is an issue on our side. Thank you for your understanding.")
})

  })

  saveBioButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/bio"), "POST", {
      about: bioEditContent.value
    }, (response) => {
      if (response.success) popUp("success", "Biography successfully updated!", "Your new biography is successfully updated and saved.");
      else popUp("error", "Couldn't update biography!", "There is an issue on our side. Thank you for your understanding.")
    })
  })

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("each-checkbox-checkbox")) {
      if (event.target.classList.contains("checkbox-checkbox-checked")) {
        event.target.classList.remove("checkbox-checkbox-checked");
      } else {
        event.target.classList.add("checkbox-checkbox-checked");

        serverRequest((window.location.href.replace("/tutor/profile", "/tutor/edit/subjects")), "POST", {
          subject: event.target.nextSibling.innerHTML
        }, (response) => {
          if (response.success) popUp("success", "Subject added!", "Subject successfully added to your proficiency list.");
          else popUp("error", "Couldn't add subject!", "There is an issue on our side. Thank you for your understanding.")
        })
      }
    }
  })
}
