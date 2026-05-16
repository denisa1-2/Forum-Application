import { useState } from "react";
import AnswerForm from "./AnswerForm.jsx"
import { styles } from "../styles/forumTheme.js";
import AnswerVoteBox from "./AnswerVoteBox.jsx";

const AnswerCard = ({ answer, currentUser, question, onUpdate, onDelete, onAccept, onVoteChanged}) => {
    const [isEditing, setIsEditing] = useState(false);

    const isAuthor = currentUser && answer.author && currentUser.username === answer.author.username;

    const isQuestionAuthor = currentUser && question?.author && currentUser.id === question.author.id;

    const canAccept = isQuestionAuthor && question?.status !== "SOLVED" && !answer.accepted;

    const handleUpdate = async (updatedAnswer) => {
        await onUpdate(answer.id, updatedAnswer);
        setIsEditing(false);
    };
    return (
        <div
            style={{
                ...styles.innerCard,
                marginBottom: "1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                backgroundColor: "#f7e2e2"
            }}
        >
            {answer.accepted && (
                <div style={{marginBottom: "0.75rem",
                            fontWeight: "bold",
                            color: "green",
                }}>Accept answer</div>
            )}
            <div style={{ marginBottom: "0.5rem"}}><strong>Author:</strong>
                {answer.author?.username || "Unknown"}</div>
            <div style={{ marginBottom: "0.5rem"}}><strong>Date:</strong>
                {" "}{answer.creationDateTime ? new Date(answer.creationDateTime).toLocaleString() : "Unknown"}</div>
            {isEditing ? (
                <AnswerForm
                    initialData={answer}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)} />)
            : (
                <>
                    <div style={{ marginBottom: "0.75rem", whiteSpace: "pre-wrap" }}>
                        <strong>Text:</strong> {answer.text}</div>
                    {answer.picture && (
                        <img
                            src={answer.picture}
                            alt="answer"
                            style={{
                                maxWidth: "300px",
                                width: "100%",
                                borderRadius: "8px",
                                marginTop: "0.5rem"
                            }}/>
                    )}
                    <AnswerVoteBox answerId={answer.id}
                                   onVoteChanged={onVoteChanged}
                    />
                </>
                )}

                <div style={{display: "flex",
                            gap: "10px",
                            margintop: "1rem",
                            flexWrap: "wrap",
                        }}
                     >
                    {isAuthor && !isEditing && question?.status !== "SOLVED" && (
                        <>
                        <button style={styles.secondaryButton} onClick={() => setIsEditing(true)}>Edit</button>
                        <button style={styles.secondaryButton} onClick={() => onDelete(answer.id)}>Delete</button>
                        </>
                    )}

                    {canAccept && (
                        <button style={styles.primaryButton}
                                onClick={()=>onAccept(answer.id)}>Accept answer</button>
                    )}
                </div>
        </div>
    );
};

export default AnswerCard;