// 'use strict';
let randomStory = () => Math.floor(Math.random() * 79 + 1)
//get random user id
let randomUser = () => Math.floor(Math.random() * 40 + 1)
//empty array to be pushed into
let likeArray = []
//Push the specified number of likes into the array
let likeCreator = (likeAmount) => {
  for(let i = 0 ; i < likeAmount ; i++){
    likeArray.push({
     userId : randomUser(),
     storyId: randomStory(),
     createdAt: new Date(),
     updatedAt: new Date()
    })
  }
}

likeCreator(10000)

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('StoryLikes', likeArray, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('StoryLikes', null, {});
  }
};
