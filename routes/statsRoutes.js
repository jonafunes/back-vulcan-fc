const express = require("express");
const { getStats, createStat, updateTournament, deleteStat} = require("../controllers/statsController");

const router = express.Router();

router.get("/", getStats);
router.post("/", createStat);
router.patch("/:id", updateTournament);
router.delete("/:id", deleteStat);

module.exports = router;
