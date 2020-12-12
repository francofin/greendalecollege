const User = require('./User');
const Post = require('./Post');
const Follower = require('./Follower');
const Like = require('./Like');
const Comment = require('./Comment');
const Image = require('./Image');

// user relationships

User.hasMany(Follower, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
});

User.belongsToMany(Image, {
    through: Image, 
    as: 'liked_images',
    foreignKey: 'user_id'
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
    through: Like, 
    as: 'liked_posts',
    foreignKey: 'post_id'
});

Post.hasMany(Like, {
    foreignKey: 'post_id'
});

// image relationships

Image.belongsToMany(User, {
    through: Like, 
    as: 'liked_images',
    foreignKey: 'image_id'
});

Image.hasMany(Like, {
    foreignKey: 'image_id'
});

Image.hasMany(Comment, {
    foreignKey:'post_id',
    onDelete:'CASCADE'
})

// like relationships

Like.belongsTo(User, {
    foreignKey:'user_id'
});

Like.belongsTo(Post, {
    foreignKey: 'post_id'
});

Like.belongsTo(Image, {
    foreignKey: 'image_id'
});






