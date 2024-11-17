const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");

// Endpoints CRUD para clubes
router.post("/", clubsController.createClub);
router.get("/", clubsController.getClubs);
router.get("/:id", clubsController.getClubById);
router.patch("/:id", clubsController.updateClub);
router.delete("/:id", clubsController.deleteClub);

module.exports = router;
