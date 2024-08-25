const express = require('express');
const cors = require('cors');
const app = express();
const port = 3200;


app.use(express.json());


app.use(cors());

// Route for POST requests
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid data format' });
        }

        // Process data
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestLowercaseAlphabet = alphabets.filter(item => /^[a-z]$/.test(item)).sort().pop() || '';

        res.json({
            is_success: true,
            user_id: 'Gaurav_Chindhe_18062003', 
            email: 'gaurav.thakabhau2021@vitstudent.ac.in', 
            roll_number: '21bce2471',
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: 'Server error' });
    }
});

// Route for GET requests
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Route for the root URL
app.get('/bfhl', (req, res) => {
    res.send('Welcome to the Backend API! Use /bfhl for your POST and GET requests.');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
