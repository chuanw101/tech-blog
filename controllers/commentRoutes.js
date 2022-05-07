const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

//find all by blog
router.get("/", (req, res) => {
    Comment.findAll({
        include: [User]
    }).then(dbComments => {
        res.json(dbComments);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//create comment
router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"ya gotta login to comment!"})
  }
    Comment.create({
      comment:req.body.comment,
      BlogId:req.body.blogId,
      UserId:req.session.user.id
    })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

  module.exports = router;