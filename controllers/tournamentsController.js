const supabase = require("../supabase");

exports.getTournaments = async (req, res) => {
    const { name, champion } = req.query;
    let query = supabase.from("tournaments").select("*");
    if (name) query = query.ilike("name", `%${name}%`);
    if (champion) query = query.ilike("champion", `%${champion}%`);
    const { data, error } = await query;
    error ? res.status(400).send(error) : res.send(data);
};

// Método para obtener un torneo por ID
exports.getTournamentById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("tournaments").select("*").eq('id', id).single();
    error ? res.status(400).send(error) : res.send(data);
};

// Método para crear un torneo
exports.createTournament = async (req, res) => {
    const { name, champion } = req.body;
    const { data, error } = await supabase.from("tournaments").insert([{ name, champion }]);
    error ? res.status(400).send(error) : res.status(201).send(data);
};

// Método para actualizar un torneo
exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const { name, champion } = req.body;
    const { data, error } = await supabase.from("tournaments").update({ name, champion }).eq('id', id);
    error ? res.status(400).send(error) : res.send(data);
};

// Método para eliminar un torneo
exports.deleteTournament = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from("tournaments").delete().eq('id', id);
    error ? res.status(400).send(error) : res.status(204).send();
};
