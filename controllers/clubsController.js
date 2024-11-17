const supabase = require("../supabase");

// Crear un club
exports.createClub = async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from("clubs").insert({ name });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Club creado" });
};

// Obtener todos los clubes
exports.getClubs = async (req, res) => {
  const { name } = req.query;
  const query = supabase.from("clubs").select("*");
  if (name) query.ilike("name", `%${name}%`);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Obtener un club por ID
exports.getClubById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("clubs").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error: "Club no encontrado" });
  res.json(data);
};

// Actualizar un club
exports.updateClub = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { data, error } = await supabase.from("clubs").update({ name }).eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Club actualizado", data });
};

// Eliminar un club
exports.deleteClub = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("clubs").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Club eliminado", data });
};
