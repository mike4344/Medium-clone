'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StoryLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: { model: 'Users' },
        type: Sequelize.INTEGER
      },
      storyId: {
        allowNull: false,
        references: { model: 'Stories' },
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StoryLikes');
  }
};