import express from "express";
import auth from "../middleware/auth.js";
import { SearchByProducts ,ViewAllProducts} from "../controllers/product.js";
const router = express.Router();

router.get("/ViewProducts",auth, SearchByProducts);
router.get("/ViewAllProducts",auth, ViewAllProducts);

export default router;