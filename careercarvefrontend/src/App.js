import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [studentId, setStudentId] = useState('');
    const [duration, setDuration] = useState(30);
    const [preferredMentorId, setPreferredMentorId] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');

    const handleSubmit = () => {
        axios.post('http://localhost:5000/schedule', {
            studentId,
            duration,
            preferredMentorId,
            areaOfInterest
        }).then(response => {
            alert('Schedule created successfully');
        }).catch(error => {
            alert('Error creating schedule. Please try again.');
        });
    };

    return (
        <div className="container">
            <h1 className="title">1x1 Scheduler</h1>
            <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                    id="studentId"
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <select
                    id="duration"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="preferredMentorId">Preferred Mentor ID</label>
                <input
                    id="preferredMentorId"
                    type="text"
                    placeholder="Enter Preferred Mentor ID (optional)"
                    value={preferredMentorId}
                    onChange={e => setPreferredMentorId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="areaOfInterest">Area of Interest</label>
                <input
                    id="areaOfInterest"
                    type="text"
                    placeholder="Enter Area of Interest"
                    value={areaOfInterest}
                    onChange={e => setAreaOfInterest(e.target.value)}
                />
            </div>
            <button className="submit-button" onClick={handleSubmit}>Schedule</button>
        </div>
    );
}

export default App;
