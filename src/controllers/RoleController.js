const log = require('../middlewares/logger');
const Role = require('../models/Role');

const RoleController = {
  /**
   * @url /api/role
   * @method GET
   * @description Get all Roles
   */
  getAll: async (req, res) => {
    try {
      const roles = await Role.find();
      return res.json(roles);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/role/:id
   * @method GET
   * @description Get a Role by Id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const roles = await Role.findById(id);
      return res.json(roles);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/role
   * @method POST
   * @description Create a Role
   */
  create: async (req, res) => {
    const { type } = req.body;

    try {
      const exists = await Role.exists({ type });

      if (exists) {
        return res.status(400).json({ message: 'Role with same type already exists!'});
      } else {
        const role = new Role({ type });
        await role.save();
        log.info(`New role ${type} added`);
        return res.json(role);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/role
   * @method PUT
   * @description Update a Role by Id
   */
  update: async (req, res) => {
    const updates = {};
    if ('type' in req.body) updates.type = req.body.type;

    const id = req.body._id;

    try {
      const role = await Role.findByIdAndUpdate(id, updates);
      if (role)
        return res.json(role);
      return res.status(404).json({ message: 'No such role exists'});
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e});
    }
  },

  /**
   * @url /api/role/:id
   * @method DELETE
   * @description Delete a Role by Id
   */
  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const role = await Role.findByIdAndRemove(id);
      if (role)
        return res.json(role);
      return res.status(404).json({ message: 'No such role exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e});
    }
  }
};

module.exports = RoleController;
