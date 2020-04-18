const log = require('../middlewares/logger');
const Participant = require('../models/Participant');
const Event = require('../models/Event');
const Group = require('../models/Group');
const HttpError = require('../errors/HttpError');
const { validationResult } = require('express-validator');

class ParticipantController {
  /**
   * @url /api/participant
   * @method GET
   * @description Get all Participants
   */
  static async getAll(req, res, next) {
    try {
      const participants = await Participant.find();
      return res.json(participants);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id
   * @method GET
   * @description Get a Participant by Id
   */
  static async getById(req, res, next) {
    const { id } = req.params;
    const { errors } = validationResult(req);

    try {
      errors.forEach(({ msg }) => {
        throw new HttpError(msg, 400);
      });

      const participant = await Participant.findById(id);
      if (!participant)
        throw new HttpError(`No participant found with id: ${id}`, 404);
      return res.json(participant);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participants
   * @method POST
   * @description Create a Particpant
   */
  static async create(req, res, next) {
    try {
      const { errors } = validationResult(req);

      errors.forEach(({ msg }) => {
        throw new HttpError(msg, 400);
      });

      const { first_name, last_name, contact, email, institute } = req.body;

      const exists = await Participant.exists({ email });

      if (exists)
        throw new HttpError(
          `Participant with email ${email} already exists!`,
          400
        );

      const participant = new Participant({
        first_name,
        last_name,
        contact,
        email,
        institute
      });
      await participant.save();

      return res.json(participant);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant
   * @method PUT
   * @description Update a Participant by Id
   */
  static async update(req, res, next) {
    const updates = {};
    if ('first_name' in req.body) updates.first_name = req.body.first_name;
    if ('last_name' in req.body) updates.last_name = req.body.last_name;
    if ('contact' in req.body) updates.contact = req.body.contact;
    if ('email' in req.body) updates.email = req.body.email;
    if ('institute' in req.body) updates.institute = req.body.institute;

    const id = req.body._id;

    try {
      const participant = await Participant.findByIdAndUpdate(id, updates);
      if (participant) return res.json(participant);
      return res.status(404).json({ message: 'No such participant exists' });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id
   * @method DELETE
   * @description Delete a Partcipant by Id
   */
  static async remove(req, res, next) {
    const { id } = req.params;

    try {
      const participant = await Participant.findByIdAndRemove(id);
      if (participant) return res.json(participant);
      return res.status(404).json({ message: 'No such participant exists' });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/filter
   * @method POST
   * @description Filter out Participants based on search parameters
   */
  static async filter(req, res, next) {
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
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/event
   * @method POST
   * @description Add Events to a Participant
   */
  static async addEvents(req, res, next) {
    const { events } = req.body;
    const { id } = req.params;

    try {
      const participant = await Participant.findById(id, { events: 1 });
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      events.forEach(event => {
        if (!participant.events.includes(event)) participant.events.push(event);
      });
      await participant.save();
      return res.json(await Event.find({ _id: { $in: participant.events } }));
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/event
   * @method GET
   * @description Get Events of a Participant
   */
  static async getEvents(req, res, next) {
    const { id } = req.params;

    try {
      const participant = await Participant.findById(id, {
        events: 1
      }).populate('events');
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      res.json(participant.events);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/event
   * @method PUT
   * @description Remove Events of a Participants
   */
  static async removeEvents(req, res, next) {
    const { id } = req.params;
    let { events } = req.body;
    // events = events.map(event => ObjectId(event));

    try {
      const participant = await Participant.findById(id, { events: 1 });
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      let removedEvents = [];
      events.forEach(event => {
        if (participant.events.includes(event))
          removedEvents.push(
            ...participant.events.splice(participant.events.indexOf(event), 1)
          );
      });
      await participant.save();
      res.json(removedEvents);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/group
   * @method POST
   * @description Add Groups to a Participant
   */
  static async addGroups(req, res, next) {
    const { groups } = req.body;
    const { id } = req.params;

    try {
      const participant = await Participant.findById(id, { groups: 1 });
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      for (const group of groups) {
        if (!participant.groups.includes(group)) {
          let currentGroup = await Group.findById(group, { participants: 1 });
          if (!currentGroup.participants.includes(participant._id)) {
            currentGroup.participants.push(participant._id);
            await currentGroup.save();
          }
          participant.groups.push(group);
        }
      }

      await participant.save();
      return res.json(await Group.find({ _id: { $in: participant.groups } }));
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/group
   * @method GET
   * @description Get Groups of a Participant
   */
  static async getGroups(req, res, next) {
    const { id } = req.params;

    try {
      const participant = await Participant.findById(id, {
        groups: 1
      }).populate('groups');
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      res.json(participant.groups);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @url /api/participant/:id/group
   * @method PUT
   * @description Remove Groups of a Participants
   */
  static async removeGroups(req, res, next) {
    const { id } = req.params;
    const { groups } = req.body;

    try {
      const participant = await Participant.findById(id, { groups: 1 });
      if (!participant)
        return res.status(404).json({ message: 'No such participant exists' });

      let removedGroups = [];
      for (const group of groups) {
        if (participant.groups.includes(group)) {
          let currentGroup = await Group.findById(group, { participants: 1 });
          if (currentGroup.participants.includes(participant._id)) {
            currentGroup.participants.splice(
              currentGroup.participants.indexOf(participant._id),
              1
            );
            await currentGroup.save();
          }
          removedGroups.push(
            ...participant.groups.splice(participant.groups.indexOf(group), 1)
          );
        }
      }
      await participant.save();
      res.json(removedGroups);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ParticipantController;
