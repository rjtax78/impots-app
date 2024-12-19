const connectDb = require("../../config/database");
exports.checkRdv = async (req, res, next) => {
  const { nif, objet } = req.body;
  if (nif === "") {
    res.status(401).json({
      success: false,
      message: "Veuiilez saisir votre Numero d'Identification Fiscale",
    });
  } else {
    const getDate = await connectDb.query(
      "SELECT date_echeance FROM echeancier WHERE nif = $1",
      [nif]
    );
    const echeances = getDate.rows;
    if (echeances.length === 0) {
      console.log(`Aucune échéance trouvée pour le NIF : '${nif}'`);
      return;
    }
    // Date actuelle
    const dateActuelle = new Date();

    // Comparer chaque date d'échéance
    echeances.forEach(async (echeance) => {
      const dateEcheance = new Date(echeance.date_echeance);
      let statut;
      let rdv_res;

      if (dateEcheance.getTime() === dateActuelle.getTime()) {
        rdv_res = "Rejeté";
        await connectDb.query(
          `INSERT INTO rendez_vous (id_rendez_vous,nif,objet,statut) VALUES (DEFAULT,$1, $2, $3) RETURNING *`,
          [nif, objet, rdv_res]
        );
        res.status(400).json({
          success: true,
          message: "Rendez-vous non autorise",
        });
        statut = "Échéance aujourd'hui";
      } else if (dateEcheance < dateActuelle) {
        rdv_res = "Rejeté";
        await connectDb.query(
          `INSERT INTO rendez_vous (id_rendez_vous,nif,objet,statut) VALUES (DEFAULT,$1, $2, $3) RETURNING *`,
          [nif, objet, rdv_res]
        );
        res.status(400).json({
          success: true,
          message: "Rendez-vous non autorise",
        });
        statut = "Échéance depassé";
      } else {
        rdv_res = "En attente";
        await connectDb.query(
          `INSERT INTO rendez_vous (id_rendez_vous,nif,objet,statut) VALUES (DEFAULT,$1, $2, $3) RETURNING *`,
          [nif, objet, rdv_res]
        );
        res.status(201).json({
          success: true,
          message: "Demmande accepte, mais en attenete de validation",
        });
        statut = "Échéance à venir";
      }
      console.log(
        `Date d'échéance : ${
          dateEcheance.toISOString().split("T")[0]
        } - Statut : ${statut}`
      );
    });
  }
};
exports.rdvList = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query; // Récupérer la page et la limite depuis la requête
    const offset = (page - 1) * limit; // Calculer l'offset pour SQL

    // Requête SQL avec pagination
    const rdvData = await connectDb.query(
      `SELECT * 
       FROM contributeur 
       INNER JOIN rendez_vous 
       ON contributeur.nif = rendez_vous.nif`
    );

    // Récupérer le nombre total de rendez-vous
    const totalCount = await connectDb.query(
      `SELECT COUNT(*) AS total 
       FROM contributeur 
       INNER JOIN rendez_vous 
       ON contributeur.nif = rendez_vous.nif`
    );

    if (rdvData.rowCount === 0) {
      return res.status(400).json({ message: "Liste vide" });
    }

    res.status(200).json(
      rdvData.rows
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateRdv = async (req, res, next) => {
  const { rdvId } = req.params;
  const { date, statut } = req.body;

  try {
    const result = await connectDb.query(
      "UPDATE rendez_vous SET date_rendez_vous = $1, statut = $2 WHERE id_rendez_vous = $3 RETURNING *",
      [date, statut, rdvId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    res
      .status(200)
      .json({ message: "Mise à jour réussie", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};
exports.rejectRdv = async (req, res, next) => {
  const { rdvId } = req.params;
  const { statut } = req.body;
  try {
    const result = await connectDb.query(
      "UPDATE rendez_vous SET  statut = $1 WHERE id_rendez_vous = $2 RETURNING *",
      [statut, rdvId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    res
      .status(200)
      .json({ message: "Mise à jour réussie", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};
exports.removeRdv = async (req, res, next) => {
  const { rdvId } = req.params;
  try {
    const result = await connectDb.query(
      "DELETE FROM rendez_vous  WHERE id_rendez_vous = $1 RETURNING *",
      [rdvId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    res.status(200).json({ message: "Rendez-vous supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};
