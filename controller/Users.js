const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const {
//   default: data,
// } = require("../../FE-REMEDIAL/src/data/detailchallenge.js");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  const {
    name,
    email,
    password,
    confPassword,
    role,
    challenge_id,
    status = 0,
  } = req.body;

  const cekUser = await Users.findAll({
    where: { email: req.body.email },
  });

  if (cekUser.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Email sudah pernah terdaftar!",
    });
  }

  if (!name) {
    return res.status(400).json({ message: "Nama tidak boleh kosong!" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email tidak boleh kosong!" });
  }

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password tidak boleh kosong!" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const data = await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      challenge_id: challenge_id,
      status: status,
    });
    res.json({ message: "Register Berhasil", data: data });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email tidak boleh kosong!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password tidak boleh kosong!" });
    }

    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const data = user[0].dataValues;
    const match = await bcrypt.compare(req.body.password, data.password);
    if (!match) return res.status(400).json({ message: "wrong password" });

    const userId = data.id;
    const name0 = data.name;
    const email0 = data.email;
    const accessToken = jwt.sign(
      { userId, name0, email0 },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name0, email0 },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ message: "Berhasil Login!", data: user, token: accessToken });
    // res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "Email Tidak Ditemukan" });
  }
};

const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) {
    //   return res
    //     .status(400)
    //     .json({ message: "Logout gagal!", reason: "Refresh token kosong" });
    // }

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) {
      return res
        .status(400)
        .json({ message: "Logout gagal!", reason: "User tidak ditemukan" });
    }

    const userId = user[0].id;
    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Berhasil Logout!" });
    // return res.sendStatus(200);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Logout gagal!", detail_msg: error.message });
  }
};

module.exports = { getUsers, Register, Login, Logout };
