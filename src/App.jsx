// App.jsx (CORRECTED)

import React, { useState, useEffect } from 'react';
import he from 'he';
import Start from './components/Start';
import Quiz from './components/Quiz';
import './styles.css';

// Shuffle for answer randomization
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function App() {
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    // Use gameCount to force a re-fetch for every new game
    const [gameCount, setGameCount] = useState(0); 
    
    const API_URL = "https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple";

    function startQuiz() {
        // Set the flag to true (shows Quiz component)
        setIsQuizStarted(true);
        // Reset the scoring view
        setIsChecking(false); 
        // Increment the counter to guarantee the useEffect runs
        setGameCount(prevCount => prevCount + 1); 
    }
    
    //Data Fetching Effect 
    useEffect(() => {
        // Only run this effect if the quiz has been started at least once
        if (isQuizStarted) { 
            setIsLoading(true);

            fetch(API_URL)
                .then(res => res.json())
                .then(data => {
                    const processedQuestions = data.results.map(question => {
                        const allAnswers = [...question.incorrect_answers, question.correct_answer];
                        const shuffledAnswers = shuffleArray(allAnswers);

                        return {
                            id: crypto.randomUUID(),
                            question: he.decode(question.question),
                            correct_answer: he.decode(question.correct_answer),
                            all_answers: shuffledAnswers.map(ans => he.decode(ans)),
                            selected_answer: null,
                        };
                    });
                    
                    setQuestions(processedQuestions);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch trivia questions:", error);
                    setIsLoading(false);
                });
        }
    // The effect runs when the quiz starts AND every time
    // the 'Play Again' button calls startQuiz and increments gameCount.
    }, [gameCount]); 

    // Answer Selection Handler
    function selectAnswer(questionId, answer) {
        if (isChecking) return; 

        setQuestions(prevQuestions => prevQuestions.map(q => {
            return q.id === questionId
                ? { ...q, selected_answer: answer }
                : q;
        }));
    }

    // Score Calculation and Display Handler
    function checkAnswers() {
        if (!isChecking) {
            // Check Answers 
            setIsChecking(true);
        } else {
            // Play Again (second click)
            // This calls startQuiz(), which increments gameCount and triggers the fetch.
            startQuiz();
        }
    }
    
    // Calculate score for display only when isChecking is true
    const score = questions.filter(q => q.selected_answer === q.correct_answer).length;

    return (
        <main>
            {isQuizStarted ? (
                isLoading ? (
                    <h1 className="loading-text">Loading Questions...</h1>
                ) : (
                    <Quiz 
                        questions={questions}
                        selectAnswer={selectAnswer}
                        checkAnswers={checkAnswers}
                        isChecking={isChecking}
                        score={score}
                    />
                )
            ) : (
                <Start startQuiz={startQuiz} />
            )}
            
            <div className="blob-top-right"></div>
            <div className="blob-bottom-left"></div>
        </main>
    );
}

export default App;