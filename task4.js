const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

let missions = [];
let missionId = 1; 

app.post('/missions', (req, res) => {
    const { name, status } = req.body;
    if (!name || !status) {
        return res.status(400).json({ message: 'Mission name and status are required.' });
    }
    const newMission = { id: missionId++, name, status };
    missions.push(newMission);
    res.status(201).json(newMission);
});

app.get('/missions', (req, res) => {
    res.json(missions);
});

app.get('/missions/:id', (req, res) => {
    const mission = missions.find(m => m.id === parseInt(req.params.id));
    if (!mission) {
        return res.status(404).json({ message: 'Mission not found' });
    }
    res.json(mission);
});

app.put('/missions/:id', (req, res) => {
    const mission = missions.find(m => m.id === parseInt(req.params.id));
    if (!mission) {
        return res.status(404).json({ message: 'Mission not found' });
    }
    
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }
    
    mission.status = status;
    res.json(mission);
});

app.delete('/missions/:id', (req, res) => {
    const missionIndex = missions.findIndex(m => m.id === parseInt(req.params.id));
    if (missionIndex === -1) {
        return res.status(404).json({ message: 'Mission not found' });
    }
    
    const deletedMission = missions.splice(missionIndex, 1);
    res.json({ message: 'Mission cancelled', deletedMission });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});