import { useEffect, useState} from "react";
import { Link,useParams } from "react-router-dom";
import { getQuestionById } from "../services/questionService.js";
import { createAnswer, deleteAnswer, updateAnswer, getAnswersByQuestion} from "../services/answerService.js";
import { getCurrentUser } from "../services/userService.js";
import { styles } from "../styles/forumTheme.js";
import AnswerForm from "../components/AnswerForm.jsx";
import AnswerList from "../components/AnswerList.jsx";


const QuestionDetailsPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    const [answers, setAnswers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

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

    const handleCreateAnswer = async (answerBody) => {
        try{
            await createAnswer(id, answerBody);
            await loadAnswers();
        }catch(error){
            console.error("Error creating answer", error);
            console.log(error.response);
            alert("Could not create answer.");
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

    const handleUpdateAnswer = async (answerId, updatedAnswer) => {
        try{
            await updateAnswer(answerId, updatedAnswer);
            await loadAnswers();
        }catch (error) {
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

            <AnswerForm onSubmit={handleCreateAnswer}/>
        </div>

        <div style={styles.card}>
            <h3 style={{ marginTop: 0 }}>Answers</h3>

            <AnswerList answers={answers}
                        currentUser={currentUser}
                        onUpdate={handleUpdateAnswer}
                        onDelete={handleDeleteAnswer}/>

        </div>
    </div>
  </div>
    );
};

export default QuestionDetailsPage;