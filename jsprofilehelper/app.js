console.log('Week 2 lab loaded ✅');

/* =========================
   Part 2 — Console skills
========================= */

console.info('Info message example');
console.warn('Warning example');
console.error('Error example (demo)');

const demo = [
  { name: 'Asha', country: 'Nepal', age: 20 },
  { name: 'Rafi', country: 'Bangladesh', age: 22 }
];

console.table(demo);

const ageValue = Number('not-a-number');
console.assert(Number.isFinite(ageValue), 'Age must be a number');

console.time('loop');
let total = 0;
for (let i = 0; i < 1000000; i++) total += i;
console.timeEnd('loop');
console.log('total =', total);

/* =========================
   Part 3 — Variables
========================= */

const moduleCode = 'CTEC3705';
const lesson = 'Week 2: JavaScript Foundations';
const isLab = true;
const room = 101;

console.log(typeof moduleCode);
console.log(typeof lesson);
console.log(typeof isLab);
console.log(typeof room);

let counter = 0;
counter++;
console.log(counter);
counter++;
console.log(counter);
counter++;
console.log(counter);

const pageTitle = document.querySelector('#pageTitle');
pageTitle.textContent = `${moduleCode} — ${lesson}`;

/* =========================
   Part 4 — Data Model
========================= */

const students = [];

const nameInput = document.querySelector('#nameInput');
const countryInput = document.querySelector('#countryInput');
const ageInput = document.querySelector('#ageInput');
const skillsInput = document.querySelector('#skillsInput');

const addBtn = document.querySelector('#addBtn');
const clearBtn = document.querySelector('#clearBtn');
const showAllBtn = document.querySelector('#showAllBtn');
const filterBtn = document.querySelector('#filterBtn');
const randomBtn = document.querySelector('#randomBtn');
const avgBtn = document.querySelector('#avgBtn');
const resetBtn = document.querySelector('#resetBtn');

const formMsg = document.querySelector('#formMsg');
const studentList = document.querySelector('#studentList');
const summary = document.querySelector('#summary');

/* =========================
   Render Function
========================= */

function renderStudentList(list) {
  studentList.innerHTML = '';

  for (const student of list) {
    const li = document.createElement('li');
    li.textContent = `${student.name} (${student.country}) — age ${student.age} — skills: ${student.skills.join(', ')}`;
    studentList.appendChild(li);
  }
}

/* =========================
   Add Student
========================= */

addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const country = countryInput.value;
  const age = Number(ageInput.value);
  const skillsArr = skillsInput.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (name === '') {
    formMsg.textContent = 'Name cannot be empty.';
    return;
  }

  if (country === '') {
    formMsg.textContent = 'Please select a country.';
    return;
  }

  if (!Number.isFinite(age) || age < 0) {
    formMsg.textContent = 'Age must be a valid number.';
    return;
  }

  const student = { name, country, age, skills: skillsArr };

  student['full name'] = student.name; // bracket notation demo

  students.push(student);

  renderStudentList(students);

  formMsg.textContent =
    skillsArr.length >= 3
      ? 'Great! Multi-skilled student added 🎉'
      : 'Student added. Consider adding more skills.';

  console.table(students);

  nameInput.value = '';
  countryInput.value = '';
  ageInput.value = '';
  skillsInput.value = '';
});

/* =========================
   Clear Form
========================= */

clearBtn.addEventListener('click', () => {
  nameInput.value = '';
  countryInput.value = '';
  ageInput.value = '';
  skillsInput.value = '';
  formMsg.textContent = 'Form cleared.';
});

/* =========================
   Show All
========================= */

showAllBtn.addEventListener('click', () => {
  renderStudentList(students);
  summary.textContent = `Total students: ${students.length}`;
});

/* =========================
   Reset List
========================= */

resetBtn.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    students.length = 0;
    renderStudentList(students);
    summary.textContent = 'List reset.';
  }
});

/* =========================
   Filter Nepal/Bangladesh
========================= */

filterBtn.addEventListener('click', () => {
  const filtered = students.filter(
    s => s.country === 'Nepal' || s.country === 'Bangladesh'
  );

  renderStudentList(filtered);
  summary.textContent = `Filtered students: ${filtered.length}`;
});

/* =========================
   Average Age
========================= */

avgBtn.addEventListener('click', () => {
  if (students.length === 0) {
    summary.textContent = 'No students to calculate average.';
    return;
  }

  const totalAge = students.reduce((sum, s) => sum + s.age, 0);
  const avg = (totalAge / students.length).toFixed(1);

  summary.textContent = `Average age: ${avg}`;
});

/* =========================
   Random Student
========================= */

randomBtn.addEventListener('click', () => {
  if (students.length === 0) {
    summary.textContent = 'No students available.';
    return;
  }

  const index = Math.floor(Math.random() * students.length);
  const student = students[index];

  let greeting;

  switch (student.country) {
    case 'Nepal':
      greeting = 'Namaste';
      break;
    case 'Bangladesh':
      greeting = 'As-salamu Alaikum';
      break;
    case 'Denmark':
      greeting = 'Hej';
      break;
    default:
      greeting = 'Hello';
  }

  summary.textContent = `${greeting}, ${student.name}!`;
});

/* =========================
   Part 7 — Strings Demo
========================= */

const demoEmail = '  student@example.com  ';
const cleanedEmail = demoEmail.trim();
console.log('valid email?', cleanedEmail.includes('@'));

let message = 'JavaScript is hard';
message = message.replace('hard', 'powerful');
console.log(message);

/* =========================
   Part 10 — for...in demo
========================= */

const demoObj = { a: 1, b: 2, c: 3 };
for (const key in demoObj) {
  console.log(key, demoObj[key]);
}

/* =========================
   Part 9 — forEach + map
========================= */

students.forEach(s => console.log(`${s.name} from ${s.country}`));
const upperNames = students.map(s => s.name.toUpperCase());
console.table(upperNames);