const sequelize = require('../config/connection');
const { User, Project, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const project of projectData) {
        await Project.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const comment = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
    // for (const comment of commentData) {
    //     await Comment.create({
    //         ...comment,
    //         proj_id: project[Math.floor(Math.random() * project.length)].id,
    //     });
    // }



    process.exit(0);
};

seedDatabase();