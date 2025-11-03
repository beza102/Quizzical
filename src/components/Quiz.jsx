// Quiz.jsx

import React from 'react';
import Question from './Question';

export default function Quiz({ questions, selectAnswer, checkAnswers, isChecking, score }) {
    
    const questionElements = questions.map(q => (
        <Question 
            key={q.id}
            questionData={q}
            selectAnswer={selectAnswer}
            isChecking={isChecking}
        />
    ));

    const buttonText = isChecking ? "Play Again" : "Check Answers";
    
    return (
        <div className="quiz-container">
            {questionElements}
            
            <div className="quiz-footer">
                {isChecking && 
                    <p className="score-text">
                        You scored {score}/{questions.length} correct answers
                    </p>
                }
                <button 
                    className="check-button"
                    onClick={checkAnswers}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}