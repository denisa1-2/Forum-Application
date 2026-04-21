import {Link} from "react-router-dom";
import { styles } from "../styles/forumTheme.js";

const QuestionCard = ({question,onDelete,currentUser}) => {
    const formattedDate =new Date(question.creationDateTime).toLocaleString();


    const isAuthor =currentUser && currentUser.id === question.author?.id;
    return(
        <div style={{
            ...styles.softCard,
            marginBottom: "1rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

        }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.6rem" }}>
                <Link to={`/questions/${question.id}`}
                      style={{
                          textDecoration: "none",
                          color: "#000",
                          fontWeight: "700",
                      }}
                >
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
                    ? (question.tags.map((tag) => (
                        <span key={tag.id || tag.name}
                              style={{...styles.tag, marginRight: "0.5rem"}}
                              >
                            {tag.name}
                        </span>
                        ))
                    ) :(
                        "No tags"
                    )}
            </p>


            {isAuthor && (
                <>
                    <Link to={`/questions/edit/${question.id}`}>
                        <button style={styles.secondaryButton}>Edit</button>
                    </Link>

                    <button style={styles.secondaryButton}
                        onClick={() => {
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