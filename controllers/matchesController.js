const supabase = require("../supabase");

exports.getMatches = async (req, res) => {
    const { player1_id, player2_id, team1_id, team2_id, tournament_id } = req.query;
    let query = supabase.from("matches").select("*");
    if (player1_id) query = query.eq("player1_id", player1_id);
    if (player2_id) query = query.eq("player2_id", player2_id);
    if (team1_id) query = query.eq("team1_id", team1_id);
    if (team2_id) query = query.eq("team2_id", team2_id);
    if (tournament_id) query = query.eq("tournament_id", tournament_id);
    const { data, error } = await query;
    error ? res.status(400).send(error) : res.send(data);
};

// Método para obtener un partido por ID
exports.getMatchById = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    const { data, error } = await supabase.from("matches").select("*").eq("id", id).single();
    error ? res.status(400).send(error) : res.send(data);
};


// Método para crear un nuevo partido
exports.createMatch = async (req, res) => {
    const { player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result  } = req.body;
    const { data, error } = await supabase.from("matches").insert([{ player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result }]);
    error ? res.status(400).send(error) : res.status(201).send(data);
};

// Método para actualizar un partido existente
exports.updateMatch = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    const { player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result  } = req.body;
    const { data, error } = await supabase.from("matches").update({ player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result }).eq("id", id);
    error ? res.status(400).send(error) : res.send(data);
};

// Método para eliminar un partido
exports.deleteMatch = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    const { data, error } = await supabase.from("matches").delete().eq("id", id);
    error ? res.status(400).send(error) : res.status(204).send();
};

