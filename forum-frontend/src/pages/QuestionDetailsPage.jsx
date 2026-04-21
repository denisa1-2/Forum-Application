import { useEffect, useState} from "react";
import { Link,useParams } from "react-router-dom";
import { getQuestionById } from "../services/questionService.js";
import { createAnswer, deleteAnswer, updateAnswer, getAnswersByQuestion} from "../services/answerService.js";
import { getCurrentUser } from "../services/userService.js";
import { styles } from "../styles/forumTheme.js";

const QuestionDetailsPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState("");
    const [answerPicture, setAnswerPicture] = useState("");
    const [submittingAnswer, setSubmittingAnswer] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [editingAnswerId, setEditingAnswerId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editPicture, setEditPicture] = useState("");

    useEffect(() => {
        loadQuestion();
        loadAnswers();
        loadCurrentUser()
    }, [id]);

    const loadQuestion =async () => {
        try {
            const data=await getQuestionById(id);
            setQuestion(data);
        } catch (error) {
            console.error("Error loading question", error);
        }
    };

    const loadAnswers = async () => {
        try {
            const data = await getAnswersByQuestion(id);
            setAnswers(Array.isArray(data) ? data : []);
        } catch(error) {
            console.error("Error loading answers", error);
        }
    };

    const loadCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.error("Error loading current user", error);
            setCurrentUser(null);
        }
    };

    const handleCreateAnswer = async (e) => {
        e.preventDefault();

        if(!answerText.trim()){
            alert("Answer text is required.");
            return;
        }

        try {
            setSubmittingAnswer(true);

            await createAnswer(id, {text: answerText, picture: answerPicture});

            setAnswerText("");
            setAnswerPicture("");

            await loadAnswers();
        } catch(error) {
            console.error("Error creating answers", error);
            console.log(error.response);
            alert("Could not create answer.");
        }finally {
            setSubmittingAnswer(false);
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        const confirmed = window.confirm("Are you sure you want to delete this answer?");
        if(!confirmed)
            return;
        try {
            await deleteAnswer(answerId);
            await loadAnswers();
        } catch (error) {
            console.error("Error deleting answer", error);
            alert("Could not delete answer.");
        }
    };

    const startEditingAnswer = (answer) => {
        setEditingAnswerId(answer.id);
        setEditText(answer.text || "");
        setEditPicture(answer.picture || "");
    };

    const cancelEditingAnswer = () => {
        setEditingAnswerId(null);
        setEditText("");
        setEditPicture("");
    };

    const handleUpdateAnswer = async (e, answerId) => {
        e.preventDefault();

        if(!editText.trim()){
            alert("Answer text is required.");
            return;
        }

        try {
            await updateAnswer(answerId, {text: editText, picture: editPicture});
            cancelEditingAnswer();
            await loadAnswers();
        } catch (error) {
            console.error("Error updating answer", error);
            alert("Could not update answer.");
        }
    };

    if (!question) return <p style={{ padding: "1rem" }}>Loading...</p>;

    return (
        <div style={styles.page}>
            <div style={styles.main}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link to="/questions" style={styles.linkButton}>
                        Back to all questions
                    </Link>
                </div>
                <div style={{ ...styles.card, marginBottom: "1.5rem" }}>
                    <h2 style={{ marginTop: 0 }}>{question.title}</h2>
                 <p>
                     <strong>Author:</strong> {question.author?.username}
                </p>

                <p>
                    <strong>Status:</strong> {question.status}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(question.creationDateTime).toLocaleString()}
                </p>

                <p>
                    <strong>Text:</strong>{question.text}
                </p>

                <p>
                    <strong>Tags:</strong>{" "}
                    {question.tags?.map((t)=> (
                        <span key={t.id || t.name}
                              style={{...styles.tag, marginRight: "0.5rem"}}
                        >
                            {t.name}
                        </span>
                    ))}
                </p>

            {question.picture && (
                <img
                    src={question.picture}
                    alt="question"
                    style={{ maxWidth: "300px", marginTop: "1rem" , borderRadius: "10px"}}
                />
            )}
        </div>
        <div style={{
            ...styles.card,
            marginBottom: "1.5rem"
            }}
        >
            <h3 style={{marginTop: 0}}>Add answer</h3>
            <form onSubmit={handleCreateAnswer}>
                <textarea
                    placeholder="Write your answer..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    rows="4"
                    style={styles.textarea}
                />

                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={answerPicture}
                    onChange={(e) => setAnswerPicture(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" disabled={submittingAnswer} style={styles.primaryButton}>{submittingAnswer ? "Posting" : "Post Answer"}</button>
            </form>
        </div>
        <div style={styles.card}>
            <h3 style={{ marginTop: 0 }}>Answers</h3>

            {answers.length === 0 ? (
                <p>No answers yet.</p>
            ) : (
                answers.map((answer) => {
                    const isAuthor =
                        currentUser && currentUser.id === answer.author?.id;
                    const isEditing = editingAnswerId === answer.id;

                    return (
                        <div
                            key={answer.id}
                            style={{
                                ...styles.softCard,
                                marginBottom: "1rem",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                        }}
                    >
                        <p>
                            <strong>Author:</strong> {answer.author?.username || "Unknown"}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {answer.creationDateTime
                                ? new Date(answer.creationDateTime).toLocaleString()
                                : ""}
                        </p>

                        {isEditing ? (
                            <form onSubmit={(e) => handleUpdateAnswer(e, answer.id)}>
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    rows="4"
                                    style={styles.textarea}
                                />

                                <input
                                    type="text"
                                    value={editPicture}
                                    onChange={(e) => setEditPicture(e.target.value)}
                                    placeholder="Image URL (optional)"
                                    style={styles.input}
                                />

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button type="submit" style={styles.primaryButton}>Update</button>
                                    <button type="button" onClick={cancelEditingAnswer} style={styles.secondaryButton}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <p>
                                    <strong>Text:</strong> {answer.text}
                                </p>

                                {answer.picture && (
                                    <img
                                        src={answer.picture}
                                        alt="answer"
                                        style={{
                                            maxWidth: "250px",
                                            marginTop: "0.5rem",
                                            borderRadius: "8px"
                                        }}
                                    />
                                )}

                                {isAuthor && (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginTop: "1rem"
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => startEditingAnswer(answer)}
                                            style={styles.secondaryButton}
                                        >
                                            Edit
                                        </button>

                                        <button type="button"
                                                onClick={() => handleDeleteAnswer(answer.id)}
                                                style={styles.secondaryButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })
        )}
        </div>
        </div>
        </div>
    );
};

export default QuestionDetailsPage;