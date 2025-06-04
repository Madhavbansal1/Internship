const express = require('express');
const app = express();
const PORT = 3000;

// Helper: Check if a number is prime
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// GET /isprime?number=5
app.get('/isprime', (req, res) => {
    try {
        const input = req.query.number;

        // Validate presence
        if (!input) {
            return res.status(400).json({ error: 'Missing query parameter "number".' });
        }

        const num = Number(input);

        // Validate type
        if (!Number.isInteger(num)) {
            return res.status(400).json({ error: 'The "number" must be an integer.' });
        }

        // Respond
        res.json({
            number: num,
            isPrime: isPrime(num)
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
