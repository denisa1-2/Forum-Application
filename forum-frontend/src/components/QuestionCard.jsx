import {Link} from "react-router-dom";

const QuestionCard = ({question,onDelete,currentUser}) => {
    const formattedDate =new Date(question.creationDateTime).toLocaleString();


    const isAuthor =currentUser && currentUser.id === question.author?.id;
    return(
        <div style={{
            border: "1px solid #ddd",
            padding: "1rem",

        }}>
            <h3><Link to={`/questions/${question.id}`}>
                {question.title}
            </Link>
            </h3>

            <p>
                <strong>Author:</strong>{question.author?.username || "Unknown"}
            </p>

            <p>
                <strong>Status:</strong>{question.status}
            </p>

            <p>
                <strong>Date:</strong> {formattedDate}
            </p>

            <p>
                <strong>Tags:</strong>{" "}
                {question.tags && question.tags.length > 0
                    ? question.tags.map((tag) => tag.name).join(", ")
                    : "No tags"}
            </p>


            {isAuthor && (
                <>
                    <Link to={`/questions/edit/${question.id}`}>
                        <button>Edit</button>
                    </Link>

                    <button onClick={() => {
                        if (window.confirm("Are u sure u want to erase?")) {
                            onDelete(question.id);
                        }
                    }}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};
export default QuestionCard;