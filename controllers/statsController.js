const supabase = require("../supabase");

exports.getStats = async (req, res) => {
    const { player_id, team_id } = req.query;
    let query = supabase.from("stats").select("*");
    if (player_id) query = query.eq("player_id", player_id);
    if (team_id) query = query.eq("team_id", team_id);
    const { data, error } = await query;
    error ? res.status(400).send(error) : res.send(data);
};

// Método para crear un torneo
exports.createStat = async (req, res) => {
    const { player_id, team_id, goals_for, matches_played, matches_won, matches_drawn, matches_lost, tournaments_played, tournaments_won } = req.body;
    const { data, error } = await supabase.from("stats").insert([{ player_id, team_id, goals_for, matches_played, matches_won, matches_drawn, matches_lost, tournaments_played, tournaments_won }]);
    error ? res.status(400).send(error) : res.status(201).send({message: "Estadistica creada"});
};

// Método para actualizar un torneo
exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const { player_id, team_id, goals_for, matches_played, matches_won, matches_drawn, matches_lost, tournament_played, tournament_won } = req.body;
    const { data, error } = await supabase.from("stats").update([{ player_id, team_id, goals_for, matches_played, matches_won, matches_drawn, matches_lost, tournaments_played, tournaments_won }]).eq('id', id);
    error ? res.status(400).send(error) : res.send({message: "Estadistica actualizada"});
};

// Método para eliminar un torneo
exports.deleteStat = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("stats").delete().eq('id', id);
     error ? res.status(400).send(error) : res.status(204).send({message: "Estadistica eliminada"});
};

