import Player from '../characters/Player';
import { play } from '../game';

describe('play', () => {
  test('returns undefined when there are no living players', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue(undefined);

    expect(play()).toBeUndefined();
    expect(log).toHaveBeenCalledWith('В игре нет живых персонажей.');
  });

  test('returns a sole living player without making a turn', () => {
    const player = new Player(0, 'Победитель');

    jest.spyOn(console, 'log').mockReturnValue(undefined);
    jest.spyOn(player, 'turn');

    expect(play([player])).toBe(player);
    expect(player.turn).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Победитель: Победитель.');
  });

  test('skips defeated players and returns the last survivor', () => {
    const first = new Player(0, 'Первый');
    const second = new Player(1, 'Второй');
    const defeated = new Player(2, 'Погибший');
    const players = [first, second, defeated];

    defeated.takeDamage(100);
    jest.spyOn(console, 'log').mockReturnValue(undefined);
    jest.spyOn(first, 'turn').mockImplementation(() => {
      second.takeDamage(second.life);
    });
    jest.spyOn(second, 'turn');
    jest.spyOn(defeated, 'turn');

    expect(play(players)).toBe(first);
    expect(first.turn).toHaveBeenCalledWith([first, second]);
    expect(second.turn).not.toHaveBeenCalled();
    expect(defeated.turn).not.toHaveBeenCalled();
    expect(players).toHaveLength(3);
    expect(console.log).toHaveBeenCalledWith('Раунд 1.');
    expect(console.log).toHaveBeenCalledWith('Победитель: Первый.');
  });
});
