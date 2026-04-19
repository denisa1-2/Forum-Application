import {useEffect,useState} from "react"
import {useNavigate,useParams} from "react-router-dom";
import QuestionForm from "../components/QuestionForm.jsx";
import {getQuestionById, updateQuestion} from "../services/questionService.js";

const EditQuestionPage=() =>{
    const {id} =useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = async () => {
        try {
            const data = await getQuestionById(id);
            setQuestion(data);
        }catch (error) {
            console.error("Error loading question:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleUpdateQuestion =async(questionBody) => {
        try {
            await updateQuestion(id,questionBody);
            navigate("/questions");
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!question) {
        return <p>Question not found.</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Question</h1>
            <QuestionForm
                onSubmit={handleUpdateQuestion}
                initialData={question}
            />
        </div>
    );
};

export default EditQuestionPage;