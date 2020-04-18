const log = require('../middlewares/logger');
const Member = require('../models/Member');

const MemberController = {
  /**
   * @url /api/member
   * @method GET
   * @description Get all Members
   */
  getAll: async (req, res) => {
    try {
      const members = await Member.find();
      return res.json(members);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/member/:id
   * @method GET
   * @description Get a Member by Id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const members = await Member.findById(id);
      return res.json(members);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/member
   * @method POST
   * @description Create a Member
   */
  create: async (req, res) => {
    const { first_name, last_name, contact, email } = req.body;

    try {
      const exists = await Member.exists({ email });

      if (exists) {
        return res.status(400).json({ message: 'Member with same email already exists!'});
      } else {
        const member = new Member({ first_name, last_name, contact, email });
        await member.save();
        log.info(`New member ${first_name} added`);
        return res.json(member);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/member
   * @method PUT
   * @description Update a Member by Id
   */
  update: async (req, res) => {
    const updates = {};
    if ('first_name' in req.body) updates.first_name = req.body.first_name;
    if ('last_name' in req.body) updates.last_name = req.body.last_name;
    if ('contact' in req.body) updates.contact = req.body.contact;
    if ('email' in req.body) updates.email = req.body.email;

    const id = req.body._id;

    try {
      const member = await Member.findByIdAndUpdate(id, updates);
      if (member)
        return res.json(member);
      return res.status(404).json({ message: 'No such member exists'});
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/member/:id
   * @method DELETE
   * @description Delete a Member by Id
   */
  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const member = await Member.findByIdAndRemove(id);
      if (member)
        return res.json(member);
      return res.status(404).json({ message: 'No such member exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e});
    }
  }
};

module.exports = MemberController;
