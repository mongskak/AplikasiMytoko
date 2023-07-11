import Products from "../models/Products.js";

export const getProducts = async (req, res) => {
  const response = await Products.findAll();
  res.json(response);
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const response = await Products.findOne({
    where: { id: id },
  });
  res.json(response);
};

export const createProduct = async (req, res) => {
  const { name, description, stock, price, img } = req.body;
  await Products.create({
    name: name,
    description: description,
    stock: stock,
    price: price,
    img: img,
  });
  res.json({ msg: "product created successfully" });
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, stock, price, img } = req.body;
  await Products.update(
    {
      name: name,
      description: description,
      stock: stock,
      price: price,
      img: img,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.json({ msg: "product updated successfully" });
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Products.destroy({
    where: { id: id },
  });
  res.json({ msg: "Product deleted successfully" });
};
