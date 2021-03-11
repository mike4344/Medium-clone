'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      subtitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pictureURL: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Story.associate = function(models) {
    Story.belongsTo(models.User, {foreignKey: 'userId'});
    Story.hasMany(models.StoryLike, {foreignKey: 'storyId'});
  };
  return Story;
};