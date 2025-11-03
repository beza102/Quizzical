// Question.jsx

import React from 'react';

export default function Question({ questionData, selectAnswer, isChecking }) {
    
    const { id, question, all_answers, correct_answer, selected_answer } = questionData;

    const answerElements = all_answers.map(answer => {
        // --- Logic to determine CSS class ---
        
        let className = "answer-option";
        
        if (selected_answer === answer) {
            className += " selected";
        }

        if (isChecking) {
            if (answer === correct_answer) {
                // Highlight the correct answer
                className = "answer-option correct";
            } else if (answer === selected_answer && answer !== correct_answer) {
                // Dim and mark the selected, but incorrect answer
                className = "answer-option incorrect";
            } else {
                // Dim all unselected wrong answers
                className += " dim"; 
            }
        }
        
        // --- Answer Button Rendering ---
        return (
            <div
                key={answer}
                className={className}
                onClick={() => selectAnswer(id, answer)}
            >
                {answer}
            </div>
        );
    });

    return (
        <div className="question-block">
            <h2 className="question-text">
                {question}
            </h2>
            <div className="answer-options-container">
                {answerElements}
            </div>
            <hr className="question-divider" />
        </div>
    );
}