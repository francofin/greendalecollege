const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
const imageRoutes = require('./image-routes.js');

router.use(userRoutes);
router.use(postRoutes);
router.use(commentRoutes);
router.use(imageRoutes);

module.exports = router;