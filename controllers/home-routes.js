const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { User, Comment, Image, Like, Post } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
    res.render('homepage');
  });

  
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
      [
        sequelize.literal(`(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)`),
        'like_count'
      ]
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then((dbPostData) => {
    const posts = dbPostData.map((posts) => this.post.get({plain:true}));
    res.render('homepage', {posts});
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    layout: 'dashboard'
  });
});

router.get('/signup', (req, res) => {
  if(req.session.loggedIn){
    res.redirect("/");
    return;
  }
  res.render("signup", {
    layout: "dashboard"
  });
});

module.exports = router;