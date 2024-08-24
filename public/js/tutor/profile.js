
window.onload = () => {
  logoutButton();

  const zoomLinkInput = document.getElementById("tutor-zoom-link");
  const saveZoomLinkButton = document.getElementById("submit-zoom-link");

  saveZoomLinkButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/link"), "POST", {
      link: zoomLinkInput.value
    }, (response) => {
      if (response.success) return alert("Link successfully updated");
      return alert("Link update error. Please try again.");
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
      if (response.success) return alert("Program successfully updated!");
      return alert("Program update error occured. Please try again.");
    })

  })

  saveBioButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/tutor/profile", "/tutor/edit/bio"), "POST", {
      about: bioEditContent.value
    }, (response) => {
      if (response.success) return alert("Bio successfully updated!");
      return alert("Bio update error occured. Please try again.");
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
          if (response.success) {
            alert("Subject successfully added to your proficiency list.");
          } else {
            alert("Subject couldn't added. Please try again");
          }
        })
      }
    }
  })
}
