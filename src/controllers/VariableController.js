const log = require('../middlewares/logger');
const Variable = require('../models/Variable');

const VariableController = {
  /**
   * @url /api/variable
   * @method GET
   * @description Get all Variables
   */
  getAll: async (req, res) => {
    try {
      const variables = await Variable.find();
      return res.json(variables);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/variable/:id
   * @method GET
   * @description Get a Variable by Id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const variables = await Variable.findById(id);
      return res.json(variables);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/variable
   * @method POST
   * @description Create a Variable
   */
  create: async (req, res) => {
    const { key, value } = req.body;

    try {
      const exists = await Variable.exists({ key });

      if (exists) {
        return res
          .status(400)
          .json({ message: 'Variable with same key already exists!' });
      } else {
        const variable = new Variable({ key, value });
        await variable.save();

        log.info(`New variable ${key} added`);
        return res.json(variable);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/variable
   * @method PUT
   * @description Update a Variable by Id
   */
  update: async (req, res) => {
    const updates = {};
    if ('key' in req.body) updates.key = req.body.key;
    if ('value' in req.body) updates.value = req.body.value;

    const id = req.body._id;

    try {
      const variable = await Variable.findByIdAndUpdate(id, updates);
      if (variable) return res.json(variable);
      return res.status(404).json({ message: 'No such variable exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/variable/:id
   * @method DELETE
   * @description Delete a Variable by Id
   */
  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const variable = await Variable.findByIdAndRemove(id);
      if (variable) return res.json(variable);
      return res.status(404).json({ message: 'No such variable exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },
};

module.exports = VariableController;
