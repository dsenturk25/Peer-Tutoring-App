
const Tutor = require("../../../models/Tutor/tutor");
const School = require("../../../models/School/school");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

const haveCommon = (arr1, arr2) => {

  for (let i = 0; i < arr1.length; i++) {  
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] == arr2[j]) return true;
    }
  }
  return false;
}

const quickSort = (tutors, field, isAscending, compareArrayLength) => {

  if (tutors.length <= 1) {
    return tutors
  }

  let pivot = tutors[0];
  let leftArray = [];
  let rightArray = [];

  for (let i = 1; i < tutors.length; i++) {
    if (compareArrayLength) {
      if (isAscending ? tutors[i][`${field}`].length < pivot[`${field}`].length : tutors[i][`${field}`].length > pivot[`${field}`].length) leftArray.push(tutors[i]);
      else rightArray.push(tutors[i]);
    } else {
      if (isAscending ? tutors[i][`${field}`] < pivot[`${field}`] : tutors[i][`${field}`] > pivot[`${field}`]) leftArray.push(tutors[i]);
      else rightArray.push(tutors[i]);
    }
  }

  return [...quickSort(leftArray, field, isAscending, compareArrayLength), ...quickSort(rightArray, field, isAscending, compareArrayLength)];
}


module.exports = (req, res) => {

  Tutor.find({}, (err, tutors) => {
    if (err) return res.status(400).send({ success: false, err: "bad_request_401" });

    let filteredTutors = [];

    const tutorIdToOpenSlotMapping = {};

    async.timesSeries(tutors.length, async (i, next) => {
      const eachTutor = tutors[i];

      let isTutorSuitableFlag = false;


      let isTutorProgramSuitable = true;
      if (req.body.programFilter) {
        if (eachTutor.program != req.body.programFilter) {
          isTutorProgramSuitable = false;
        }
      }


      let isTutorLevelSuitable = true;
      if (req.body.levelFilter) {
        if (eachTutor.level != req.body.levelFilter) {
          isTutorLevelSuitable = false;
        }
      }

      let isTutorNameSurnameValid = true;
      if (req.body.nameSurnameFilter) {
        let nameSurnameString = eachTutor.name + " " + eachTutor.surname;
        if (!nameSurnameString.includes(req.body.nameSurnameFilter)) {
          isTutorNameSurnameValid = false;
        }
      }

      let isTutorAllPastTutorsToggleSuitable = true;
      if (req.body.allOrPastTutorsFilter) {
        if (req.body.allOrPastTutorsFilter == "all-mentors") isTutorAllPastTutorsToggleSuitable = true;
        else if (req.body.allOrPastTutorsFilter == "past-mentors") eachTutor.students.includes(req.session.student._id) ? isTutorAllPastTutorsToggleSuitable = true : isTutorAllPastTutorsToggleSuitable = false;
      }

      
      let isTutorSubjectsSuitable = true;
      if(req.body.appliedSubjectFilters.length >= 1) {
        if (haveCommon(eachTutor.subjects, req.body.appliedSubjectFilters)) isTutorAllPastTutorsToggleSuitable = true;
        else isTutorSubjectsSuitable = false;
      }


      isTutorSuitableFlag = (isTutorProgramSuitable && isTutorLevelSuitable && isTutorNameSurnameValid && isTutorAllPastTutorsToggleSuitable && isTutorSubjectsSuitable);
      if (isTutorSuitableFlag) {
        if (eachTutor.profile_photo) {
          eachTutor.profile_photo = await retrieveImageFromImageName(eachTutor.profile_photo);
        }

        eachTutor.schoolId = (await School.findById(eachTutor.schoolId)).name;

        const slotDateMapping = {};

        async.timesSeries(eachTutor.availableTimes.length, (j, next2) => {

          const eachAvailableTime = eachTutor.availableTimes[j];
          
          if (slotDateMapping[eachAvailableTime.date] && slotDateMapping[eachAvailableTime.date].length > 0) {
            slotDateMapping[eachAvailableTime.date].push(eachAvailableTime);
          } else {
            slotDateMapping[eachAvailableTime.date] = [eachAvailableTime];
          }
          next2();
        }, (err) => {
          tutorIdToOpenSlotMapping[eachTutor._id] = slotDateMapping;
          filteredTutors.push(eachTutor)
        })
      };
    }, (err) => {
      if (err) return res.status(400).send({ success: false, err: "bad_request_402" });
      
      if (req.body.sortFilter) {
        const sortFilterField = req.body.sortFilter.split("-")[0];
        const sortFilterOrder = req.body.sortFilter.split("-")[1] == "ascending" ? true : false;
        const comparingLength = req.body.sortFilter.split("-")[2] == "length" ? true : false;

        filteredTutors = quickSort(filteredTutors, sortFilterField, sortFilterOrder, comparingLength);
      }

      return res.send({ success: true, filteredTutors: filteredTutors, tutorIdToOpenSlotMapping: tutorIdToOpenSlotMapping });
    })
  })
}
