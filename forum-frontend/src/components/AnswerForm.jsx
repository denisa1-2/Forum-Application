import { useState } from "react";

const AnswerForm = ({ onSubmit, initialData = null, onCancel = null}) => {
    const [text, setText] = useState(initialData?.text || "");
    const [picture, setPicture] = useState(initialData?.picture || "");

    const handleSubmit= (e) => {
        e.preventDefault();

        if(!text.trim()){
            alert("text is required.");
            return;
        }

        onSubmit({text, picture});

        if(!initialData){
            setText("");
            setPicture("");
        }
    };

    return (<form onSubmit={handleSubmit}
                  style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        padding: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "8px"
                  }}
            >
                <textarea placeholder="Write your answer..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows="4"
                          style={{
                              width: "100%",
                              padding: "0.7rem",
                              marginBottom: "1rem"
                          }}
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.7rem",
                        marginBottom: "1rem"
                    }}
                />
                <div style={{ display: "flex", gap: "10px"}}>
                    <button type="submit">
                        {initialData ? "Update Answer" : "Post Answer"}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}>Cancel</button>
                    )}
                </div>
            </form>
    );
};

export default AnswerForm;