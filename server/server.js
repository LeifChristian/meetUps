const express = require('express');
const router = express.Router();
const Event = require('./dataModel');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

//mongosh "mongodb+srv://mycluster.erllz.mongodb.net/myFirstDatabase" --apiVersion 1 --username <username>

mongoose.connect('mongodb+srv://meetup:meetup@mycluster.erllz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use(cors());
app.use(bodyParser.json());

// Mount your router to your app
app.use('/events', router);

// GET all events
router.get('/', async (req, res) => {

  try {
    console.log('bob')
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single event by ID
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// CREATE an event
router.post('/', async (req, res) => {
 console.log('bob')
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    location: req.body.location,
    category: req.body.category,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an event
router.patch('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }

  if (req.body.date != null) {
    res.event.date = req.body.date;
  }

  if (req.body.description != null) {
    res.event.description = req.body.description;
  }

  if (req.body.location != null) {
    res.event.location = req.body.location;
  }

  if (req.body.category != null) {
    res.event.category = req.body.category;
  }

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Deleted event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  let event;

  try {
    event = await Event.findById(req.params.id);

    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

module.exports = router;
