const connectDb = require("../../../config/database");

// Obtenir les statistiques des paiements
exports.getPaymentStats = async (req, res) => {
  try {
    const totalPaymentsQuery = "SELECT COUNT(*) FROM paiement";
    const paye = "SELECT COUNT(*) FROM paiement WHERE is_payed=true";
    const nonPaye = "SELECT COUNT(*) FROM paiement WHERE is_payed=false";

    const totalPayments = await connectDb.query(totalPaymentsQuery);
    const isPayed = await connectDb.query(paye);
    const isLate = await connectDb.query(nonPaye);

    res.status(200).json({
      totalPayments: totalPayments.rows[0].count,
      isPayed: isPayed.rows[0].count,
      isLate: isLate.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.payementWithEcheance = async (req, res, next) => {
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
// Obtenir les statistiques des rendez-vous
// exports.getRendezVousStats = async (req, res) => {
//   try {
//     const totalRendezVousQuery = 'SELECT COUNT(*) FROM rendez_vous';
//     const acceptedRendezVousQuery = 'SELECT COUNT(*) FROM rendez_vous WHERE statut = $1';
//     const rejectedRendezVousQuery = 'SELECT COUNT(*) FROM rendez_vous WHERE statut = $2';

//     const totalRendezVous = await connectDb.query(totalRendezVousQuery);
//     const acceptedRendezVous = await connectDb.query(acceptedRendezVousQuery, ['accepte']);
//     const rejectedRendezVous = await connectDb.query(rejectedRendezVousQuery, ['refuse']);

//     res.status(200).json({
//       totalRendezVous: totalRendezVous.rows[0].count,
//       acceptedRendezVous: acceptedRendezVous.rows[0].count,
//       rejectedRendezVous: rejectedRendezVous.rows[0].count
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getNotificationStats = async (req, res) => {
//   try {
//     const totalNotificationsQuery = 'SELECT COUNT(*) FROM notifications';
//     const notificationTypesQuery = `
//       SELECT type, COUNT(*) FROM notifications
//       GROUP BY type
//     `;

//     const totalNotifications = await connectDb.query(totalNotificationsQuery);
//     const notificationTypes = await connectDb.query(notificationTypesQuery);

//     res.status(200).json({
//       totalNotifications: totalNotifications.rows[0].count,
//       types: notificationTypes.rows
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
