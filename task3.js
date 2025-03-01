const express = require('express');
const app = express();
const port = 3000;

const fortunes = [
    "You will have a great day!",
    "An exciting opportunity awaits you.",
    "Success is in your future.",
    "Happiness is just around the corner.",
    "Good news will come to you soon."
];

const jokes = [
    "Why don't skeletons fight each other? Because they don't have the guts!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What did the ocean say to the beach? Nothing, it just waved!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!"
];

const facts = [
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible.",
    "Bananas are berries, but strawberries are not.",
    "Octopuses have three hearts.",
    "A day on Venus is longer than a year on Venus.",
    "Water can boil and freeze at the same time under the right conditions."
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

app.get('/fortune', (req, res) => {
    res.send({ message: getRandomItem(fortunes) });
});

app.get('/joke', (req, res) => {
    res.send({ message: getRandomItem(jokes) });
});

app.get('/fact', (req, res) => {
    res.send({ message: getRandomItem(facts) });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
