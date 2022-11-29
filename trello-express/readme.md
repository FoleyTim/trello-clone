<H1>Trello Express</H1>


<h2>Setup:</h2>
Make sure you have mongoDB installed </br>
npm i inside this folder</br>
npm run start</br>

<h2> Testing </h2>
  
npm run test</br>
npm run coverage</br>

<h2>Endpoints:</h2>

**Create List** </br>
creates a new empty List in the DB</br>
POST http://localhost:3000/trello/list </br>
body: {</br>
. . . title: String</br>
}</br>
</br>

**Get all Lists**</br>
returns an array of all lists (and their card children)</br>
GET http://localhost:3000/trello/list </br>
</br>

**Create card**</br>
creates a new card in the DB</br>
POST http://localhost:3000/trello/card </br>
body: {</br>
. . . title: String</br>
. . . description: String</br>
. . . listId: String</br>
. . . cardId: String</br>
}</br>
</br>

**Move card**</br>
creates a new card in the DB</br>
PUT http://localhost:3000/trello/card </br>
body: {</br>
...sourceList: Number </br>
...sourceposition: Number </br>
...targetList: Number </br>
...targetPosition: Number </br>
}</br>
</br>

