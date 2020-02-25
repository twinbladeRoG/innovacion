const log = require('../middlewares/logger');
const Participant = require('../models/Participant');

const ParticipantController = {
	/**
   * @url /api/participants
   * @method GET
   * @description Get all Participants
   */
	getAll: async (req, res) => {
		const participants = await Participant.find();
		return res.json(participants);
	},

	/**
   * @url /api/participants/:id
   * @method GET
   * @description Get a Participant by Id
   */
	getById: async (req, res) => {
		const { id } = req.params;

		try {
			const participants = await Participant.find({ _id: id});
			return res.json(participants);
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/participants
   * @method POST
   * @description
   */
	create: async (req, res) => {
		const { first_name, last_name, contact, email, institute } = req.body;

		try {
			const exists = await Participant.exists({ email });

			if (exists) {
				return res.status(400).json({ message: 'Participant with same email already exists!'});
			} else {
				const participant = await Participant({
					first_name, last_name, contact, email, institute
				});
				participant.save();
				return res.json(participant);
			}
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/participants
   * @method PUT
   * @description
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
			const count = await Participant.updateOne({ _id: id }, updates);
			return res.json(count);
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/participants/filter
   * @method POST
   * @description Filter out Participants based on search parameters
   */
	remove: async (req, res) => {
		const { id } = req.params;

		try {
			const exists = await Participant.exists({ _id: id });

			if (exists) {
				const deleted = await Participant.deleteOne({ _id: id });
				return res.json(deleted);
			} else {
				return res.status(400).json({ message: 'No such participant exists' });
			}
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/participants/filter
   * @method POST
   * @description Filter out Participants based on search parameters
   */
	filter: async (req, res) => {
		const filter = {};
		if ('first_name' in req.body) filter.first_name = req.body.first_name;
		if ('last_name' in req.body) filter.last_name = req.body.last_name;
		if ('contact' in req.body) filter.contact = req.body.contact;
		if ('email' in req.body) filter.email = req.body.email;
		if ('institute' in req.body) filter.institute = req.body.institute;

		try {
			const participants = await Participant.find(filter);
			log.info(`${participants.length} found!`);
			return res.json(participants);
		} catch (e) {
			res.status(500).json({ message: 'DB Error', e});
		}
	},
};

module.exports = ParticipantController;
