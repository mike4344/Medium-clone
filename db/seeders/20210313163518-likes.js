// 'use strict';
let randomStory = () => Math.floor(Math.random() * 79 + 1)
//get random user id
let randomUser = () => Math.floor(Math.random() * 40 + 1)
//empty array to be pushed into
let likeArray = []
//Push the specified number of likes into the array
let likeCreator = (likeAmount) => {
  let pairs = []
  for(let i = 0 ; i < likeAmount ; i++){
    let newPair = [randomUser(), randomStory()]
    let exists = pairs.find(el => el[0] === newPair[0] && el[1] === newPair[1])

    if(!exists){
      pairs.push(newPair);
      likeArray.push({
        userId : newPair[0],
        storyId: newPair[1],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
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
