const express = require('express');
var cors = require('cors');
var multer = require('multer');
const app = express();
const port = 4000;
var mysql = require('mysql');
const fileUpload = require("express-fileupload");
const path = require("path");
const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
app.use(cors());

app.use(express.json());
app.use(express.static('files'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

   // Foglalt-e az időpont
    app.post('/FoglaltE', (req, res) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'fodraszat'
        });
        connection.connect();
        connection.query(`SELECT idopontok.ora, idopontok.nap, idopontok.honap FROM idopontok WHERE idopontok.ora='${req.body.ora}' AND idopontok.nap='${req.body.nap}' AND idopontok.honap='${req.body.honap}';`, function (err, rows) {
            if (err) throw err
            
            res.send(rows);
        });
        connection.end();
    });



//Idopontfeltoltés
app.post('/datumFel', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`INSERT INTO idopontok VALUES (NULL, '${req.body.ora}', '${req.body.nap}', '${req.body.honap}')`,
        function (err, rows, fields) {
            if (err) throw err
            //console.log(`Regisztráció check: ${rows}`);
            res.send("Sikerült az időpontfoglalás!");
        });
    connection.end();
});

//Idopont törlése admin részére
app.post('/datumTorles', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`DELETE FROM idopontok WHERE idopontok.ora='${req.body.ora}' AND idopontok.nap='${req.body.nap}' AND idopontok.honap='${req.body.honap}';`,
        function (err, rows, fields) {
            if (err) throw err
            res.send("Sikeres időpont törlés!");
        });
    connection.end();
});

// foglalt időpontok kiíratása  
app.get('/foglalt', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fodraszat'
    })  
    connection.connect()  
    connection.query("select * from idopontok", function (err, rows, fields) {
      if (err) throw err     
      res.send(rows);
    })   
    connection.end()
   })

//Már foglalt felhasználói nevek lekérdezése
app.post('/felhasznaloLetezikE', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`SELECT felhasznalok.felhasznalo FROM felhasznalok WHERE felhasznalok.felhasznalo='${req.body.user}'`, function (err, rows) {
        if (err) throw err
        //console.log(`Felhasználó check: ${rows}`)
        res.send(rows);
    });
    connection.end();
});

//Regisztráció
app.post('/regisztracio', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`INSERT INTO felhasznalok VALUES (NULL, '${req.body.user}', '${req.body.jelszo}', '0', '0')`,
        function (err, rows, fields) {
            if (err) throw err
            //console.log(`Regisztráció check: ${rows}`);
            res.send("Sikerült a regisztráció!");
        });
    connection.end();
});


//Kép törlése admin részére
app.post('/keptorles', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    //console.log(req.body.felhasznalo);
    connection.connect();
    connection.query(`DELETE FROM kepek WHERE kepek.kepnev ='${req.body.kep}'`,
        function (err, rows) {
            if (err) throw err
            res.send("Sikeres törlés!");
        });
    connection.end();
});

//Felhasználó törlése
app.post('/felhasznaloTorlese', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`DELETE FROM felhasznalok WHERE felhasznalok.felhasznalo = '${req.body.felhasznaloinev}'`,
        function (err, rows, fields) {
            if (err) throw err
            //console.log(`user: ${req.body.felhasznaloinev}, jelszo: ${req.body.jelszo}`);
            res.send("Sikeres törlés!");
        });
    connection.end();
});

//User ellenőrzése bejelentkezéshez
app.post('/felhasznaloHelyesE', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`SELECT felhasznalok.felhasznalo, felhasznalok.jelszo FROM felhasznalok WHERE felhasznalok.jelszo='${req.body.jelszo}' AND felhasznalok.felhasznalo='${req.body.felhasznalo}'`,
        function (err, rows) {
            if (err) throw err
            //console.log(`felhasználó: ${rows[0].felhasznalo}, jelszó: ${rows[0].jelszo}`);
            res.send(rows);
        });
    connection.end();
});

//Felhasználó be van-e jelentkezve módosítása
app.post('/felhasznaloLogUpdate', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`UPDATE felhasznalok SET bejelentkezve = '1' WHERE felhasznalok.felhasznalo = '${req.body.felhasznalo}' AND felhasznalok.jelszo = '${req.body.jelszo}'`,
        function (err, rows, fields) {
            if (err) throw err
            res.send(rows);
        });
    connection.end();
});
//bejelentkezett felhasználó
app.get('/bejelentkezve', (req, res) => {
 
    //console.log(req.body.bevitel1);
  
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fodraszat'
    })
    
    connection.connect()
    
    connection.query("select * from felhasznalok where bejelentkezve=1 ", function (err, rows, fields) {
      if (err) throw err
        
      res.send(rows);
  
    })
    
    connection.end()
   })
   // Admin bejelntkezése nem joN
   app.get('/rang', (req, res) => {
 
    //console.log(req.body.bevitel1);
  
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fodraszat'
    })
    
    connection.connect()
    
    connection.query("select * from felhasznalok where rang=1", function (err, rows, fields) {
      if (err) throw err
        
      res.send(rows);
  
    })
    
    connection.end()
   })

//Ki van bejelentkezve
app.post('/whoIs', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    connection.connect();
    connection.query(`SELECT felhasznalok.felhasznalo FROM felhasznalok WHERE felhasznalok.bejelentkezve='1'`, function (err, rows) {
        if (err) throw err
        //console.log(`Felhasználó check: ${rows}`)
        res.send(rows);
    });
    connection.end();
});

//Logout
app.post('/kijelentkezes', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    //console.log(req.body.felhasznalo);
    connection.connect();
    connection.query(`UPDATE felhasznalok SET bejelentkezve = '0' WHERE felhasznalok.felhasznalo = '${req.body.felhasznalo}'`,
        function (err, rows) {
            if (err) throw err
            res.send(rows);
        });
    connection.end();
});
// kepfeltoltes
app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
                console.log(files[key].name)
            })
        })
        res.header("Acces-Control-Allow-Origin","*")
        return res.status(200).json({message: "Sikeres feltöltés!"})
    }
)
//kepfeltoltés 2
app.post('/kepnev', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fodraszat'
    });
    //console.log(req.body.felhasznalo);
    connection.connect();
    connection.query(`INSERT INTO kepek VALUES (NULL, '${req.body.kep}')`,
        function (err, rows) {
            if (err) throw err
            res.send("Sikeres feltöltés!");
        });
    connection.end();
});

// képek lekérdezése
app.get('/kepek', (req, res) => {
 
    //console.log(req.body.bevitel1);
  
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fodraszat'
    })
    
    connection.connect()
    
    connection.query("select * from kepek", function (err, rows, fields) {
      if (err) throw err
        
      res.send(rows);
  
    })
    
    connection.end()
   })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});