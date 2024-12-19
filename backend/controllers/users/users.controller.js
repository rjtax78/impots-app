const connectDb = require("../../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/secretKey");

// Listez tous les utilisateurs
exports.getUsersList = async (req, res, next) => {
  try {
    const users = await connectDb.query("select * from utilisateur");
    // console.log(users.rows == '');
    if (users.rowCount === 0) {
      res.status(400).json({ message: "Aucunn utilisateur inscrit" });
    } else {
      res.status(200).json(users.rows);
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.creatUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    res.status(400).json({ message: "Tous les champs sont requis" });
  } else {
    const userExist = await connectDb.query(
      "select * from utilisateur where utilisateur.email = $1",
      [email]
    );
    if (userExist.rowCount > 0) {
      res.status(404).json({
        success: false,
        message: `L'utulisateur avec l'email  : ${email}  existe deja`,
      });
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      const newUser = await connectDb.query(
        `INSERT INTO utilisateur (id_utilisateur,email,password,role) VALUES (DEFAULT,$1, $2, $3) RETURNING *`,
        [email, passwordHashed, role]
      );
      if (newUser) {
        res.status(201).json(newUser.rows[0]);
      } else {
        res.status(400).json({ message: `Erreur d'ajout` });
      }
    }
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Tous les champs sont requis" });
  } else {
    const getUser = await connectDb.query(
      "select * from utilisateur where utilisateur.email = $1",
      [email]
    );
    if (getUser.rowCount === 0) {
      res.status(400).json({
        message: `Compte introvable`,
      });
    } else {
      const pwd = getUser.rows[0].password;
      if (getUser.rowCount > 0 && bcrypt.compareSync(password, pwd) === true) {
        const token = jwt.sign(
          { userId: getUser.rows[0].id_utilisateur },
          config.secretOrPrivateKey,
          {
            expiresIn: "30d",
          }
        );
        // Cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        getUser.rows[0].role === "administrateur"
          ? res.status(200).json({
              message: "Vous etes connecte en tant qu'administrateur",
              userId: getUser.rows[0].id_utilisateur,
              email: getUser.rows[0].email,
              role: getUser.rows[0].role,
            })
          : res.status(200).json({
              message: "Vous etes connecte en tant que simple contributeur",
              userId: getUser.rows[0].id_utilisateur,
              email: getUser.rows[0].email,
              role: getUser.rows[0].role,
            });
      } else if (
        getUser.rowCount > 0 &&
        getUser.rows[0].password !== password
      ) {
        res.status(400).json({
          message: `Le mot de passe que vous avez saisi est incorrect`,
        });
      } else {
        res.status(400).json({
          message: `L'utilisateur  dont l'email est : ${email} n'existe pas`,
        });
      }
    }
  }
};
exports.lougout = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: `Vous etes deconnecte` });
};
