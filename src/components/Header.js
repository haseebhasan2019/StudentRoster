import Button from "./Button";

const Header = ({ showAdd, onAdd }) => {
    return (
        <header className="header">
            <h1>Student Roster</h1>
            <Button
                color={showAdd ? "red" : "green"}
                text={showAdd ? "Close" : "Add Student"}
                onClick={onAdd} />
        </header>
    )
}

export default Header
