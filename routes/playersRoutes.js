const express = require("express");
const router = express.Router();
const playersController = require("../controllers/playersController");

// Definir los endpoints para jugadores
router.post("/", playersController.createPlayer);
router.get("/", playersController.getPlayers);
router.get("/:id", playersController.getPlayerById);
router.patch("/:id", playersController.updatePlayer);
router.delete("/:id", playersController.deletePlayer);

module.exports = router;
