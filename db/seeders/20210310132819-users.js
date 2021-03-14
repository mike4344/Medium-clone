'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        email:'LightYagami@gmail.com',
        hashedPassword: await bcrypt.hash('Passw0rd!', 10),
        screenName:'Light Yagami',
        pictureURL: 'https://i.imgur.com/rZRFqlX.jpg',
        biography: 'all I need to do is write your name and envision your face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
      email:'meliodas@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Meliodas',
      pictureURL: 'https://i.imgur.com/Es1W13e.jpg',
      biography: 'I need to save Elizabeth',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email:'ban@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Ban',
      pictureURL: 'https://data.whicdn.com/images/305204483/original.gif',
      biography: 'I will steal your heart',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email:'escanor@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Escanor',
      pictureURL: 'https://i.imgur.com/AasLnR0.jpg',
      biography: 'I am th one who stands at the pinnacle!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email:'Goku@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Goku',
      pictureURL: 'https://i.imgur.com/J0XfjFYg.jpg',
      biography: 'I will keep fighting to be the strongest ever',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    email:'vegeta@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Vegeta',
    pictureURL: 'https://i.imgur.com/cIq5AQ6.jpg',
    biography: "IT'S OVER 9000!!!!!!!!!!!!!!",
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'naruto@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Naruto Uzumaki',
    pictureURL: 'https://i.imgur.com/8tBTm6t.jpg',
    biography: 'I am going to be hokage!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'sasuke@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Sasuke Uchiha',
    pictureURL: 'https://i.imgur.com/yEQSLCy.jpg',
    biography: 'I am going to avenge my clan!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'itachi@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Itachi Uchiha',
    pictureURL: 'https://i.imgur.com/T51qWmW.jpg',
    biography: 'forgive me sasuke',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email: 'kakashi@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Kakashi Hatake',
    pictureURL: 'https://i.imgur.com/Pma4Cim.gif',
    biography: 'Those who abandon their mission are trash, but those who abandon their friends are worse than trash!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'hinata@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Hinata Hyuga',
    pictureURL: 'https://i.imgur.com/VfET5RY.gif',
    biography: 'I love you Naruto',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'obito@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Obito Uchiha',
    pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RSamdRHth2t_yCikZro2Zv2_brm9qmojYQ&usqp=CAU',
    biography: 'We need to destroy this system!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'madara@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Madara Uchiha',
    pictureURL: 'https://i.imgur.com/usil0NS.gif',
    biography: 'I coming for you Hashirama!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'Hashirama@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Hashirama Senju',
    pictureURL: 'https://i.imgur.com/cMDjObp.jpg',
    biography: 'Founder of the hidden leaf, First Hokage',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'tobirama@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Tobirama Senju',
    pictureURL: 'https://i.imgur.com/fyirMwp.gif',
    biography: 'Make Konoha great again',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'hiruzen@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Hiruzen Sarutobi',
    pictureURL: 'https://i.imgur.com/OZJUlOz.gif',
    biography: 'The will of fire will never die!!!',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'Tsunade@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Tsunade Senju',
    pictureURL: 'https://i.imgur.com/KUgwc3N.jpg',
    biography: 'I may be a woman but I am not weak',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'deku@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Izuku Midoriya',
    pictureURL: 'https://i.imgur.com/1RdoC5W.jpg',
    biography: 'This is the story of how I became the number one hero',
    createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'allMight@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'AllMight',
      pictureURL: 'https://i.imgur.com/DAwUUuu.jpg',
      biography: 'Symbol of peace',
      createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'todoroki@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Todoroki',
      pictureURL: 'https://i.imgur.com/90os3TU.jpg',
      biography: 'half cold, half hot',
      createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'stain@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Stain',
      pictureURL: 'https://i.imgur.com/DJOtkpF.jpg',
      biography: 'These false heros need to be culled!',
      createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'bakugo@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Bakugo',
      pictureURL: 'https://i.imgur.com/1707D6A.jpg',
      biography: 'I am going to beat all of you losers!',
      createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'luffy@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Monkey D. Luffy',
      pictureURL: 'https://i.imgur.com/PQOlTEf.jpg',
      biography: 'Pirates do not have to share their meat',
      createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      email:'koro@gmail.com',
      hashedPassword: await bcrypt.hash('Passw0rd!', 10),
      screenName:'Koro-sensei ',
      pictureURL: 'https://i.imgur.com/7dkEwhDh.jpg',
    biography: 'I will indeed destroy the earth, but first I will be your teacher',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'natsu@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Natsu',
    pictureURL: 'https://i.pinimg.com/originals/7b/56/36/7b56364c134db631fb9268e75c6af382.png',
    biography: 'I am going to eat your fire',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'L@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'L',
    pictureURL: 'https://i.imgur.com/kfrxs72.gif',
    biography: 'Always two steps ahead',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'eren@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Eren Jaeger',
    pictureURL: 'https://i.imgur.com/PGL7cMn.gif',
    biography: 'Titan',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'saitama@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Saitama',
    pictureURL: 'https://i.imgur.com/u3Dmiur.jpg',
    biography: 'Hero for fun',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    email:'genos@gmail.com',
    hashedPassword: await bcrypt.hash('Passw0rd!', 10),
    screenName:'Genos',
    pictureURL: 'https://i.imgur.com/j89X6qn.jpg',
    biography: 'Saitama sensei is the best',
    createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'gon@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Gon',
  pictureURL: 'https://i.imgur.com/yvksk3d.png',
  biography: 'I am going to be a hunter!',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'killua@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Killua',
  pictureURL: 'https://i.imgur.com/a8R9YNt.jpg',
  biography: 'I am going to be a hunter!',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'yugi@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Yami Yugi',
  pictureURL: 'https://i.imgur.com/Zo6y7IL.jpg',
  biography: 'The heart of the cards',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'kaiba@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Seto Kaiba',
  pictureURL: 'https://i.imgur.com/90IeiYC.jpg',
  biography: 'You are a second rate duelist with a third rate deck',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'yuske@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Yusuke Urameshi',
  pictureURL: 'https://i.imgur.com/RFOXstB.jpg',
  biography: 'I will save the spirit world',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'kurama@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Kurama',
  pictureURL: 'https://i.imgur.com/Ss5Xvcv.gif',
  biography: 'No not that kurama',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'hiei@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Hiei',
  pictureURL: 'https://i.imgur.com/no9ruFL.jpg',
  biography: 'busy brooding',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'stone@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Dr.Stone',
  pictureURL: 'https://i.imgur.com/DdD7J49.jpg',
  biography: 'The doctor is in',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'lelouch@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Lelouch',
  pictureURL: 'https://i.imgur.com/tKvVPUh.jpg',
  biography: 'Rebelion',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'Ash@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Ash Ketchum',
  pictureURL: 'https://i.imgur.com/qCThEO6.jpg',
  biography: `I want to be the very best Like no one ever was.
  To catch them is my real test,
  To train them is my cause!
  (I will travel across the land,
  Searching far and wide.
  Each Pokemon to understand
  The power that's inside!)
  Pokemon!
  Gotta catch em' all!
  It's you and me,
  I know it's my destiny!
  Pokemon!
  Oh, you're my best friend,
  In a world we must defend!
  Pokemon!
  Gotta catch em' all!
  (A heart so true,
    Our courage will pull us through!)
    You teach me and I'll teach you,
  Po-ke-mon!
  Gotta catch em' all!
  Gotta catch em' all!
  Every challenge along the way,
  With courage I will face!
  I will battle every day,
  To claim my rightful place!
  Come with me, the time is right,
  There's no better team!
  Arm in arm, we'll win the fight,
  It's always been our dream!
  Pokemon!
  Gotta catch em' all!
  It's you and me,
  I know it's my destiny!
  Pokemon!
  Oh, you're my best friend,
  In a world we must defend!
  Pokemon!
  Gotta catch em' all!
  (A heart so true,
  Our courage will pull us through!)
  You teach me and I'll teach you,
  Po-ke-mon!
  Gotta catch em' all!
  Gotta catch em' all!
  Gotta catch em' all!
  Gotta catch em' all!
  Gotta catch em' all!
  Pokemon!
  Gotta catch em' all!
  It's you and me,
  I know it's my destiny!
  Pokemon!
  Oh, you're my best friend,
  In a world we must defend!
  Pokemon!
  Gotta catch em' all!
  (A heart so true,
    Our courage will pull us through!)
    You teach me and I'll teach you,
    Po-ke-mon!
    Gotta catch em' all!
    Gotta catch em' all!
    Po-ke-mon! -Jason Paige`,
    createdAt: new Date(),
          updatedAt: new Date()
  },
  {
  email: 'gary@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Gary',
  pictureURL: 'https://i.imgur.com/7QiOYrG.png',
  biography: 'Smell ya later!',
  createdAt: new Date(),
        updatedAt: new Date()
  },
  {
  email: 'oak@gmail.com',
  hashedPassword: await bcrypt.hash('Passw0rd!', 10),
  screenName:'Oak',
  pictureURL: 'https://i.imgur.com/WZtbiez_d.webp?maxwidth=520&shape=thumb&fidelity=high',
  biography: 'accidentally pc',
  createdAt: new Date(),
        updatedAt: new Date()
  },
])
},

down: (queryInterface, Sequelize) => {
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
