const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Importation des routes
const contribRouter = require("./routes/contributeur/contributeur.router");
const impotsRouter = require("./routes/impots/impot.router");
const rdvRouter = require("./routes/rendez-vous/rdv.router");
const paiementRouter = require("./routes/paiements/paiements.router");
const notifRouter = require("./routes/notifications/notifications.router");
const usersRouter = require("./routes/users/users.router");
// routes pour les statistiques
const payementStatsRouter = require("./routes/statistiques/paiements/payementStat.router");
const rdvStatsRouter = require("./routes/statistiques/rendez-vous/rdvStat.router");


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes pour les contributeur
app.use("/api/contributeur", contribRouter);
app.use("/api/impots", impotsRouter);
app.use("/api/paiements", paiementRouter);
app.use("/api/rendezVous", rdvRouter);
app.use("/api/notifications", notifRouter);
app.use("/api/users", usersRouter);
app.use("/api/payementsStat", payementStatsRouter);
app.use("/api/rdvStat", rdvStatsRouter);

module.exports = app;
// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
