const express = require('express');
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Chinmaya Kolhe", rollNo: 101, department: "IT", year: 2 },
  { id: 2, name: "Rudra Kolhe", rollNo: 102, department: "CS", year: 3 },
  { id: 3, name: "Shreya Bhole", rollNo: 103, department: "ENTC", year: 1 }
];


app.get('/api/students', (req, res) => {
  res.json(students);
});


app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student not found");
  res.json(student);
});


app.post('/api/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    rollNo: req.body.rollNo,
    department: req.body.department,
    year: req.body.year
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student not found");

  student.name = req.body.name || student.name;
  student.rollNo = req.body.rollNo || student.rollNo;
  student.department = req.body.department || student.department;
  student.year = req.body.year || student.year;

  res.json(student);
});


app.delete('/api/students/:id', (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id));
  res.send("Student deleted");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
