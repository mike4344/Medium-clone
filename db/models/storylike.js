'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryLike = sequelize.define('StoryLike', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
    },
  }, 
   {});
  StoryLike.associate = function(models) {
    // associations can be defined here
    StoryLike.belongsTo(models.User, { foreignKey: 'userId' })
    StoryLike.belongsTo(models.Story, { foreignKey: 'storyId' })

  };
  return StoryLike;
};