import Arm from '../../weapons/Arm';
import Player from '../Player';

describe('Player', () => {
  test('creates a player with the required properties', () => {
    const player = new Player(10, 'Хоббит');

    expect(player).toMatchObject({
      life: 100,
      magic: 20,
      speed: 1,
      attack: 10,
      agility: 5,
      luck: 10,
      description: 'Игрок',
      weapon: expect.any(Arm),
      position: 10,
      name: 'Хоббит'
    });
  });

  test('calculates the luck coefficient', () => {
    const player = new Player(10, 'Бэтмен');

    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(player.getLuck()).toBeCloseTo(0.6);
    expect(Math.random).toHaveBeenCalledTimes(1);
  });

  test('calculates damage using attack, weapon, luck, and distance', () => {
    const player = new Player(10, 'Человек паук');

    player.weapon = {
      range: 3,
      getDamage: () => 20
    };
    jest.spyOn(player, 'getLuck').mockReturnValue(0.5);

    expect(player.getDamage(2)).toBe(7.5);
  });

  test('returns zero damage when the weapon cannot reach the enemy', () => {
    const player = new Player(10, 'Человек паук');

    jest.spyOn(player, 'getLuck');

    expect(player.getDamage(2)).toBe(0);
    expect(player.getLuck).not.toHaveBeenCalled();
  });

  test('reduces life without going below zero', () => {
    const player = new Player(10, 'Хоббит');

    player.takeDamage(10);
    expect(player.life).toBe(90);

    player.takeDamage(80);
    expect(player.life).toBe(10);

    player.takeDamage(90);
    expect(player.life).toBe(0);
  });

  test('reports whether the player is dead', () => {
    const player = new Player(10, 'Хоббит');

    expect(player.isDead()).toBe(false);

    player.takeDamage(100);

    expect(player.isDead()).toBe(true);
  });
});
