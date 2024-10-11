
window.onload = () => {
  logoutButton();

  const tutorContentWrapper = document.getElementById("tutor-content-wrapper");

  const filterSubjectsSelectAbsoluteWrapper = document.getElementById("filter-subjects-select-absolute-wrapper");
  const filterSubjectsGoBackButton = document.getElementById("filter-subjects-absolute-go-back-button");
  const openFilterSubjectsSelectContent = document.getElementById("subject-filter");

  openFilterSubjectsSelectContent.addEventListener("click", (event) => {
    filterSubjectsSelectAbsoluteWrapper.style.display = "flex";
  })

  filterSubjectsGoBackButton.addEventListener("click", (event) => {
    filterSubjectsSelectAbsoluteWrapper.style.display = "none"
  })



  const allOrPastTutorsFilter = document.getElementById("all-past-tutors-filter");
  const programFilter  = document.getElementById("program-filter");
  const levelFilter = document.getElementById("level-filter");
  const nameSurnameFilter = document.getElementById("name-surname-filter");
  const sortFilter  = document.getElementById("sort-filter");

  const appliedSubjectFilters = [];

  
  document.addEventListener("change", (event) => {
    if (
      event.target == allOrPastTutorsFilter 
      || event.target == programFilter 
      || event.target == levelFilter 
      || event.target == nameSurnameFilter
      || event.target == sortFilter
      || event.target.classList.contains("filter-subjects-select-absolute-each-subject-content-checkbox")
    ) 
    {

      if (event.target.classList.contains("filter-subjects-select-absolute-each-subject-content-checkbox")) {
        if (appliedSubjectFilters.includes(event.target.nextSibling.innerHTML)) {
          const indexToBeRemoved = appliedSubjectFilters.indexOf(event.target.nextSibling.innerHTML);
          appliedSubjectFilters.splice(indexToBeRemoved, 1);
        } else {
          appliedSubjectFilters.push(event.target.nextSibling.innerHTML)
        }
      }

      const url = window.location.href + "/tutor/filter";

      serverRequest(url, "POST", {
        allOrPastTutorsFilter: allOrPastTutorsFilter.value,
        nameSurnameFilter: nameSurnameFilter.value,
        programFilter: programFilter.value,
        levelFilter: levelFilter.value,
        sortFilter: sortFilter.value,
        appliedSubjectFilters: appliedSubjectFilters
      }, (response) => {

        if (response.success) {
          const tutors = response.filteredTutors;
          const tutorIdToOpenSlotMapping = response.tutorIdToOpenSlotMapping;

          tutorContentWrapper.innerHTML = "";

          for (let i = 0; i < tutors.length; i++) {

            const tutor = tutors[i];

            const tutorContent = document.createElement('div');
            tutorContent.className = 'each-tutor-content';
        
            const leftInfosWrapper = document.createElement('div');
            leftInfosWrapper.className = 'each-tutor-left-infos-wrapper';
        
            const coreInfoWrapper = document.createElement('div');
            coreInfoWrapper.className = 'each-tutor-core-into-wrapper';
        
            const tutorImage = document.createElement('div');
            tutorImage.className = 'each-tutor-image';
            const img = document.createElement('img');
            img.src = tutor.profile_photo ? tutor.profile_photo : "/res/images/profile.png";
            img.alt = "Tutor image";
            tutorImage.appendChild(img);
        
            const coreInfoText = document.createElement('div');
            coreInfoText.className = 'each-tutor-core-info-text';
            const nameLink = document.createElement('a');
            nameLink.href = `/student/tutor/personal?filter=${tutor.name}-${tutor.surname}`;
            nameLink.className = 'each-tutor-core-info-text-title';
            nameLink.textContent = `${tutor.name} ${tutor.surname}`;
            coreInfoText.appendChild(nameLink);
        
            const description = document.createElement('div');
            description.className = 'each-tutor-core-info-text-description';
            description.textContent = `from ${tutor.schoolId ? tutor.schoolId : "Unknown School"}`;
            coreInfoText.appendChild(description);
        
            const ratingWrapper = document.createElement('div');
            ratingWrapper.className = 'each-tutor-core-rating-wrapper';
            const rating = document.createElement('div');
            rating.textContent = `${tutor.rating}`;
            const ratingSpan = document.createElement('span');
            ratingSpan.textContent = ' overall rating';
            ratingWrapper.appendChild(rating);
            ratingWrapper.appendChild(ratingSpan);
        
            coreInfoWrapper.appendChild(tutorImage);
            coreInfoWrapper.appendChild(coreInfoText);
            coreInfoWrapper.appendChild(ratingWrapper);
        
            leftInfosWrapper.appendChild(coreInfoWrapper);
        
            const programWrapper = document.createElement('div');
            programWrapper.className = 'each-tutor-each-sub-wrapper';
            const programTitle = document.createElement('div');
            programTitle.className = 'each-tutor-each-sub-wrapper-title';
            programTitle.textContent = 'Academic program details';
            const programDescription = document.createElement('div');
            programDescription.className = 'each-tutor-each-sub-wrapper-description';
            programDescription.textContent = `${tutor.program ? tutor.program : "MEB"} program at level ${tutor.level}`;
            programWrapper.appendChild(programTitle);
            programWrapper.appendChild(programDescription);
        
            const skillsWrapper = document.createElement('div');
            skillsWrapper.className = 'each-tutor-each-sub-wrapper';
            const skillsTitle = document.createElement('div');
            skillsTitle.className = 'each-tutor-each-sub-wrapper-title';
            skillsTitle.textContent = 'Qualified subjects / Curricular skills';
            const skillsContentWrapper = document.createElement('div');
            skillsContentWrapper.className = 'each-tutor-each-sub-wrapper-skills-wrapper';
        
            tutor.subjects.forEach(subject => {
                const skillContent = document.createElement('div');
                skillContent.className = 'each-tutor-subject-skill-content';
                skillContent.textContent = subject;
                skillsContentWrapper.appendChild(skillContent);
            });
        
            skillsWrapper.appendChild(skillsTitle);
            skillsWrapper.appendChild(skillsContentWrapper);
        
            const bioWrapper = document.createElement('div');
            bioWrapper.className = 'each-tutor-each-sub-wrapper';
            const bioTitle = document.createElement('div');
            bioTitle.className = 'each-tutor-each-sub-wrapper-title';
            bioTitle.textContent = 'Biography / Persona';
            const bioDescription = document.createElement('div');
            bioDescription.className = 'each-tutor-each-sub-wrapper-description';
            bioDescription.textContent = tutor.about;
            bioWrapper.appendChild(bioTitle);
            bioWrapper.appendChild(bioDescription);
        
            leftInfosWrapper.appendChild(programWrapper);
            leftInfosWrapper.appendChild(skillsWrapper);
            leftInfosWrapper.appendChild(bioWrapper);
        
            const rightSlotsWrapper = document.createElement('div');
            rightSlotsWrapper.className = 'each-tutor-right-slots-wrapper';
        
            const timezoneContent = document.createElement('div');
            timezoneContent.className = 'timezone-utc-content-content';
            timezoneContent.textContent = 'Istanbul (+03)';
            rightSlotsWrapper.appendChild(timezoneContent);
        
            if (tutorIdToOpenSlotMapping[tutor._id] && Object.keys(tutorIdToOpenSlotMapping[tutor._id]).length > 0) {
                
              for (const key in tutorIdToOpenSlotMapping[tutor._id]) {
                if (Object.hasOwnProperty.call(tutorIdToOpenSlotMapping[tutor._id], key)) {

                  const eachDay = tutorIdToOpenSlotMapping[tutor._id][key];

                    const dayWrapper = document.createElement('div');
                    dayWrapper.className = 'each-day-wrapper';
        
                    const dayTitle = document.createElement('div');
                    dayTitle.className = 'each-day-date-title';
                    dayTitle.textContent = new Date(eachDay[0].date).toDateString();
                    dayWrapper.appendChild(dayTitle);
        
                    const meetingAppDescription = document.createElement('div');
                    meetingAppDescription.className = 'profile-overview-bio-edit-content-description';
                    const zoomSpan = document.createElement('span');
                    zoomSpan.style.fontWeight = '600';
                    zoomSpan.textContent = 'Zoom ';
                    const appText = document.createElement('span');
                    appText.textContent = 'as the meeting app 🖥️';
                    meetingAppDescription.appendChild(zoomSpan);
                    meetingAppDescription.appendChild(appText);
                    dayWrapper.appendChild(meetingAppDescription);
        
                    const slotTimesWrapper = document.createElement('div');
                    slotTimesWrapper.className = 'slot-times-wrapper';
        
                    eachDay.forEach(eachTime => {
                        const slotContent = document.createElement('div');
                        slotContent.className = `each-slot-times-content ${!eachTime.isAvailable ? "slot-time-occupied" : ""}`;
                        slotContent.textContent = `${eachTime.startTime} - ${eachTime.finishTime}`;
                        slotTimesWrapper.appendChild(slotContent);
        
                        // Hidden values
                        const hiddenDate = document.createElement('div');
                        hiddenDate.style.display = 'none';
                        hiddenDate.textContent = eachTime.date;
                        slotTimesWrapper.appendChild(hiddenDate);
        
                        const hiddenTutorId = document.createElement('div');
                        hiddenTutorId.style.display = 'none';
                        hiddenTutorId.textContent = tutor._id;
                        slotTimesWrapper.appendChild(hiddenTutorId);
        
                        const hiddenTimeId = document.createElement('div');
                        hiddenTimeId.style.display = 'none';
                        hiddenTimeId.textContent = eachTime._id;
                        slotTimesWrapper.appendChild(hiddenTimeId);
                    });
        
                    dayWrapper.appendChild(slotTimesWrapper);
                    rightSlotsWrapper.appendChild(dayWrapper);
                  }
                }
            }
        
            tutorContent.appendChild(leftInfosWrapper);
            tutorContent.appendChild(rightSlotsWrapper);
        
            tutorContentWrapper.appendChild(tutorContent);
        };
        
        } else if (!response.success) {
          return popUp("error", "Couldn't apply filter.", "The filter you've requested couldn't applied due to an issue we are currently facing. Thank you for your understanding.")
        }
      })
    }
  })


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("slot-time-occupied")) {
      popUp("error", "Sorry, this session is occupied.", "This time slot is occupied. Please try for other time slot options.")
    } else if (event.target.classList.contains("each-slot-times-content")) {
      popUp("confirm", "Create a lesson?", "You are about to create a meeting. Do you confirm you want to proceed?")
        .then(result => {
          if (result) {
            serverRequest((window.location.href.replace("/student", "/session/create")), "POST", {
              tutorId: event.target.nextSibling.innerHTML,
              date: event.target.previousSibling.innerHTML,
              startTime: event.target.innerHTML.split("-")[0],
              finishTime: event.target.innerHTML.split("-")[1],
              availableTimeId: event.target.nextSibling.nextSibling.innerHTML
            }, (response) => {
              if (response.success) popUp("success", "You're all set.", "Your lesson is arranged. Please go to lessons page to move on.");
              else popUp("error", "Something went wrong.", "Your lesson can't be arranged. Please try again later.");
              window.location.reload();
            })
          }
        })
    }
  })
}
