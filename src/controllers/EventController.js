const log = require('../middlewares/logger');
const Event = require('../models/Event');

const EventController = {
  /**
   * @url /api/events
   * @method GET
   * @description Get all Events
   */
  getAll: async (req, res) => {
    try {
      const events = await Event.find();
      return res.json(events);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/events/:id
   * @method GET
   * @description Get a Event by Id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const events = await Event.find({ _id: id });
      return res.json(events);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/events
   * @method POST
   * @description Create a Event
   */
  create: async (req, res) => {
    const { name, description } = req.body;

    try {
      const exists = await Event.exists({ name });

      if (exists) {
        return res
          .status(400)
          .json({ message: 'Event with same name already exists!' });
      } else {
        const event = new Event({ name, description });
        await event.save();
        log.info(`New event ${name} added`);
        return res.json(event);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/events
   * @method PUT
   * @description Update a Event by Id
   */
  update: async (req, res) => {
    const updates = {};
    if ('name' in req.body) updates.name = req.body.name;
    if ('description' in req.body) updates.description = req.body.description;

    const id = req.body._id;

    try {
      const event = await Event.findByIdAndUpdate(id, updates);
      if (event) return res.json(event);
      return res.status(404).json({ message: 'No such event exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/events/:id
   * @method DELETE
   * @description Delete a Event by Id
   */
  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const event = await Event.findByIdAndRemove(id);
      if (event) return res.json(event);
      return res.status(404).json({ message: 'No such event exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  }
};

module.exports = EventController;
