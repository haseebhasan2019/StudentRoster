import { FaTimes } from 'react-icons/fa'

const Student = ({ student, onDelete, onToggle }) => {
    return (
        <div className={`task ${student.present ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(student.id)} >
            <h3>{student.name}
                <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onDelete(student.id)}
                />
            </h3>
            <p>{student.major} {student.classyr}</p>
        </div>
    )
}

export default Student
