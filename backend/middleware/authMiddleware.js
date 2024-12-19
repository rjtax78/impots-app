const jwt = require("jsonwebtoken");
const config = require("../config/secretKey");
const connectDb = require("../config/database");

exports.protect = async (req, res, next) => {
  let token;
  // Vérifiez d'abord dans les cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Vérifiez dans le header Authorization si pas de token dans les cookies
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Non autorisé ! Vous n'êtes pas connecté." });
  }
  try {
    const decoded = jwt.verify(token, config.secretOrPrivateKey);
    const id = decoded.userId;
    req.user = await connectDb.query(
      "SELECT * FROM utilisateur WHERE utilisateur.id_utilisateur = $1",
      [id]
    );
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Non autorisé ! Vous n'êtes pas connecté." });
  }
};

exports.admin = async (req, res, next) => {
  let token;
  // 1. Récupérer le token depuis les cookies ou l'header Authorization
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log("Token récupéré depuis les cookies :", token);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token récupéré depuis l'Authorization header :", token);
  }
  // 2. Si aucun token trouvé, renvoyer une erreur
  if (!token) {
    console.error("Aucun token fourni");
    return res
      .status(401)
      .json({ message: "Non autorisé ! Vous n'êtes pas connecté." });
  }
  try {
    // 3. Décoder le token pour obtenir le payload
    const decoded = jwt.verify(token, config.secretOrPrivateKey);
    console.log("Payload décodé :", decoded);

    const userId = decoded.userId; // Assurez-vous que la clé dans le token est correcte
    if (!userId) {
      console.error("Identifiant utilisateur manquant dans le token");
      return res.status(401).json({ message: "Token invalide ou mal formé." });
    }
    // 4. Vérifier si l'utilisateur existe et récupérer son rôle
    const result = await connectDb.query(
      "SELECT role FROM utilisateur WHERE id_utilisateur = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      console.error("Utilisateur non trouvé pour l'ID :", userId);
      return res
        .status(404)
        .json({ message: "Utilisateur non trouvé dans la base de données." });
    }
    const role = result.rows[0].role;
    console.log("Rôle utilisateur :", role);
    // 5. Vérifier si l'utilisateur est administrateur
    if (role.toLowerCase() !== "administrateur") {
      console.error(
        `Accès refusé : rôle actuel (${role}) n'est pas administrateur`
      );
      return res.status(403).json({
        message: "Accès refusé. Seuls les administrateurs sont autorisés.",
      });
    }
    // 6. Si tout est valide, passer au middleware suivant
    next();
  } catch (error) {
    // 7. Gestion des erreurs de validation du token
    console.error("Erreur lors de la vérification du token :", error.message);
    return res
      .status(401)
      .json({ message: "Non autorisé ! Vous n'êtes pas connecté." });
  }
};
