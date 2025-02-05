const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");

// Definir los endpoints para parejas
router.post("/", teamsController.createTeam);
router.get("/", teamsController.getTeams);
router.get("/:id", teamsController.getTeamById);
router.patch("/:id", teamsController.updateTeam);
router.delete("/:id", teamsController.deleteTeam);

module.exports = router;
