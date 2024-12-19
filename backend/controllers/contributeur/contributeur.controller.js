const connectDb = require("../../config/database");
exports.listContributeur = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Récupérer le total des contributeurs
    const totalQuery = await connectDb.query(
      "SELECT COUNT(*) FROM contributeur"
    );
    const total = parseInt(totalQuery.rows[0].count, 10);

    const contributeurs = await connectDb.query(
      "SELECT * FROM contributeur ORDER BY id_contrib LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    // console.log(contributeurs.rows == '');
    if (contributeurs.rowCount === 0) {
      res.status(400).json({ message: "Aucune contributeur disponible" });
    } else {
      res.status(200).json({
        data: contributeurs.rows,
        total, // Nombre total de contributeurs
        page: parseInt(page, 10), // Page actuelle
        totalPages: Math.ceil(total / limit), // Nombre total de pages
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.filterListContrib = async (req, res, next) => {
  const param = req.params.value;

  try {
    const contributeurs = await connectDb.query("SELECT * FROM contributeur ");
    if (contributeurs.rowCount === 0) {
      res.status(400).json({ message: "Aucune contributeur disponible" });
    } else {
      res.status(200).json(contributeurs.rows);
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.addContrib = async (req, res, next) => {
  const {
    nif,
    nom,
    adresse,
    telephone,
    email,
    type_contribuable,
    id_impot,
    base_imposable,
  } = req.body;
  if (
    nif === "" ||
    nom === "" ||
    adresse === "" ||
    telephone === "" ||
    email === "" ||
    type_contribuable === "" ||
    id_impot === "" ||
    base_imposable == ""
  ) {
    res.status(401).json({
      success: false,
      message: "Tous les champs sont requis",
    });
  } else {
    const exist = await connectDb.query(
      `select * from contributeur where contributeur.nif = '${nif}'`
    );
    if (exist.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: `La personne dont la NIF est : ${nif} existe deja dans la liste`,
      });
    } else {
      const impot = await connectDb.query(
        "SELECT taux FROM impot WHERE id_impot = $1",
        [id_impot]
      );
      let daysToAdd = 30;
      const today = new Date();
      const echeance = new Date();
      echeance.setDate(today.getDate() + daysToAdd);
      const date_echeance = echeance.toISOString().split("T")[0];
      const taux = parseInt(impot.rows[0].taux);
      const montant_du = (base_imposable * (taux / 100)).toFixed(2);
      let status = "en attente";
      // console.log(date_echeance);
      const newContributeur = await connectDb.query(
        `INSERT INTO contributeur (id_contrib,nif,nom,adresse,telephone,email,type_contribuable,base_imposable) VALUES (DEFAULT,$1, $2, $3, $4, $5, $6,$7) RETURNING *`,
        [nif, nom, adresse, telephone, email, type_contribuable, base_imposable]
      );
      if (newContributeur) {
        const paiements = connectDb.query(
          `INSERT INTO paiement (id_paiement, nif, id_impot, montant) VALUES (DEFAULT,$1, $2, $3)
          `,
          [nif, id_impot, montant_du]
        );
        if (paiements) {
          const echeancier = connectDb.query(
            `INSERT INTO echeancier (id_echeance,nif, date_echeance, status) VALUES (DEFAULT,$1, $2, $3)
          `,
            [nif, date_echeance, status]
          );
          echeancier
            ? res
                .status(201)
                .json({ message: "Contributeur créé avec echeancier" })
            : res.status(400).json({ message: "misy erreur lty aa" });
        } else {
          res.status(400).json({
            success: true,
            message: "Erreur paiments",
          });
        }
        // paiements
        //   ? res
        //       .status(201)
        //       .json({ message: "Contributeur créé avec echeancier" })
        //   : res.status(400).json({ message: "misy erreur lty aa" });
      } else {
        res.status(400).json({
          success: true,
          message: "Erreur d'ajout",
        });
      }
    }
  }
};
