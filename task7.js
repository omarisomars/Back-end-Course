const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let scores = [];
let nextId = 1;

app.post('/scores', (req, res) => {
    const { playerName, score } = req.body;
    if (!playerName || typeof score !== 'number') {
        return res.status(400).json({ message: 'playerName and score are required' });
    }

    const newScore = {
        id: nextId++,
        playerName,
        score
    };
    scores.push(newScore);
    res.status(201).json(newScore);
});

app.get('/scores', (req, res) => {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    res.json(sortedScores);
});

app.delete('/scores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = scores.findIndex(score => score.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Score not found' });
    }

    const removed = scores.splice(index, 1);
    res.json({ message: 'Score deleted successfully', removed });
});

app.listen(port, () => {
    console.log(`Bowling Score Tracker API is running on http://localhost:${port}`);
});
