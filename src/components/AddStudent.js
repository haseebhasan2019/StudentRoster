import { useState } from 'react'

const AddStudent = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [major, setMajor] = useState('')
    const [classyr, setClassyr] = useState('')
    const [present, setPresent] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            alert("Please enter Student Name")
            return
        }
        onAdd({ name, major, classyr, present })

        //Clear form
        setName('')
        setMajor('')
        setClassyr('')
        setPresent(false)
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Student Name</label>
                <input type="text" placeholder="Add Student Name"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Year</label>
                <input type="text" placeholder="Add Class Year"
                    value={classyr} onChange={(e) => setClassyr(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Major</label>
                <input type="text" placeholder="Add Major"
                    value={major} onChange={(e) => setMajor(e.target.value)} />
            </div>

            <div className='form-control form-control-check'>
                <label>Present</label>
                <input
                    type="checkbox"
                    checked={present}
                    value={present}
                    onChange={(e) => setPresent(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Student' className='btn btn-block' />

        </form>
    )
}

export default AddStudent
