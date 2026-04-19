import {useNavigate} from "react-router-dom";
import {createQuestion} from "../services/questionService.js";
import QuestionForm from "../components/QuestionForm.jsx";



const CreateQuestionPage=() => {
    const navigate = useNavigate();

    const handleCreateQuestion = async (questionBody) => {
        try {
            await createQuestion(questionBody);
            navigate("/questions");
        } catch (error) {
            console.error("Error creating question", error);
        }
    };

    return (
        <div>
            <h1>
                Create question
            </h1>

            <QuestionForm onSubmit={handleCreateQuestion}/>
        </div>
    );
};

export default CreateQuestionPage;