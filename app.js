require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const playersRoutes = require("./routes/playersRoutes");
const matchesRoutes = require("./routes/matchesRoutes");
const tournamentsRoutes = require("./routes/tournamentsRoutes");
const statsRoutes = require("./routes/statsRoutes");
const teamsRoutes = require("./routes/teamsRoutes");
const clubsRoutes = require("./routes/clubsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use("/players", playersRoutes);
app.use("/teams", teamsRoutes);
app.use("/matches", matchesRoutes);
app.use("/tournaments", tournamentsRoutes);
app.use("/stats", statsRoutes);
app.use("/club", clubsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
