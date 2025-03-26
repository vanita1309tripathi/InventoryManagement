export default class ProductModel{
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id=_id;
        this.name=_name;
        this.desc=_desc;
        this.price=_price;
        this.imageURL=_imageUrl;

    }
    static get(){
        return products;
    }
    static add(name,price,description,imgURL){
        let newProduct= new ProductModel(
            products.length + 1,
            name,  
            description,
            price,
            imgURL
        );
        products.push(newProduct);
    }
    static getID(Id){
        return products.find((p)=>p.id==Number(Id));
    }


    static update(Id, productObj) {
        let product = products.find((p) => p.id == Id);
        
        if (!product) {
            console.log("Product not found!");
            return;
        }

        product.name = productObj.name;
        product.desc = productObj.description; 
        product.price = productObj.price;
        product.imageURL = productObj.imgURL; 

        console.log("Updated product:", JSON.stringify(product, null, 2)); // ✅ Properly logs the updated object
    }
    static delete(id) {
        let index = products.findIndex((p) => p.id == id);
    
        if (index === -1) {  // If product not found
            console.log("Product not found!");
            return;
        }
    
        products.splice(index, 1);  // Remove the correct product
        console.log("Product deleted");
    }
    

}


var products=[new ProductModel(1,"Smartphone","Latest model with advanced features",699,"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"),
              new ProductModel(2,"Headphones","Wireless with noise cancellation",199,"https://media.istockphoto.com/id/2158075207/photo/asian-woman-listening-to-music-with-wireless-headphones.webp?a=1&b=1&s=612x612&w=0&k=20&c=UkXxzEcHlD6ZQJ2C8ZwCJltWmbujUtpYzhe9OfDBIl0="),
              new ProductModel(3,"Gaming Laptop","High-performance laptop for gaming",1499,"https://plus.unsplash.com/premium_photo-1681666713677-8bd559bef6bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")   
]