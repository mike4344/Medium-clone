'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      allowNull: false,
      type:DataTypes.TEXT,
    },
    storyId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      onDelete: "CASCADE",
    },
    userId: {
      allowNull: false,
      type:DataTypes.INTEGER,
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
    Comment.belongsTo(models.Story, { foreignKey: 'storyId'})
  };
  return Comment;
};