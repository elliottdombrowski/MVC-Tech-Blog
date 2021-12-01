const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        comment_date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },  
        user_fname: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'first_name',
            },
        },
        user_lname: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'last_name',
            },
        },
        proj_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'project',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;