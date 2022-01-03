import { FaTimes, FaRegListAlt } from 'react-icons/fa'

const Student = ({ student, onDelete, onToggle, showAttendance }) => {
    return (
        <div className={`task ${student.present ? 'reminder' : ''}`}
            onDoubleClick={() => onToggle(student._id)} >
            <h3>{student.name}
                <FaTimes
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onDelete(student._id)}
                />
            </h3>
            <p>{student.major} {student.classyr}
                <FaRegListAlt
                    style={{ cursor: "pointer" }}
                    onClick={() => showAttendance(student._id)}
                />
            </p>
        </div>
    )
}

export default Student
