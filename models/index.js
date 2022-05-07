const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Blog.hasMany(Comment);
Comment.BelongsTo(Blog);

module.exports = {
    User,
    Blog,
    Comment
}