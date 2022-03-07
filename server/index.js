import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
const app = express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello to ProductList API');
});

app.use("/user", userRouter);
app.use("/products", productRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then( () => app.listen(PORT,() => console.log("server running on port: " + PORT)))
.catch( (error) => console.log(error.message));

//dont get warning in console by below line code
mongoose.set('useFindAndModify', false);

