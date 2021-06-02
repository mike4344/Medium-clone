![Insert image of splash page here]()
# Animedium
## _Anime based Medium clone_


Animedium is a gathering place for anime characters and enthusiasts alike

## Features

- Users can create and edit their profiles
- Users can create and edit their stories
- Users can comment on each others posts 
- Users can like comments and stories

## Tech

Animedium uses a number of open source projects to work properly:

- Pug -
- Express -
- Sequelize -
- PostgreSQL -

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mike4344/Medium-clone.git
npm install
npm start

```


## Features


### Users can create and edit their story
![Insert image of story creation here]()


### Users can create and edit their profile
![Insert image of profile page here]()


### Users can write and view comments
![Insert image of comments here]()

### Users like comments and stories
![Insert image of likes here]()

## Pushing to Heroku
```
git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```