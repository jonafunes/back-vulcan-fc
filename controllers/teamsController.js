const supabase = require("../supabase");

exports.createTeam = async (req, res) => {
  const { player1_id, player2_id } = req.body;

  // Comprobar si ya existe un equipo con los mismos jugadores
  const { data: existingTeam, error: checkError } = await supabase
    .from("teams")
    .select("*")
    .or(`(player1_id.eq.${player1_id},player2_id.eq.${player2_id}), (player1_id.eq.${player2_id},player2_id.eq.${player1_id})`)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // Error distinto al "no rows found"
    return res.status(500).json({ error: checkError.message });
  }

  if (existingTeam) {
    return res.status(400).json({ error: "El equipo ya existe" });
  }

  // Insertar el nuevo equipo
  const { data, error } = await supabase
    .from("teams")
    .insert({ player1_id, player2_id });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "Team creado", data });
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
  const { player1_id, player2_id } = req.body;
  const { data, error } = await supabase.from("teams").update({ player1_id, player2_id }).eq("id", id);
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
