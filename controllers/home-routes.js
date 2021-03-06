const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Image, Vote, Post } = require('../models');

// router.get('/', (req, res) => {
//   console.log(req.session);
//     res.render('homepage', {loggedIn:req.session.loggedIn});
//   });

  
router.get("/", (req, res) => {
  Image.findAll({
    attributes: [
              'id',
              'name',
              'data',
              'body_text',
              'title',
              'created_at',
              // [
              //   sequelize.literal(`(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)`),
              //   `like_count`
              // ],
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
        attributes: ['id', 'username']
      }
    ], 
    orderby: [['created_at', 'DESC']]
  })
  .then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({plain:true}));
    res.render('homepage', {posts:posts, loggedIn: req.session.loggedIn});
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



router.get('/contact', (req, res) => {

  res.render("contact", {
    layout: 'dashboard',
    loggedIn: req.session.loggedIn
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