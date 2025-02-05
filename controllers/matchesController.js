const supabase = require("../supabase");

exports.getMatches = async (req, res) => {
    try {
        let query = supabase
            .from("matches")
            .select(`
                *
            `);

        const { data, error } = await query;

        console.log(data)

        error ? res.status(400).send(error) : res.send(data);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error al obtener los partidos"
        });
    }
};

// Método para obtener un partido por ID
exports.getMatchById = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    const { data, error } = await supabase.from("matches").select("*").eq("id", id).single();
    error ? res.status(400).send(error) : res.send(data);
};


// Método para crear un nuevo partido
exports.createMatch = async (req, res) => {
    const { team1, team2, topScorer, topAssistances, mvp } = req.body;

    const top_scorer = topScorer
    const top_assistances = topAssistances

    // Sumar los goles de todos los jugadores de team1
    const totalGoalsTeam1 = team1.players.reduce((total, player) => total + player.goals, 0);
    // Sumar los goles de todos los jugadores de team2
    const totalGoalsTeam2 = team2.players.reduce((total, player) => total + player.goals, 0);

    // Determinar el resultado del partido
    let result;
    if (totalGoalsTeam1 > totalGoalsTeam2) {
        result = 'team1'; // team1 ganó
    } else if (totalGoalsTeam1 < totalGoalsTeam2) {
        result = 'team2'; // team2 ganó
    } else {
        result = 'draw'; // empate
    }


    const players1 = await Promise.all(team1.players.map(async player => {
        const { data: playerData, error: playerError } = await supabase.from("players").select("*").eq("id", player.id).single();
        if (playerError || !playerData) {
            // Si el jugador no existe, lo creamos
            const newPlayer = {
                id: player.id,
                name: player.name,
                goals: player.goals,
                assists: player.assists,
                saves: player.saves,
                top_scores: 0,
                top_assistances: 0,
                mvp: 0,
                matches_played: 1,
                matches_won: result === 'team1' ? 1 : 0,
                matches_tied: result === 'draw' ? 1 : 0,
                matches_losses: result === 'team2' ? 1 : 0
            };
            // Validar si el jugador es el top scorer, top assistances o MVP
            if (player.id === topScorer.id) {
                newPlayer.top_scores += 1; // Incrementar el contador de top_scorer
            }
            if (player.id === topAssistances.id) {
                newPlayer.top_assistances += 1; // Incrementar el contador de top_assistances
            }
            if (player.id === mvp.id) {
                newPlayer.mvp += 1; // Incrementar el contador de MVP
            }
            const { data: createdPlayer, error: createError } = await supabase.from("players").insert([newPlayer]);
            if (createError) {
                throw new Error(`Error al crear el jugador con ID ${player.id}: ${createError.message}`);
            }
            return createdPlayer; // Retornamos el jugador creado
        }
        // Si el jugador existe, sumamos sus estadísticas
        const newDataPlayer = {
            id: playerData.id,
            name: playerData.name,
            goals: playerData.goals + player.goals,
            assists: playerData.assists + player.assists,
            saves: playerData.saves + player.saves,
            top_scores: playerData.top_scores + (player.id === topScorer.id ? 1 : 0),
            top_assistances: playerData.top_assistances + (player.id === topAssistances.id ? 1 : 0),
            mvp: playerData.mvp + (player.id === mvp.id ? 1 : 0),
            matches_played: playerData.matches_played + 1,
            matches_won: playerData.matches_won + (result === 'team1' ? 1 : 0),
            matches_tied: playerData.matches_tied + (result === 'draw' ? 1 : 0),
            matches_losses: playerData.matches_losses + (result === 'team2' ? 1 : 0)
        }
        const { data: addData, error: addDataError } = await supabase.from("players").update(newDataPlayer).eq("id", player.id);
        if (addDataError) {
            throw new Error(`Error al agregar data del jugador con ID ${player.id}: ${addDataError.message}`);
        }
        return addData;
    }));

    const players2 = await Promise.all(team2.players.map(async player => {
        const { data: playerData, error: playerError } = await supabase.from("players").select("*").eq("id", player.id).single();
        if (playerError || !playerData) {
            // Si el jugador no existe, lo creamos
            const newPlayer = {
                id: player.id,
                name: player.name,
                goals: player.goals,
                assists: player.assists,
                saves: player.saves,
                top_scores: 0,
                top_assistances: 0,
                mvp: 0,
                matches_played: 1,
                matches_won: result === 'team2' ? 1 : 0,
                matches_tied: result === 'draw' ? 1 : 0,
                matches_losses: result === 'team1' ? 1 : 0
            };
            // Validar si el jugador es el top scorer, top assistances o MVP
            if (player.id === topScorer.id) {
                newPlayer.top_scores += 1; // Incrementar el contador de top_scorer
            }
            if (player.id === topAssistances.id) {
                newPlayer.top_assistances += 1; // Incrementar el contador de top_assistances
            }
            if (player.id === mvp.id) {
                newPlayer.mvp += 1; // Incrementar el contador de MVP
            }
            const { data: createdPlayer, error: createError } = await supabase.from("players").insert([newPlayer]);
            if (createError) {
                throw new Error(`Error al crear el jugador con ID ${player.id}: ${createError.message}`);
            }
            return createdPlayer; // Retornamos el jugador creado
        }
        // Si el jugador existe, sumamos sus estadísticas
        const newDataPlayer = {
            id: playerData.id,
            name: playerData.name,
            goals: playerData.goals + player.goals,
            assists: playerData.assists + player.assists,
            saves: playerData.saves + player.saves,
            top_scores: playerData.top_scores + (player.id === topScorer.id ? 1 : 0),
            top_assistances: playerData.top_assistances + (player.id === topAssistances.id ? 1 : 0),
            mvp: playerData.mvp + (player.id === mvp.id ? 1 : 0),
            matches_played: playerData.matches_played + 1,
            matches_won: playerData.matches_won + (result === 'team2' ? 1 : 0),
            matches_tied: playerData.matches_tied + (result === 'draw' ? 1 : 0),
            matches_losses: playerData.matches_losses + (result === 'team1' ? 1 : 0)
        }
        const { data: addData, error: addDataError } = await supabase.from("players").update(newDataPlayer).eq("id", player.id);
        if (addDataError) {
            throw new Error(`Error al agregar data del jugador con ID ${player.id}: ${addDataError.message}`);
        }
        return addData;
    }));

    const { data, error } = await supabase.from("matches").insert([{ team1, team2, top_scorer, top_assistances, mvp }]);
    error ? res.status(400).send(error) : res.status(201).send(data);
};

// Método para actualizar un partido existente
exports.updateMatch = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    const { player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result } = req.body;
    /* to develop */
    //const { data, error } = await supabase.from("matches").update({ player1_id, player2_id, team1_id, team2_id, tournament_id, match_type, club1_id, club2_id, result }).eq("id", id);
    error ? res.status(400).send(error) : res.send(data);
};

// Método para eliminar un partido
exports.deleteMatch = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID del partido se pasa como parámetro
    /* to develop */
    const { data, error } = await supabase.from("matches").delete().eq("id", id);
    error ? res.status(400).send(error) : res.status(204).send();
};
