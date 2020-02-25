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
	}
};

module.exports = ParticipantController;
