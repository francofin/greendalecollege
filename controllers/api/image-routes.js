const router = require('express').Router();
const {User, Post, Image, Like, Comment} = require('../../models');
const fs = require("fs");
const uploader = require("../../utils/upload");
const withAuth = require("../../utils/auth");



router.post("/", withAuth, uploader.single('file'), (req, res) => {
    console.log(req);
    if(req.file == undefined) {
        Image.create({
            title: req.body.title,
            body: req.body.text,
            user_id: req.session.user_id
        })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
        
    } else {
        Image.create({
            data: fs.readFileSync("resources/" + req.file.filename),
            name: req.file.originalname,
            file_type: req.file.mimetype
        })
            .then(image => {
                console.log(image);
            });

    const data = req.file.path;
    //console.log(req.body.title, req.body.text, req.session.user_id);
    console.log("path", req);
    console.log(req.file);

    Image.create({
        file_type: req.file.mimetype,
        body: req.body.text,
        title: req.body.title,
        data:req.file.filename, 
        name: req.file.originalname,
        user_id: req.session.user_id ,
        post_id: req.body.post_id,
    })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
});


router.put("/:id", withAuth, (req, res) => {
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
