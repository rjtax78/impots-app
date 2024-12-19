const connectDb = require("../../config/database");


// Obtenir les rendez-vous (optionnel : filtrer par utilisateur ou statut)
exports.getRendezVous = async (req, res) => {
  const { utilisateur_id, statut } = req.query;
  try {
    let query = 'SELECT * FROM rendez_vous';
    const params = [];

    if (utilisateur_id) {
      params.push(utilisateur_id);
      query += ` WHERE utilisateur_id = $${params.length}`;
    }

    if (statut) {
      params.push(statut);
      query += params.length === 1 ? ` WHERE statut = $${params.length}` : ` AND statut = $${params.length}`;
    }

    const result = await connectDb.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un rendez-vous
exports.createRendezVous = async (req, res) => {
  const { utilisateur_id, date_rendez_vous, statut, motif_refus } = req.body;
  try {
    const result = await connectDb.query(
      `INSERT INTO rendez_vous (utilisateur_id, date_rendez_vous, statut, motif_refus)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [utilisateur_id, date_rendez_vous, statut, motif_refus]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un rendez-vous
exports.updateRendezVous = async (req, res) => {
  const { id } = req.params;
  const { date_rendez_vous, statut, motif_refus } = req.body;
  try {
    const result = await connectDb.query(
      `UPDATE rendez_vous
       SET date_rendez_vous = $1, statut = $2, motif_refus = $3, modifie_le = NOW()
       WHERE id = $4 RETURNING *`,
      [date_rendez_vous, statut, motif_refus, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un rendez-vous
exports.deleteRendezVous = async (req, res) => {
  const { id } = req.params;
  try {
    await connectDb.query('DELETE FROM rendez_vous WHERE id = $1', [id]);
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
