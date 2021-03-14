'use strict';
//get random comment id
let randomComment = () => Math.floor(Math.random() * 500 + 1)
//get random user id
let randomUser = () => Math.floor(Math.random() * 40 + 1)
//empty array to be pushed into
let likeArray = []
//Push the specified number of likes into the array
let likeCreator = (likeAmount) => {
  for(let i = 0 ; i < likeAmount ; i++){
    likeArray.push({
     userId : randomUser(),
     commentId: randomComment(),
     createdAt: new Date(),
     updatedAt: new Date()
    })
  }
}

//creates and pushes 100000 likes into the array
likeCreator(100000)

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('CommentLikes',
  likeArray, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('CommentLikes', null, {});
  }
};
