const log = require('../middlewares/logger');
const Participant = require('../models/Participant');

const ParticipantController = {
  /**
   * @url /api/participants
   * @method GET
   * @description Get all Participants
   */
  getAll: (req, res) => {
    Participant.find()
    .then(participants => {
      res.json(participants);
    })
    .catch(error =>
      res.status(500).json({ message: 'DB Error', error})
    );
  },

  /**
   * @url /api/participants/:id
   * @method GET
   * @description Get a Participant by Id
   */
  getById: (req, res) => {
    const { id } = req.params;

    Participant.find({ _id: id})
    .then(participants => {
      res.json(participants);
    })
    .catch(error =>
      res.status(500).json({ message: 'DB Error', error})
    );
  },

  /**
   * @url /api/participants
   * @method POST
   * @description Filter out Participants based on search parameters
   */
  filter: (req, res) => {
    const filter = {};
    if ("first_name" in req.body) filter.first_name = req.body.first_name;
    if ("last_name" in req.body) filter.last_name = req.body.last_name;
    if ("contact" in req.body) filter.contact = req.body.contact;
    if ("email" in req.body) filter.email = req.body.email;
    if ("institute" in req.body) filter.institute = req.body.institute;

    Participant.find(filter)
    .then(participants => {
      res.json(participants);
    })
    .catch(error =>
      res.status(500).json({ message: 'DB Error', error})
    );
  },

}

module.exports = ParticipantController;
