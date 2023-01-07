const attendanceForm = document.getElementById('attendance-form');
const checkinButton = document.getElementById('checkin-button');
const checkoutButton = document.getElementById('checkout-button');
const studentsPresentList = document.getElementById('students-present');

let studentsPresent = [];

const checkIn = (rollNumber, studentName, time) => {
  if (!rollNumber || !studentName) {
    alert('Please enter a valid roll number and student name');
    return;
  }
  if (isNaN(rollNumber)) {
    alert('Roll number must be a numerical value');
    return;
  }
  if (!/^[a-zA-Z]+$/.test(studentName)) {
    alert('Student name must contain only alphabetical characters');
    return;
  }
  if (studentsPresent.find(student => student.rollNumber === rollNumber && !student.checkedOut)) {
    alert('This student has already checked in today');
    return;
  }

  studentsPresent.push({ rollNumber, studentName, time, checkedOut: false });
  renderStudentsPresent();
};

const checkOut = (rollNumber, time) => {
  studentsPresent = studentsPresent.map(student => {
    if (student.rollNumber === rollNumber && !student.checkedOut) {
      student.checkedOut = true;
      student.checkoutTime = time;
    }
    return student;
  });
  renderStudentsPresent();
};

const renderStudentsPresent = () => {
  studentsPresentList.innerHTML = '';
  studentsPresent.forEach(student => {
    if (!student.checkedOut) {
      const li = document.createElement('li');
      li.innerHTML = `${student.rollNumber} - ${student.studentName}`;
      const timeSpan = document.createElement('span');
      timeSpan.innerHTML = `Checked in at ${student.time}`;
      li.appendChild(timeSpan);
      studentsPresentList.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.innerHTML = `${student.rollNumber} - ${student.studentName}`;
      const timeSpan = document.createElement('span');
      timeSpan.innerHTML = `Checked in at ${student.time}, checked out at ${student.checkoutTime}`;
      li.appendChild(timeSpan);
      studentsPresentList.appendChild(li);
    }
  });
};

attendanceForm.addEventListener('submit', e => {
  e.preventDefault();
  const rollNumber = document.getElementById('roll-number').value;
  const studentName = document.getElementById('student-name').value;
  const currentTime = new Date().toLocaleTimeString();
  checkIn(rollNumber, studentName, currentTime);
});

checkinButton.addEventListener('click', e => {
  e.preventDefault();
  const rollNumber = document.getElementById('roll-number').value
const studentName = document.getElementById('student-name').value;
  const currentTime = new Date().toLocaleTimeString();
  checkIn(rollNumber, studentName, currentTime);
});

checkoutButton.addEventListener('click', e => {
  e.preventDefault();
  const rollNumber = document.getElementById('roll-number').value;
  const currentTime = new Date().toLocaleTimeString();
  checkOut(rollNumber, currentTime);
});