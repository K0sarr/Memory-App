import React from "react"
import '../styles/header.css'


export default function Header({ score, bestScore }) {

    return (
        <>
        <div className="score-title">
        <p className="score-text">Score: {score}</p>
        <p className="bestScore-text">Best Score: {bestScore}</p>
        </div>
        <div className="header-title">
        <h1>Pokemon Memory Game</h1>
        <span>You get points by clicking on an image but don't click
            on any more than once!
        </span>
        </div>
        </>
    )
}