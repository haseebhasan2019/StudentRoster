import Student from './Student'

const Students = ({ students, onDelete, onToggle, showAttendance }) => {
    return (
        <>
            {students.map((student) => (
                <Student key={student._id} student={student} onDelete={onDelete} onToggle={onToggle} showAttendance={showAttendance} />
            ))}
        </>
    )
}

export default Students
