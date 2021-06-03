![Insert image of splash page here]()
# Animedium
## _Anime based Medium clone_


Animedium is a gathering place for anime characters and enthusiasts alike to share their favorite stories and moments from their favorite animes.

## Features

- Users can create and edit their profiles.
- Users can create and edit their stories.
- Users can comment on each others posts.
- Users can like comments and stories.

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
![Profile edit](images/Animedium-profile-edit-pic.png)


### Users can write and view comments
![Comments 1](images/Animedium-comments-pic-1.png)
![Comments 2](images/Animedium-comments-pic-2.png)

### Users like comments and stories
>* A user can interact with stories they or other users have written by liking the stories, and the same goes for comments. 
>* The comment button is the little star that looks like a dragonball, and we use AJAX to seamlessly make calls to the database so that a user will get the instant gratification of seeing the 'dragonball' light up when they click it. 
![Likes 1](images/Animedium-likes-pic-1.png)
![Likes 3](images/Animedium-likes-pic-3.png)
![Likes 2](images/Animedium-likes-pic-2.png)

## Pushing to Heroku
```
git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```