const connectDb = require("../../config/database");
exports.listImpots = async (req, res, next) => {
  try {
    const impots = await connectDb.query("select * from impot");
    // console.log(impots.rows == '');
    if (impots.rowCount === 0) {
      res.status(400).json({ message: "Aucune impot disponible" });
    } else {
      res.status(200).json(impots.rows);
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.addImpot = async (req, res, next) => {
  const { nom_impot, description, taux } = req.body;
  if (!nom_impot || description === "" || !taux) {
    res.status(401).json({
      success: false,
      message: "Tous les champs sont requis",
    });
  } else {
    const newPartenaire = await connectDb.query(
      `INSERT INTO impot (id_impot,nom_impot,description,taux) VALUES (DEFAULT,$1, $2, $3) RETURNING *`,
      [nom_impot, description, taux]
    );
    if (newPartenaire) {
      res.status(201).json({
        success: true,
        message: "Creation ajoute avec success",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Erreur d'ajout",
      });
    }
  }
};
