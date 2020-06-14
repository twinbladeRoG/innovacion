const log = require('../middlewares/logger');
const Group = require('../models/Group');
const Event = require('../models/Event');
const Participant = require('../models/Participant');

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
      return res.status(500).json({ message: 'DB Error', e });
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
      return res.status(500).json({ message: 'DB Error', e });
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
        return res
          .status(400)
          .json({ message: 'Group with same name already exists!' });
      } else {
        const group = new Group({ name });
        await group.save();
        log.info(`New group ${name} added`);
        return res.json(group);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
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
      const group = await Group.findByIdAndUpdate(id, updates);
      if (group) return res.json(group);
      return res.status(404).json({ message: 'No such group exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
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
      const group = await Group.findByIdAndRemove(id);
      if (group) return res.json(group);
      return res.status(404).json({ message: 'No such group exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/event
   * @method POST
   * @description Add Events to a Group
   */
  addEvents: async (req, res) => {
    const { events } = req.body;
    const { id } = req.params;

    try {
      const group = await Group.findById(id, { events: 1 });
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      events.forEach(event => {
        if (!group.events.includes(event)) group.events.push(event);
      });
      await group.save();
      return res.json(await Event.find({ _id: { $in: group.events } }));
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/event
   * @method GET
   * @description Get Events of a Group
   */
  getEvents: async (req, res) => {
    const { id } = req.params;

    try {
      const group = await Group.findById(id, { events: 1 }).populate('events');
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      res.json(group.events);
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/event
   * @method PUT
   * @description Remove Events of a Groups
   */
  removeEvents: async (req, res) => {
    const { id } = req.params;
    let { events } = req.body;
    // events = events.map(event => ObjectId(event));

    try {
      const group = await Group.findById(id, { events: 1 });
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      let removedEvents = [];
      events.forEach(event => {
        if (group.events.includes(event))
          removedEvents.push(
            ...group.events.splice(group.events.indexOf(event), 1)
          );
      });
      await group.save();
      res.json(removedEvents);
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/participant
   * @method POST
   * @description Add Participants to a Group
   */
  addParticipants: async (req, res) => {
    const { participants } = req.body;
    const { id } = req.params;

    try {
      const group = await Group.findById(id, { participants: 1 });
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      participants.forEach(participant => {
        if (!group.participants.includes(participant))
          group.participants.push(participant);
      });
      await group.save();
      return res.json(
        await Participant.find({ _id: { $in: group.participants } })
      );
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/participant
   * @method GET
   * @description Get Participants of a Group
   */
  getParticipants: async (req, res) => {
    const { id } = req.params;

    try {
      const group = await Group.findById(id, { participants: 1 }).populate(
        'participants'
      );
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      res.json(group.participants);
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/group/:id/participant
   * @method PUT
   * @description Remove Participants of a Groups
   */
  removeParticipants: async (req, res) => {
    const { id } = req.params;
    let { participants } = req.body;
    // participants = participants.map(participant => ObjectId(participant));

    try {
      const group = await Group.findById(id, { participants: 1 });
      if (!group)
        return res.status(404).json({ message: 'No such group exists' });

      let removedParticipants = [];
      participants.forEach(participant => {
        if (group.participants.includes(participant))
          removedParticipants.push(
            ...group.participants.splice(
              group.participants.indexOf(participant),
              1
            )
          );
      });
      await group.save();
      res.json(removedParticipants);
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },
};

module.exports = GroupController;
