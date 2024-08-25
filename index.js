const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input' });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

        const response = {
            is_success: true,
            user_id: 'raghav_goel_07012004', // Replace with dynamic data
            email: 'raghav.goel2021@vitstudent.ac.in', // Replace with dynamic data
            roll_number: '21BBS0230', // Replace with dynamic data
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
