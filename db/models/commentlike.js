'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    userId: {
      allowNull: false,
      type:DataTypes.INTEGER,
    },
    commentId: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
  }, {});
  CommentLike.associate = function(models) {
    // associations can be defined here
    CommentLike.belongsTo(models.User, { foreignKey: 'userId' })
    CommentLike.belongsTo(models.Comment, { foreignKey: 'commentId'})
  };
  return CommentLike;
};