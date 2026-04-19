import { useState } from "react";

const QuestionFilterBar = ({
    onSearchTitle,
    onFilterTag,
    onFilterUser,
    onMyQuestions,
    onReset
   }) => {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [user, setUser] = useState("");


    const handleResetClick = () => {
        setTitle("");
        setTag("");
        setUser("");
        onReset();
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Search by title"
                />
                <button onClick={()=>onSearchTitle(title)} style={{ marginLeft: "0.5rem" }}>
                    Search
                </button>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Filter by tag"
                />
                <button onClick={() =>onFilterTag(tag)} style={{ marginLeft: "0.5rem" }}>
                    Filter Tag
                </button>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Filter by username"
                />
                <button onClick={() => onFilterUser(user)} style={{ marginLeft: "0.5rem" }}>
                    Filter User
                </button>
            </div>

            <div>
                <button onClick={onMyQuestions}>My Questions</button>
                <button onClick={handleResetClick} style={{marginLeft: "0.5rem"}}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default QuestionFilterBar;