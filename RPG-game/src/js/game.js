import Archer from './characters/Archer';
import Crossbowman from './characters/Crossbowman';
import Demiurge from './characters/Demiurge';
import Dwarf from './characters/Dwarf';
import Mage from './characters/Mage';
import Warrior from './characters/Warrior';

function play(players = []) {
  let livingPlayers = players.filter((player) => !player.isDead());

  if (livingPlayers.length === 0) {
    console.log('В игре нет живых персонажей.');
    return undefined;
  }

  let round = 1;

  while (livingPlayers.length > 1) {
    console.log(`Раунд ${round}.`);

    const roundPlayers = livingPlayers.slice();

    roundPlayers.forEach((player) => {
      if (player.isDead()) {
        return;
      }

      const turnPlayers = roundPlayers.filter(
        (turnPlayer) => !turnPlayer.isDead()
      );

      player.turn(turnPlayers);
    });

    livingPlayers = livingPlayers.filter((player) => !player.isDead());
    round += 1;
  }

  const [winner] = livingPlayers;

  console.log(`Победитель: ${winner.name}.`);

  return winner;
}

export {
  Archer,
  Crossbowman,
  Demiurge,
  Dwarf,
  Mage,
  Warrior,
  play
};
