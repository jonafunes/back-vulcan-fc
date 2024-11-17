const express = require("express");
const { getTournaments, getTournamentById, createTournament, updateTournament, deleteTournament } = require("../controllers/tournamentsController");

const router = express.Router();

router.get("/", getTournaments);
router.get("/", createTournament);
router.get("/:id", getTournamentById);
router.patch("/:id", updateTournament);
router.delete("/:id", deleteTournament);

module.exports = router;
