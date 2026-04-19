import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../services/questionService";

const QuestionDetailsPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion =async () => {
        try {
            const data=await getQuestionById(id);
            setQuestion(data);
        } catch (error) {
            console.error("Error loading question", error);
        }
    };

    if (!question) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{question.title}</h2>

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
                {question.tags?.map((t)=>t.name).join(", ")}
            </p>

            {question.picture&&(
                <img
                    src={question.picture}
                    alt="question"
                    style={{ maxWidth: "300px", marginTop: "1rem" }}
                />
            )}
        </div>
    );
};

export default QuestionDetailsPage;