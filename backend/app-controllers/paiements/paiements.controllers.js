const connectDb = require("../../config/database");

// Obtenir les paiements d'un utilisateur
exports.getPaiements = async (req, res) => {
  const { utilisateur_id } = req.query;
  try {
    const result = await connectDb.query(
      "SELECT * FROM paiements WHERE utilisateur_id = $1",
      [utilisateur_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un paiement
exports.createPaiement = async (req, res) => {
  const { utilisateur_id, annee, montant, statut, date_paiement } = req.body;
  try {
    const result = await connectDb.query(
      `INSERT INTO paiements (utilisateur_id, annee, montant, statut, date_paiement)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [utilisateur_id, annee, montant, statut, date_paiement]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
