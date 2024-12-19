const connectDb = require("../../config/database");
exports.listPaiements = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Récupérer le total des contributeurs
    const totalQuery = await connectDb.query("SELECT COUNT(*) FROM paiement");
    const total = parseInt(totalQuery.rows[0].count, 10);
    const paiements = await connectDb.query(
      "SELECT * FROM paiement JOIN contributeur ON paiement.nif = contributeur.nif JOIN echeancier ON echeancier.nif = contributeur.nif JOIN impot ON paiement.id_impot = impot.id_impot ORDER BY id_paiement LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    // console.log(paiements.rows == '');
    if (paiements.rowCount === 0) {
      res.status(400).json({ message: "Acun paye effectue pour le moment" });
    } else {
      res.status(200).json({
        data: paiements.rows,
        total, // Nombre total de contributeurs
        page: parseInt(page, 10), // Page actuelle
        totalPages: Math.ceil(total / limit), // Nombre total de pages
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
