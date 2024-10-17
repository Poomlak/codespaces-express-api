const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');

var mysql = require('mysql');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE"
  );
  next();
});



// let products=[
//   {id:0,name:"Notebook AcerSwift",price:45900,img:"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
//   {id:1,name:"Notebook AsusVivo",price:19900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
//   {id:2,name:"Notebook LenovoIdeapad",price:32900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
//   {id:3,name:"Notebook MSIPrestige",price:54900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
//   {id:4,name:"Notebook DELLXPS",price:99900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
//   {id:5,name:"Notebook HPEnvy",price:46900,img:"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}];

var con = mysql.createConnection({
  host: "korawit.ddns.net",
  user: "webapp",
  password: "secret2024",
  port: "3307",
  database: "shop"
});
con.connect(function (err) {
  if (err) throw err;
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw res.status(400).send('Not found any products');
    console.log(result);
    res.send(result);
  })
});

app.get('/api/products/:id', function (req, res) {
  const id = req.params.id;
  con.query("SELECT * FROM products where id=" + id, function (err, result, fields) {
    if (err) throw err;
    let products = result;
    if (products.length > 0) {
      res.send(products);
    }
    else {
      res.status(400).send('Not found product for' + id);
    }
    console.log(result);
  });
});

app.post('/api/addproduct', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  console.log(name, price, img);
  con.query(`INSERT INTO products(name,price,img) VALUES('${name}','${price}','${img}')`);
  if (err) throw res.status(400).send('Error cannot add products');
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
});

app.delete('/api/delproduct/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  con.query("DELETE FROM products where id=" + id, function (err, result, fields) {
    if (err) throw res.status(400).send('Error cannot add products');
    con.query("SELECT * FROM products", function (err, result, fields) {
      if (err) throw res.status(400).send("No Product found");
      console.log(result);
      res.send({ products: result, status: "ok" });
    });
  });
});

app.put('/api/putproduct/:id', function (req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  var sql = `UPDATE products SET name = '${name}',price='${price}' WHERE id =${id}`;
  console.log(sql)
  con.query(sql, function (err, result) {
    if (err) throw res.status(400).send("Error cannot update products");
    con.query("SELECT * FROM product", function (err, result, fields) {
      if (err) throw res.status(400).send("No Product update");
      console.log(result);
      res.send({ products: result, status: "ok" });
    });
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
