import Product from '../models/product.js';
import moment from 'moment';
export const SearchByProducts = async (req, res) => {
  if(!req.userId){
    return res.status(404).json({ message: "UnAuthorized Access.Session expired,please login again" });
  }
  console.log("request query :", req.query)
  const name = req.query.name || '';
  //const isExpire = req.query.isExpire==='true'?true :false;
  const min =
    req.query.minPrice && Number(req.query.minPrice) !== 0 ? Number(req.query.minPrice) : 0;
  const max =
    req.query.maxPrice && Number(req.query.maxPrice) !== 0 ? Number(req.query.maxPrice) : 9999999;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const isExpireFilter = req.query.isExpire === 'true' ? { isExpire: false } : {};
  const priceFilter = min || max ? { Price: { $gte: min, $lte: max } } : {};

  const products = await Product.find({
    ...nameFilter,
    ...priceFilter,
    ...isExpireFilter,
  })
  let recordData;
  if ((req.query.SearchBy !== null || req.query.SearchBy !== "") && products.length > 0) {
    recordData = products.filter(x => (moment(new Date(x.ExpiryDate)).format("YYYY-MM-DD") <= moment(new Date(req.query.SearchBy)).format("YYYY-MM-DD")))
    console.log("record:", recordData)
  }
  else {
    recordData = products;
    console.log("product:", recordData)
  }

  res.send({ response: recordData })
};

export const ViewAllProducts = async (req, res) => {
  if(!req.userId){
    return res.status(404).json({ message: "UnAuthorized Access.Session expired,please login again" });
  }
  try {
    const products = await Product.find({})
    console.log(products)
    res.send({ response: products });
  } catch (error) {
    res.send(error)
  }

};
  