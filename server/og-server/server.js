const express = require('express');
const router = express.Router();
const Event = require('./dataModel');
const Setlist = require('./setlistModel')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

mongoose.connect('mongodb+srv://meetup:meetup@mycluster.erllz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use(cors());
app.use(bodyParser.json());

// GET all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single event by ID
router.get('/events/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// CREATE an event
router.post('/events', async (req, res) => {
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
router.patch('/events/:id', getEvent, async (req, res) => {
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
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Cannot find event' });
    }

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

router.get('/setlist', async (req, res) => {
  try {
    const setlist = await Setlist.findOne();
    res.json(setlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/setlist', async (req, res) => {
  try {
    const setlist = await Setlist.findOne();
    setlist.text = req.body.text;
    const updatedSetlist = await setlist.save();
    res.json(updatedSetlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});