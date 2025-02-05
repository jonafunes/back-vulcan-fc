const supabase = require("../supabase");

// Crear jugador
exports.createPlayer = async (req, res) => {
  const { name } = req.body;

  // Comprobar si el jugador ya existe
  const { data: existingPlayer, error: checkError } = await supabase
    .from("players")
    .select("*")
    .eq("name", name)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // Error distinto al "no rows found"
    return res.status(500).json({ error: checkError.message });
  }

  if (existingPlayer) {
    return res.status(400).json({ error: "El jugador ya existe" });
  }

  // Insertar el nuevo jugador
  const { data, error } = await supabase
    .from("players")
    .insert({ name });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "Jugador creado", data });
};


// Leer todos los jugadores
exports.getPlayers = async (req, res) => {
  const { name } = req.query;
  const query = supabase.from("players").select("*");
  if (name) query.ilike("name", `%${name}%`);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Leer jugador por ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("players").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error: "Jugador no encontrado" });
  res.json(data);
};

// Actualizar jugador
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { data, error } = await supabase.from("players").update({ name }).eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Eliminar jugador
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("players").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Jugador eliminado", data });
};
