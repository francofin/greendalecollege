const router = require('express').Router();
const {User, Post, Image, Like, Comment} = require('../../models');
const fs = require("fs");
const uploader = require("../../utils/upload");
const withAuth = require("../../utils/auth");


router.post("/", withAuth, uploader.single('file'), (req, res) => {
    
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
    console.log("path", req.file.path);
    console.log(req.file);

    Image.create({
        file_type: req.file.mimetype,
        data:req.file.filename, 
        name: req.file.filename,
        user_id: req.session.user_id 
    })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });

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
