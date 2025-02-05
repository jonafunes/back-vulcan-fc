const express = require("express");
const { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } = require("../controllers/matchesController");

const router = express.Router();

router.get("/", getMatches);
router.post("/", createMatch);
router.get("/:id", getMatchById);
router.patch("/:id", updateMatch);
router.delete("/:id", deleteMatch);

module.exports = router;
