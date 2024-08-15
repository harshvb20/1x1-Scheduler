const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { validationResult, check } = require('express-validator');

// Create Express app
const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Adjust this as needed
}));
app.use(bodyParser.json());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'befowxwfvvag7ljh5wdj-mysql.services.clever-cloud.com',
    user: 'uznjp1oiz1ufcmzq',
    password: '2RQSf2SzQscj5WVpRxEA', // Use environment variable for security
    database: 'befowxwfvvag7ljh5wdj',
    port: 3306
});

// Connect to MySQL database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Schedule endpoint
app.post('/schedule', (req, res) => {
    const { studentId, duration, preferredMentorId, areaOfInterest } = req.body;

    let mentorQuery = preferredMentorId
        ? 'SELECT * FROM mentors WHERE id = ?'
        : 'SELECT * FROM mentors WHERE area_of_interest = ? ORDER BY available_time_start ASC';

    let params = preferredMentorId ? [preferredMentorId] : [areaOfInterest];

    db.query(mentorQuery, params, (err, mentors) => {
        if (err) {
            console.error('Mentor Query Error:', err);
            return res.status(500).send('Database query error');
        }

        if (mentors.length === 0) return res.status(404).send('No mentor available');

        let mentor = mentors[0];

        // Calculate start and end times
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + duration * 60000);

        let scheduleQuery = 'INSERT INTO schedules (mentor_id, student_id, start_time, end_time) VALUES (?, ?, ?, ?)';
        let scheduleParams = [mentor.id, studentId, startTime, endTime];

        db.query(scheduleQuery, scheduleParams, (err, result) => {
            if (err) {
                console.error('Schedule Query Error:', err);
                return res.status(500).send('Database query error');
            }
            res.send('Schedule created successfully');
        });
    });
});

// Serve static files from the frontend build directory
app.use(express.static(path.join('cd ..', '/careercarvefrontend/src')));

// Route all other requests to the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join('cd ..', 'careercarvefrontend/src', 'App.js'));
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend Server is Running');
});


app.get('/test', (req, res) => {
    res.send('Test route is working');
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
