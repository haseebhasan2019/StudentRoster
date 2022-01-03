import Button from "./Button";

const Header = ({ showAdd, onAdd, showStats, onShowStats }) => {
    return (
        <header className="header">
            <h1>Student Roster</h1>
            <Button
                color={showAdd ? "red" : "green"}
                text={showAdd ? "Close" : "Add Student"}
                onClick={onAdd} />
            <Button
                color={showStats ? "red" : "green"}
                text={showStats ? "Close Stats" : "Show Stats"}
                onClick={onShowStats} />
        </header>
    )
}

export default Header
