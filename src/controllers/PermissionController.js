const log = require('../middlewares/logger');
const Permission = require('../models/Permission');

const PermissionController = {
  /**
   * @url /api/permission
   * @method GET
   * @description Get all Permissions
   */
  getAll: async (req, res) => {
    try {
      const permissions = await Permission.find();
      return res.json(permissions);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/permission/:id
   * @method GET
   * @description Get a Permission by Id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const permissions = await Permission.findById(id);
      return res.json(permissions);
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/permission
   * @method POST
   * @description Create a Permission
   */
  create: async (req, res) => {
    const { key, description } = req.body;

    try {
      const exists = await Permission.exists({ key });

      if (exists) {
        return res
          .status(400)
          .json({ message: 'Permission with same key already exists!' });
      } else {
        const permission = new Permission({ key, description });
        await permission.save();
        log.info(`New permission ${key} added`);
        return res.json(permission);
      }
    } catch (e) {
      return res.status(500).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/permission
   * @method PUT
   * @description Update a Permission by Id
   */
  update: async (req, res) => {
    const updates = {};
    if ('key' in req.body) updates.key = req.body.key;
    if ('description' in req.body) updates.description = req.body.description;

    const id = req.body._id;

    try {
      const permission = await Permission.findByIdAndUpdate(id, updates);
      if (permission) return res.json(permission);
      return res.status(404).json({ message: 'No such permission exists' });
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },

  /**
   * @url /api/permission/:id
   * @method DELETE
   * @description Delete a Permission by Id
   */
  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const exists = await Permission.exists({ _id: id });

      if (exists) {
        const permission = await Permission.findByIdAndRemove(id);
        if (permission) return res.json(permission);
        return res.status(404).json({ message: 'No such permission exists' });
      } else {
        return res.status(400).json({ message: 'No such permission exists' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'DB Error', e });
    }
  },
};

module.exports = PermissionController;
