const log = require('../middlewares/logger');

const ParticipantController = {
  /**
   *
   */
  get: (req, res) => {
    log.error('info message');
    log.warn('info message');
    log.info('info message');
    log.http('info message');
    log.verbose('info message');
    log.debug('info message');

    res.json({ message: 'GGWP!!!'})
  }
}

module.exports = ParticipantController;
