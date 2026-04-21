import AnswerCard from "./AnswerCard.jsx";

const AnswerList = ({ answers, currentUser, onUpdate, onDelete }) => {
    if(!answers || answers.length === 0){
        return <p>No answers yet.</p>;
    }

    return(
        <div style={{marginTop: "1rem"}}>
            {answers.map((answer) => (
                <AnswerCard
                    key={answer.id}
                    answer={answer}
                    currentUser={currentUser}
                    onUpdate={onUpdate}
                    onDelete={onDelete}/>
            ))}
        </div>
    );
};

export default AnswerList;