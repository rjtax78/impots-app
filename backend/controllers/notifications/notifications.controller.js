const connectDb = require("../../config/database");

exports.sendNotif = async (req, res, next) => {
  const { userId, typeNotif, msg, recepMail } = req.body;
  if (!userId || !typeNotif || !msg || !recepMail) {
    res.status(401).json({
      success: false,
      message: "Tous les champs sont requis",
    });
  } else {
    const sendNotif = await connectDb.query(
      `INSERT INTO notifications (notif_id,utilisateur_id,type,message,recp_mail) VALUES (DEFAULT,$1, $2, $3,$4) RETURNING *`,
      [userId, typeNotif, msg, recepMail]
    );
    if (sendNotif) {
      res.status(201).json({
        success: true,
        message: "Notification envoye avec succes",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Erreur d'ajout",
      });
    }
  }
};
