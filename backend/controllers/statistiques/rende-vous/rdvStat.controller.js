const connectDb = require("../../../config/database");

exports.getRdvStats = async (req, res) => {
  try {
    const totalRdvQuery = "SELECT COUNT(*) FROM rendez_vous";
    const isAccepted = "SELECT COUNT(*) FROM rendez_vous WHERE statut='Accepté'";
    const isRefused = "SELECT COUNT(*) FROM rendez_vous WHERE statut='Rejeté'";
    const isPending = "SELECT COUNT(*) FROM rendez_vous WHERE statut='En attente'";

    const totalRdv = await connectDb.query(totalRdvQuery);
    const accepted = await connectDb.query(isAccepted);
    const refused = await connectDb.query(isRefused);
    const pending = await connectDb.query(isPending);

    res.status(200).json({
      totalRdv: totalRdv.rows[0].count,
      accepted: accepted.rows[0].count,
      refused: refused.rows[0].count,
      pending: pending.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
