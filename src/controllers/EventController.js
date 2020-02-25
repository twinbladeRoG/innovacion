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
			return res.status(500).json({ message: 'DB Error', e});
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
			const events = await Event.find({ _id: id});
			return res.json(events);
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/events
   * @method POST
   * @description Create a Particpant
   */
	create: async (req, res) => {
		const { name, description } = req.body;

		try {
			const exists = await Event.exists({ name });

			if (exists) {
				return res.status(400).json({ message: 'Event with same name already exists!'});
			} else {
				const event = await Event({ name, description });
				event.save();
				log.info(`New event ${name} added`);
				return res.json(event);
			}
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/events
   * @method PUT
   * @description Update a Event by Id
   */
	update: async (req, res) => {
		const updates = {};
		if ('first_name' in req.body) updates.first_name = req.body.first_name;
		if ('last_name' in req.body) updates.last_name = req.body.last_name;
		if ('contact' in req.body) updates.contact = req.body.contact;
		if ('email' in req.body) updates.email = req.body.email;
		if ('institute' in req.body) updates.institute = req.body.institute;

		const id = req.body._id;

		try {
			const count = await Event.updateOne({ _id: id }, updates);
			return res.json(count);
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/events/filter
   * @method POST
   * @description Delete a Partcipant by Id
   */
	remove: async (req, res) => {
		const { id } = req.params;

		try {
			const exists = await Event.exists({ _id: id });

			if (exists) {
				const deleted = await Event.deleteOne({ _id: id });
				return res.json(deleted);
			} else {
				return res.status(400).json({ message: 'No such participant exists' });
			}
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	}
};

module.exports = EventController;
