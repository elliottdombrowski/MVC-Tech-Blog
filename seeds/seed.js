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
    
    // for (const project of projectData) {
    //     await Project.create({
    //         ...project,
    //     });
    // }
    const project = await Project.bulkCreate(projectData, {
        individualHooks: true,
        returning: true,
    })

    const comment = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
    
    process.exit(0);
};

seedDatabase();