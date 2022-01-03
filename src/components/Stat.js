import React from 'react'

const Stat = ({ stat }) => {
    return (
        <div className="task">
            <h3>Class of {stat._id}: </h3>
            <p>{stat.count}</p>
        </div>
    )
}

export default Stat
