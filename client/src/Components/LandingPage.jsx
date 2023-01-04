import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing">
            <div>
                <h1>PI FOOD</h1>
                <Link to="/home">
                    <button>Click to Home</button>
                </Link>
            </div>
        </div>
    )
}