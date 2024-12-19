const connectDb = require("../../config/database");

// Obtenir tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
  try {
    const result = await connectDb.query("SELECT * FROM utilisateurs where role = 'contribuable'");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouvel utilisateur
exports.createUtilisateur = async (req, res) => {
  const { nom, prenom, email, telephone, role, mot_de_passe, nif } = req.body;
  // Validation simple
  const rolesValides = ["contribuable", "administrateur"];
  if (!rolesValides.includes(role)) {
    return res.status(400).json({ error: "Role invalide" });
  }
  try {
    const result = await connectDb.query(
      `INSERT INTO utilisateurs (nom, prenom, email, telephone, role, mot_de_passe,nif)
       VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
      [nom, prenom, email, telephone, role, mot_de_passe, nif]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
