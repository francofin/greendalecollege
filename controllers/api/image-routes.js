const router = require('express').Router();
const {User, Post, Image, Vote, Comment} = require('../../models');
const fs = require("fs");
const sequelize = require('../../config/connection');
const uploader = require("../../utils/upload");
const withAuth = require("../../utils/auth");

router.get('/', (req, res) => {
    Image.findAll({
      attributes: [
                'id',
                'name',
                'data',
                'body_text',
                'title',
                'created_at',
                [
                  sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE image.id = vote.image_id)`),
                  `vote_count`
                ],
              ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'image_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['created_at', 'DESC']],
    })
      .then(dbPostData => {
        // serialize data before passing to template
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
          },
      attributes: [
                'id',
                'name',
                'data',
                'body_text',
                'title',
                'created_at',
                [
                  sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE image.id = vote.image_id)`),
                  `vote_count`
                ],
              ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'image_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['created_at', 'DESC']],
    })
      .then(dbPostData => {
        // serialize data before passing to template
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post("/", withAuth, uploader.single('file'), (req, res) => {
    console.log(req);
    if(req.file == undefined) {
        Image.create({
            title: req.body.title,
            body_text: req.body.text,
            user_id: req.session.user_id
        })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
        
    } else {
    //     Image.create({
    //         data: fs.readFileSync("resources/" + req.file.filename),
    //         name: req.file.originalname,
    //         file_type: req.file.mimetype
    //     })
    //         .then(image => {
    //             console.log(image);
    //         });

    // const data = req.file.path;
    //console.log(req.body.title, req.body.text, req.session.user_id);
    console.log("path", req);
    console.log(req.file);

    Image.create({
        file_type: req.file.mimetype,
        body_text: req.body.text,
        title: req.body.title,
        data:req.file.filename, 
        name: req.file.originalname,
        user_id: req.session.user_id ,
    })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
});


router.put("/:id", (req, res) => {
    Image.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(500).json(err);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/upvote', (req, res) => {
    // make sure the session exists first
    console.log("body respnse", req.body);
    if (req.session) {
        console.log("body respnse", req.body);
      // pass session id along with all destructured properties on req.body
      Image.upvote({ ...req.body, user_id: req.session.user_id }, { Vote })
        .then(updatedVoteData => {
            console.log(updatedVoteData);
            res.json(updatedVoteData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
          console.log("body respnse", req.body);
        });
    }
  });

// DELETE '/:id' delete Post by ID
router.delete("/:id", withAuth, (req, res) => {
    Image.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
