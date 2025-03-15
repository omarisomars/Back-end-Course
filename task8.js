const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/games', async (req, res) => {
  const { title, genre, condition } = req.body;
  try {
    const newGame = await prisma.game.create({
      data: { title, genre, condition },
    });
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add game.' });
  }
});

app.get('/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve games.' });
  }
});

app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await prisma.game.findUnique({ where: { id: parseInt(id) } });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve game.' });
  }
});

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { title, genre, condition } = req.body;
  try {
    const updatedGame = await prisma.game.update({
      where: { id: parseInt(id) },
      data: { title, genre, condition },
    });
    res.json(updatedGame);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update game.' });
  }
});

app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.game.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Game removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete game.' });
  }
});

app.listen(port, () => {
  console.log(`Retro Game Inventory API running on http://localhost:${port}`);
});
