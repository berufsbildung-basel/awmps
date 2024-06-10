const express = require('express');
const bodyParser = require('body-parser');
const { PotType } = require('/Users/sinokholkhojaev/Desktop/AWMPS/API/scripts'); // Import PotType model

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Get a list of all pot types
app.get('/pot_types', async (req, res) => {
    try {
        const potTypes = await PotType.findAll();
        res.status(200).json(potTypes );
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Create a new pot type
app.post('/pot_types', async (req, res) => {
    try {
        const newPotType = await PotType.create(req.body);
        res.status(201).json(newPotType);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request', error });
    }
});

// Get details of a specific pot type
app.get('/pot_types/:id', async (req, res) => {
    try {
        const potTypeId = req.params.id;
        const potType = await PotType.findByPk(potTypeId);

        if (!potType) {
            return res.status(404).json({ message: 'Pot Type not found' });
        }

        res.status(200).json(potType);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Update a specific pot type
app.put('/pot_types/:id', async (req, res) => {
    try {
        const potTypeId = req.params.id;
        const [updated] = await PotType.update(req.body, { where: { id: potTypeId } });

        if (updated) {
            const updatedPotType = await PotType.findByPk(potTypeId);
            return res.status(200).json(updatedPotType);
        }

        throw new Error('Pot Type not found');
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Delete a specific pot type
app.delete('/pot_types/:id', async (req, res) => {
    try {
        const potTypeId = req.params.id;
        const deleted = await PotType.destroy({ where: { id: potTypeId } });

        if (deleted) {
            return res.status(204).json({ message: 'Pot Type deleted successfully' });
        }

        throw new Error('Pot Type not found');
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
