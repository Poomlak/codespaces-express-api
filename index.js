const express = require('express')
const app = express()
const port = 5000
const bodyParser =require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
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


app.use(express.json());
let products=[
  {id:0,name:"Notebook AcerSwift",price:45900,img:"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
  {id:1,name:"Notebook AsusVivo",price:19900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
  {id:2,name:"Notebook LenovoIdeapad",price:32900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
  {id:3,name:"Notebook MSIPrestige",price:54900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
  {id:4,name:"Notebook DELLXPS",price:99900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
  {id:5,name:"Notebook HPEnvy",price:46900,img:"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}];


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products',(req,res)=>{
  if(products.length>0)
    res.send(products);
  else
    res.status(400).send("No product founds");
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
