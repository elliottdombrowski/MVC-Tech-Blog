const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Project, {
    foreignKey: 'proj_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Project, Comment};