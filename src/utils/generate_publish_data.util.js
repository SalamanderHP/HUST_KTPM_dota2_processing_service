const generateRandomDetailLolMatch = (accountId, matchId) => {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const radiantWin = Math.random() < 0.5;
  const duration = randomInt(1200, 3600); // 20 to 60 minutes
  const isRadiant = Math.random() < 0.5;
  const win = radiantWin === isRadiant ? 1 : 0;
  const lose = win === 1 ? 0 : 1;

  return {
    players: [
      {
        account_id: accountId,
        player_slot: 0,
        kills: randomInt(0, 20),
        deaths: randomInt(0, 15),
        assists: randomInt(0, 30),
        leaver_status: 0,
        last_hits: randomInt(0, 300),
        denies: randomInt(0, 20),
        gold_per_min: randomInt(200, 800),
        xp_per_min: randomInt(300, 1000),
        level: randomInt(1, 30),
        net_worth: randomInt(3000, 25000),
        aghanims_scepter: randomInt(0, 1),
        aghanims_shard: randomInt(0, 1),
        moonshard: randomInt(0, 1),
        hero_damage: randomInt(1000, 30000),
        tower_damage: randomInt(0, 8000),
        hero_healing: randomInt(0, 5000),
        gold: randomInt(0, 3000),
        gold_spent: randomInt(3000, 25000),
        personaname: "kiss of death",
        name: null,
        radiant_win: radiantWin,
        start_time: generateRandomStartTime(),
        duration: duration,
        cluster: randomInt(100, 200),
        lobby_type: randomInt(0, 7),
        game_mode: randomInt(0, 25),
        patch: randomInt(50, 100),
        region: randomInt(1, 20),
        isRadiant: isRadiant,
        win: win,
        lose: lose,
        total_gold: randomInt(3000, 25000),
        total_xp: randomInt(3000, 30000),
        kda: +(randomInt(10, 500) / 100).toFixed(2),
      },
    ],
    duration: duration,
    game_mode: randomInt(0, 25),
    start_time: generateRandomStartTime(),
    match_id: matchId,
  };
};

function generateRandomStartTime() {
  const startOf2025 = new Date("2025-01-01T00:00:00Z").getTime() / 1000;
  const currentTime = Math.floor(Date.now() / 1000);
  return Math.floor(Math.random() * (currentTime - startOf2025)) + startOf2025;
}

module.exports = {
  generateRandomDetailLolMatch,
};
