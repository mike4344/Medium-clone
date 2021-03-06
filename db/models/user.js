'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
    },
    screenName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    pictureURL: {
      type: DataTypes.STRING(255),
    },
    biography: {
      type: DataTypes.TEXT
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Story, {foreignKey: "userId"})
    User.hasMany(models.StoryLike, {foreignKey: "userId"})
  };
  return User;
};