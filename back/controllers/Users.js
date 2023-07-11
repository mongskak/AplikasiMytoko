import Users from "../models/userModels.js";

export const getUsers = async (req, res) => {
  const response = await Users.findAll();
  res.json(response);
};
export const getUserBtId = async (req, res) => {
  const response = await Users.findOne({
    where: { id: req.params.id },
  });
  if (!response) return res.sendStatus(404);
  res.json(response);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const response = await Users.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ msg: "created successfully" });
  } catch (error) {
    res.sendStatus(403);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await Users.findOne({
    where: { email: email, password: password },
  });
  if (!response)
    return res.status(404).json({ msg: "user not found, please register!" });
  res.cookie("user_id", response.id, {
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ msg: "login success" });
};

export const logout = async (req, res) => {
  res.clearCookie("user_id");
  res.json({ msg: "logout success" });
};
