const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemcu'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//tampilkan semua data product
app.get('/api/datas',(req, res) => {
  let sql = "SELECT * FROM datas";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//tampilkan data product berdasarkan id
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Tambahkan data product baru
app.post('/api/datas',(req, res) => {
  let data = {mac: req.body.mac, suhu: req.body.suhu, kelembaban: req.body.kelembaban, volt: req.body.volt, amper: req.body.amper, watt: req.body.watt, kwh: req.body.kwh, hertz: req.body.hertz, pff: req.body.pff,};
  let sql = "INSERT INTO datas SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Edit data product berdasarkan id
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete data product berdasarkan id
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});