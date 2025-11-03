// Start.jsx

import React from 'react';

export default function Start(props) {
    return (
        <div className="start-screen">
            <h1 className="title">Quizzical</h1>
            <p className="description"> Music trivia for fun.</p>
            <button
                className="start-button"
                onClick={props.startQuiz}
            >
                Start quiz
            </button>
        </div>
    );
}