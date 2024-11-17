const supabase = require("../supabase");

// Crear pareja
exports.createTeam = async (req, res) => {
  const { player1, player2 } = req.body;
  const { data, error } = await supabase.from("teams").insert({ player1, player2 });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Team creado" });
};

// Leer todas las parejas
exports.getTeams = async (req, res) => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Leer pareja por ID
exports.getTeamById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("teams").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error: "Pareja no encontrada" });
  res.json(data);
};

// Actualizar pareja
exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { player1, player2 } = req.body;
  const { data, error } = await supabase.from("teams").update({ player1, player2 }).eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Team actualizado" });
};

// Eliminar pareja
exports.deleteTeam = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("teams").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Pareja eliminada", data });
};
