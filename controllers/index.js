const router = require('express').Router();

const apiRoutes = require('./api');
const uploadRoutes = require('./upload.js');
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');


router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);
// router.use('/upload', uploadRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;