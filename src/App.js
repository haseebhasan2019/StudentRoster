import Header from "./components/Header";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import { useState, useEffect } from 'react'

const App = () => {
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    const getStudents = async () => {
      const studentsFromServer = await fetchStudents()
      setStudents(studentsFromServer)
    }

    getStudents()
  }, [])

  //Fetch Students
  const fetchStudents = async () => {
    const res = await fetch('http://localhost:5000/students')
    const data = await res.json()
    console.log(data)
    return data
  }

  //Fetch Student
  const fetchStudent = async (id) => {
    const res = await fetch(`http://localhost:5000/students/${id}`)
    const data = await res.json()

    return data
  }

  //Delete Student
  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, {
      method: 'DELETE',
    })
    setStudents(students.filter((student) => student._id !== id))
  }

  //Mark Student Present
  const togglePresent = async (id) => {
    // const studentToToggle = await fetchStudent(id)
    // const updStudent = { ...studentToToggle, present: !studentToToggle.present }

    const res = await fetch(`http://localhost:5000/students/present/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      // body: JSON.stringify(updStudent)
    })
    const data = await res.json()
    console.log(data)
    setStudents(students.map((student) => student._id === id ? { ...student, present: data.present } : student))
  }

  //Add a New Student
  const addStudent = async (student) => {
    const res = await fetch(`http://localhost:5000/students`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(student),
    })
    const newStudent = await res.json()
    console.log(newStudent)
    setStudents([...students, newStudent])
  }

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddStudent(!showAddStudent)}
        showAdd={showAddStudent} />
      {showAddStudent && <AddStudent onAdd={addStudent} />}
      {students.length > 0 ? (
        <Students
          students={students}
          onDelete={deleteStudent}
          onToggle={togglePresent} />
      ) : (
        "No Students In Your Class"
      )}
    </div>
  );
}

export default App;
