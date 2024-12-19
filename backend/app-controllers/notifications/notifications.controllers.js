const connectDb = require("../../config/database");

// Obtenir les notifications (optionnel : filtrer par utilisateur ou type)
exports.getNotifications = async (req, res) => {
  const { utilisateur_id, type } = req.query;
  try {
    let query = "SELECT * FROM notifications";
    const params = [];

    if (utilisateur_id) {
      params.push(utilisateur_id);
      query += ` WHERE utilisateur_id = $${params.length}`;
    }

    if (type) {
      params.push(type);
      query +=
        params.length === 1
          ? ` WHERE type = $${params.length}`
          : ` AND type = $${params.length}`;
    }

    const result = await connectDb.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une notification
exports.createNotification = async (req, res) => {
  const { utilisateur_id, type, message } = req.body;
  try {
    const result = await connectDb.query(
      `INSERT INTO notifications (utilisateur_id, type, message)
       VALUES ($1, $2, $3) RETURNING *`,
      [utilisateur_id, type, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
