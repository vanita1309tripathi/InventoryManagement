import { body,validationResult } from "express-validator";

const validateForm=async (req,res,next)=>{
 //Another way to validate : installe express-validator

//  Steps: 1. Ceate Rules
 const rules=[
  body('name').notEmpty().withMessage("Name is Required"),
  body('price').isFloat({gt:0}).withMessage("Price shuld be greatr than 0"),
  // body('imgURL').isURL().withMessage("Invalid URL")
 body('imgURL').custom((value,{req})=>{ //value holds req.body.imgURL which is undefined in this case
    if(!req.file){
      throw new Error("Image is required");
    }
    else return true;
  })
 ];
// 2. Run those Rules (Asynchronous operation)
  await Promise.all(rules.map(rule=>rule.run(req)));

//3. Check if there are any errors after running the rules:
  var errors=validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
          return res.render("new-product", { errors:errors.array(), success: false });
        }
  else{
          next();
  }
  //First Way:
  //   const {name, description, price, imgURL}=req.body;
  //   let errors=[];
  //   if (!name || name.trim().length < 3) {
  //       errors.push("The title must be at least 3 characters long.");
  //     }
  //     if (!description || description.trim()=='') {
  //       errors.push("The description should not be empty");
  //     }
  //     if (!price || price<=0) {
  //       errors.push("Price should be greater than 0.0");
  //     }
      
  // try {
  //   new URL(imgURL); // This will throw an error if the URL is invalid
  // } catch (err) {
  //   errors.push("The image URL should be a valid URL.");
  // }
  // console.log("Errors before rendering:", errors);
  //     // If errors exist,
  //     if (errors.length > 0) {
  //       return res.render("new-product", { errors:errors, success: false });
  //     }
  //     else{
  //       next();
  //     }
     
    
}

export default validateForm;