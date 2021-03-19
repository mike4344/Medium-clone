'use strict';
//get random comment id
let randomComment = () => Math.floor(Math.random() * 350 + 1)
//get random user id
let randomUser = () => Math.floor(Math.random() * 40 + 1)
//empty array to be pushed into
let likeArray = []
//Push the specified number of likes into the array
let likeCreator = (likeAmount) => {
  let pairs = [];
  for(let i = 0 ; i < likeAmount ; i++){
    let newPair = [ randomUser(), randomComment() ]
    let exists = pairs.find(el => el[0] === newPair[0] && el[1] === newPair[1])

    if(!exists){
    pairs.push(newPair);
    likeArray.push({
     userId : newPair[0],
     commentId: newPair[1],
     createdAt: new Date(),
     updatedAt: new Date()
    })
  }
}
}

//creates and pushes 100000 likes into the array
likeCreator(500)

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('CommentLikes',
  likeArray, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('CommentLikes', null, {});
  }
};
