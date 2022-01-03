import Student from './Student'

const Students = ({ students, onDelete, onToggle }) => {
    return (
        <>
            {students.map((student) => (
                <Student key={student._id} student={student} onDelete={onDelete} onToggle={onToggle} />
            )
            )}
        </>
    )
}

export default Students
