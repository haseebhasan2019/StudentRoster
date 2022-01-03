import Stat from "./Stat"

const Stats = ({ stats }) => {
    return (
        <>
            {stats.map((stat) => (
                <Stat key={stat._id} stat={stat} />
            ))}
        </>
    )
}

export default Stats
