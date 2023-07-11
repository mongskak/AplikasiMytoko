import Express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/Products.js";
import {
  getUsers,
  createUser,
  login,
  logout,
  getUserBtId,
} from "../controllers/Users.js";

const router = Express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/user/:id", getUserBtId);
router.post("/login", login);
router.delete("/logout", logout);

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post("/products", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
