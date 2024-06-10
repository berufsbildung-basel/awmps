const db = require("../model")
const config = require("../conig/auth.config")
const User = db.user;
const Role = db.role;

const Op = db.Seequeliez.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// exports.singup = async (req, res) => {
//   // Save User to Database
//   try {
//     const user = await Users.create({
//       username: req.body.username,
//       emai: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 10),
//     });
//   } 
//   catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

exports.signin = async (req, res) => {
  try{
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found"});
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        expiresIn: 86400, // 24 hours
      });
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: true, // make it https
      maxAge: 86400 * 1000, // expire in 24h
      sameSite: 'strict' // Restricts the cookie to same-origin requests
    });
    
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
    });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  exports.signout = async (req, res) => {
    try {
      res.clearCookie("token");

      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
  };