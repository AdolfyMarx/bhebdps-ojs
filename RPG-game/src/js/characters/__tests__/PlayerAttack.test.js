import Knife from '../../weapons/Knife';
import Player from '../Player';
import Warrior from '../Warrior';

describe('Player.tryAttack', () => {
  test('does not attack or wear the weapon outside its range', () => {
    const attacker = new Warrior(0, 'Воин');
    const enemy = new Player(2, 'Противник');
    const initialDurability = attacker.weapon.durability;

    jest.spyOn(attacker, 'getLuck');
    jest.spyOn(enemy, 'takeAttack').mockReturnValue(undefined);

    attacker.tryAttack(enemy);

    expect(attacker.weapon.durability).toBe(initialDurability);
    expect(attacker.getLuck).not.toHaveBeenCalled();
    expect(enemy.takeAttack).not.toHaveBeenCalled();
  });

  test('wears the weapon and attacks an enemy within range', () => {
    const attacker = new Warrior(2, 'Воин');
    const enemy = new Player(1, 'Противник');

    jest
      .spyOn(attacker, 'getLuck')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.4);
    jest.spyOn(enemy, 'takeAttack').mockReturnValue(undefined);

    attacker.tryAttack(enemy);

    expect(attacker.weapon.durability).toBe(495);
    expect(attacker.getLuck).toHaveBeenCalledTimes(2);
    expect(enemy.takeAttack).toHaveBeenCalledWith(14);
  });

  test('pushes the enemy right and deals double damage at one position', () => {
    const attacker = new Warrior(2, 'Воин');
    const enemy = new Player(2, 'Противник');

    jest
      .spyOn(attacker, 'getLuck')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.4);
    jest.spyOn(enemy, 'moveRight');
    jest.spyOn(enemy, 'takeAttack').mockReturnValue(undefined);

    attacker.tryAttack(enemy);

    expect(enemy.position).toBe(3);
    expect(enemy.moveRight).toHaveBeenCalledWith(1);
    expect(enemy.takeAttack).toHaveBeenCalledWith(28);
    expect(enemy.moveRight.mock.invocationCallOrder[0]).toBeLessThan(
      enemy.takeAttack.mock.invocationCallOrder[0]
    );
  });

  test('replaces a weapon broken by attack wear after damage calculation', () => {
    const attacker = new Warrior(0, 'Воин');
    const enemy = new Player(1, 'Противник');
    const sword = attacker.weapon;

    sword.takeDamage(495);
    jest
      .spyOn(attacker, 'getLuck')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.4);
    jest.spyOn(enemy, 'takeAttack').mockReturnValue(undefined);

    attacker.tryAttack(enemy);

    expect(sword.durability).toBe(0);
    expect(attacker.weapon).toBeInstanceOf(Knife);
    expect(enemy.takeAttack).toHaveBeenCalledWith(4);
  });
});
