const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    console.log('======================');
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'created_at',
        ],
        order: [['created_at', 'DESC']]
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        image_id: req.body.image_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

module.exports = router;