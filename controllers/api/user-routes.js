const router = require('express').Router();
const {User, Post, Image, Follower, Vote, Comment} = require('../../models');
const sequelize = require('../../config/connection');


//Get users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
      attributes: [
          'id',
          'username',
          'email',
          'created_at',
        [
            sequelize.literal(`(SELECT COUNT(*) FROM follower WHERE user.id = follower.follower_id)`),
            `follow_count`
          ]
      ],
      include: [Follower]
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//get user by id
router.get('/:id', (req, res) => {
    User.findOne(
        {
            attributes: {exclude:['password']},
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['title','body', 'created_at']
                },
                // {
                //     model: Image,
                //     attributes: ['name', 'data', 'created_at']
                // },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: [{
                        model: Post,
                        attributes: ['title']
                    },
                    {
                        model: Image,
                        attributes: ['name','data']
                    }]
                },
                {
                    model: Post,
                    attributes: ['title'],
                    through: Like,
                    as: 'liked_posts'
                },
                {
                    model: Image, 
                    attributes: ['name'],
                    through: Like,
                    as: 'liked_images'
                }
            ]
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(400).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/follow', (req, res) => {
    // make sure the session exists first
    console.log("body respnse", req.body);
    if (req.session) {
        console.log("body respnse", req.body);
      // pass session id along with all destructured properties on req.body
      User.follow({...req.body, follower_id: req.session.user_id }, { Follower })
        .then(updatedFollowerData => {
            console.log(updatedFollowerData);
            res.json(updatedFollowerData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
          console.log("body respnse", err);
        });
    }
  });

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    });
});


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'No user found with this email, please enter the correct email'});
                return;
            }
            const validatePassword = dbUserData.checkPassword(req.body.password);
            if(!validatePassword) {
                res.status(400).json({message: 'Incorrect password, please enter a valid password'});
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user:dbUserData, message: 'You are now successfully logged in'});
            });
    });
});


router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(400).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true, 
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;