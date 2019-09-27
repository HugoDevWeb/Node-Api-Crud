const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { connection } = require('./database');
const {pushFile} = require ('./api');
const server = express();
const port = 3000;
server.use(bodyParser.json());
server.use(cors());
const url = `http://localhost:` + port;
const request = require('request');
server.set('view engine', 'ejs');


router.get('/movie/:id', (req, res) => {
    var {id} = req.params;
    connection.query(`SELECT title, created_at FROM apiNodeDB WHERE id=${id}`, (err, results) => {
        if (err) throw err;
        console.log('There the movie you selected :', results);
        res.end(JSON.stringify(results));
        
    })
})

router.get('/movies', (req, res) => {
    connection.query(`SELECT title, created_at FROM apiNodeDB`, (err, results) => {
        pushFile(results)
        .then(messages => res.status(201).json({message: messages}))
        .catch((err)=> res.status(201).json({ message : err}))
        if(err) throw err;
        console.log('There are the movies :', results)
    });
    
});

router.post('/createMovie', (req, res)=> {
    var postData  = req.body;
    connection.query('INSERT INTO apinodedb SET ?', postData, function (error, results) {
      if (error) throw error;
      console.log(postData)
	  res.end(JSON.stringify(results));
	});
});

router.put('/editMovie/:id', (req, res) => {
    const {id} = req.params;
    var putDataTitle = req.body.title;
    var putDataCreatedAt = req.body.created_at;
    
    connection.query(`UPDATE apinodedb SET title= '${putDataTitle}' , created_at= '${putDataCreatedAt}' WHERE id=${id}`, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
});

router.delete('/deleteMovie/:id', (req, res) => {
    const {id} = req.params;
    connection.query(`DELETE FROM apinodedb WHERE id=${id}`, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
})


router.get('/recherche', function(req, res){
    var query = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=aadc1b07';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render('recherche', {data: data});
        }
    });
});

server.use(router)
server.listen(port, () => {
    console.log(`Node server is listening on port ${port} 👉👌`);
});
