
const Session = require("../../../models/Session/session");
const Tutor = require("../../../models/Tutor/tutor");
const Student = require("../../../models/Student/student");

module.exports = (req, res) => {

  const body = {
    tutorId: req.body.tutorId,
    studentId: req.session.student._id,
    date: req.body.date,
    startTime: req.body.startTime,
    finishTime: req.body.finishTime,
    availableTimeId: req.body.availableTimeId
  }

  Session.createSession(body, (err, session) => {
    if (err) return res.send({ success: false, err: err });

    Tutor.findById(session.tutorId, (err, tutor) => {
      if (!tutor.students.includes(session.studentId)) tutor.students.push(session.studentId);

      Student.findById(session.studentId, (err, student) => {
        if (err) return res.send({ success: false, err: err });

        if (!student.tutors.includes(session.tutorId)) student.tutors.push(session.tutorId);

        tutor.sessions.push(session._id);
        student.sessions.push(session._id);

        for (let i = 0; i < tutor.availableTimes.length; i++) {
          if (tutor.availableTimes[i]._id == req.body.availableTimeId) tutor.availableTimes[i].isAvailable = false;
        }

        tutor.save();
        student.save();
        return res.send({ success: true, session: session });
      })
    })
  })
}
