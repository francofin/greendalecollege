const User = require('./User');
const Post = require('./Post');
const Follower = require('./Follower');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Image = require('./Image');

// user relationships

User.hasMany(Follower, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'Voted_posts',
    foreignKey: 'user_id'
});

User.belongsToMany(Image, {
    through: Image, 
    as: 'Voted_images',
    foreignKey: 'user_id'
});

User.hasMany(Image, {
    foreignKey: 'user_id',
    onDelete: 'CASCASE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'NO ACTION'
});



// Post relationships

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.belongsToMany(User, {
    through: Vote, 
    as: 'Voted_posts',
    foreignKey: 'post_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Post.belongsTo(Image, {
//     foreignKey: 'image_id'
// });



// image relationships

Image.belongsTo(User, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

Image.belongsToMany(User, {
    through: Vote, 
    as: 'Voted_images',
    foreignKey: 'image_id'
});

Image.hasMany(Vote, {
    foreignKey: 'image_id'
});

Image.hasMany(Comment, {
    foreignKey:'image_id',
    onDelete:'CASCADE'
});

Image.belongsTo(Post, {
    foreignKey: 'post_id',
    constraints: false
})




// Vote relationships

Vote.belongsTo(User, {
    foreignKey:'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Vote.belongsTo(Image, {
    foreignKey: 'image_id'
});


// Follower Relationships

Follower.belongsTo(User, {
    foreignKey: 'user_id'
});


// Comment Relationships

Comment.belongsTo(User, {
    foreignKey:'user_id'
});

Comment.belongsTo(Post, {
    foreignKey:'post_id'
});

Comment.belongsTo(Image, {
    foreignKey:'image_id'
});


module.exports = {User, Post, Vote, Follower, Comment, Image};





