import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      isExpire: { type:Boolean, required: true ,default:true},
      ExpiryDate: { type: String, required: true },
      Price: { type: Number, required: true },
      DiscountPrice: { type: Number, required: true },      
      image: { type: String, required: true },
      
    }
  );
  const Product = mongoose.model('Product', productSchema);
  
  export default Product;