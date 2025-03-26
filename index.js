import express from 'express'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts';
const server=express();
server.use(express.static("public"));
import ProductController  from './src/Controller/product.controller.js';
import validateForm from './src/Middleware/validation.middleware.js';
import { uploadFile } from './src/Middleware/file-upload.middleware.js';



server.use(express.static('src/view')); //use is a middleware function and express.static is used to serve static files

// Setup view engine or template engine settings:
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','view'))

server.use(ejsLayouts);

//parse form 
server.use(express.urlencoded({extended:true}));


const product =new ProductController();
server.get('/',product.getProducts);
server.get('/new',product.getAddForm);
server.post('/',uploadFile.single('imgURL'),validateForm,product.addProduct);
server.get('/update/:id',product.getUpdateProduct);
server.post('/update/:id',product.updateProduct);
// server.get('/delete/:id',product.deleteProduct);
server.post('/delete/:id',product.deleteProduct);




server.listen(3100,()=>{
    console.log("Server is listening")
});