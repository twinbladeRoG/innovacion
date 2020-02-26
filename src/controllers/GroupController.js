const log = require('../middlewares/logger');
const Group = require('../models/Group');

const GroupController = {
	/**
   * @url /api/group
   * @method GET
   * @description Get all Groups
   */
	getAll: async (req, res) => {
		try {
			const groups = await Group.find();
			return res.json(groups);
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/group/:id
   * @method GET
   * @description Get a Group by Id
   */
	getById: async (req, res) => {
		const { id } = req.params;

		try {
			const groups = await Group.findById(id);
			return res.json(groups);
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/group
   * @method POST
   * @description Create a Group
   */
	create: async (req, res) => {
		const { name } = req.body;

		try {
			const exists = await Group.exists({ name });

			if (exists) {
				return res.status(400).json({ message: 'Group with same name already exists!'});
			} else {
				const group = new Group({ name });
				await group.save();
				log.info(`New group ${name} added`);
				return res.json(group);
			}
		} catch (e) {
			return res.status(500).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/group
   * @method PUT
   * @description Update a Group by Id
   */
	update: async (req, res) => {
		const updates = {};
		if ('name' in req.body) updates.name = req.body.name;

		const id = req.body._id;

		try {
			const count = await Group.updateOne({ _id: id }, updates);
			return res.json(count);
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	},

	/**
   * @url /api/group/:id
   * @method DELETE
   * @description Delete a Group by Id
   */
	remove: async (req, res) => {
		const { id } = req.params;

		try {
			const exists = await Group.exists({ _id: id });

			if (exists) {
				const deleted = await Group.deleteOne({ _id: id });
				return res.json(deleted);
			} else {
				return res.status(400).json({ message: 'No such group exists' });
			}
		} catch (e) {
			return res.status(400).json({ message: 'DB Error', e});
		}
	}
};

module.exports = GroupController;
