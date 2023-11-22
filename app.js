const express = require('express');
const app = express();
const mysql = require('mysql2');
app.use(express.json());
const fs = require('fs');
const port =3000;

app.get('/', (req, res) => {
  res.send('Hello My World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'football2'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const showTables ="SHOW TABLES";
const changeFrance ="UPDATE teams SET TeamName='France' WHERE TeamID ='3'";
const landQuery ="SELECT * FROM teams WHERE Teamname LIKE '%land%'";
const playersAndCountries ="SELECT teams.TeamID, teams.TeamName, players.playername FROM Teams INNER JOIN players on players.countryID=teams.TeamID";

db.query(showTables, function(error, results, fields){
  console.log(results);
  if (error) {
    throw error;
  }
});

db.query(playersAndCountries, function(error, results, fields){
  console.log(results);
  console.log(playersAndCountries,"executed successfully");
  if (error) {
    throw error;
  }

  fs.writeFile('join.json', JSON.stringify(results), function(err) {
    if (err) throw err;
    console.log('Saved!');

});
});


db.query(changeFrance, function(error, results, fields){
  console.log(results);
  console.log(changeFrance,"executed successfully");
  if (error) {
    throw error;
  }

});




db.query(landQuery, function(error, results, fields){
  console.log(results);
  console.log(landQuery,"executed successfully");
  if (error) throw error;
  
  fs.writeFile('land.json', JSON.stringify(results), function(err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

db.query('SHOW TABLES', function (error, results, fields) {
  if (error) throw error; 
  fs.writeFile('tables.json', JSON.stringify(results), function(err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.get('/tables', function(req, res) {
  res.sendFile(__dirname +'/tables.json');

});

app.get('/land', function(req, res) {
  res.sendFile(__dirname +'/land.json');
});

app.get('/join', function(req, res) {
  res.sendFile(__dirname +'/join.json');
});



