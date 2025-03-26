import path from 'path'
import ProductModel from '../Model/products.model.js'

export default class ProductController{
     getProducts(req,res){
        let products=ProductModel.get();

        res.render("products",{products:products})
        /*When we were not using view engine only model and controller
         let products=ProductModel.get();
        // console.log(products);
        //  return res.sendFile(path.join(path.resolve(),'src','view','products.html'))
        // When you use path.resolve() , it starts resolving from the current working directory (CWD),
        //  which is typically the directory where index.js (or the main server file) is located.
        //  path.resolve() does not refer to index.js itself but to the folder where index.js runs*/
    }
    getAddForm(req,res){
        res.render("new-product",{errors:[]});
    }
    addProduct(req,res,next){
        console.log(req.body);
        
        /*req.body is an object that contains data sent in the body of an HTTP request. 
        This is commonly used in POST, PUT, and PATCH requests where a client sends form data or
         JSON data to the server.
        However, by default, Express does not parse request bodies. */ 
        let products=ProductModel.get();
        const {name, description, price}=req.body;
        const imageURL= "images/"+req.file.filename;
        ProductModel.add(name,description,price,imageURL);
        res.render("products",{products:products});
    }
    getUpdateProduct(req,res,next){
        const id=req.params.id;
        let ProductFound=ProductModel.getID(parseInt(id));
        console.log(ProductFound);
        if(ProductFound){
            res.render('update-product',{product:ProductFound,errors:[]});
        }
        else{
            res.status(401).send("Product Not Found");
        }
    }

    updateProduct(req,res,next){
        const id = parseInt(req.params.id, 10);
    
    console.log("Updating product with ID:", id);
    console.log("Request body:", req.body);

    ProductModel.update(id, req.body);
    let products = ProductModel.get();

    // res.render("products", { products: products }); This was rendering the product page with added /update/:id in the URL so we can't do Delete function 
    res.redirect('/');
    }
    
    deleteProduct(req,res,next){
        const id=req.params.id;
        ProductModel.delete(id);
        let products = ProductModel.get();

    res.render("products", { products: products });
    }

}