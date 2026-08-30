import Arm from '../../weapons/Arm';
import Knife from '../../weapons/Knife';
import Player from '../Player';
import Warrior from '../Warrior';

describe('Player battle movement and defense', () => {
  describe('movement', () => {
    test('moves left and right no farther than speed', () => {
      const player = new Player(6, 'Игрок');

      player.speed = 2;
      player.moveLeft(5);
      expect(player.position).toBe(4);

      player.moveRight(2);
      expect(player.position).toBe(6);

      player.moveRight(1);
      expect(player.position).toBe(7);
    });

    test('chooses movement direction from the distance sign', () => {
      const player = new Player(6, 'Игрок');

      player.speed = 2;
      player.move(-5);
      expect(player.position).toBe(4);

      player.move(1);
      expect(player.position).toBe(5);
    });
  });

  describe('defense checks', () => {
    test('blocks only when luck is above the blocking threshold', () => {
      const player = new Player(0, 'Игрок');

      jest
        .spyOn(player, 'getLuck')
        .mockReturnValueOnce(0.91)
        .mockReturnValueOnce(0.9);

      expect(player.isAttackBlocked()).toBe(true);
      expect(player.isAttackBlocked()).toBe(false);
    });

    test('dodges only when luck is above the agility threshold', () => {
      const player = new Player(0, 'Игрок');

      jest
        .spyOn(player, 'getLuck')
        .mockReturnValueOnce(0.93)
        .mockReturnValueOnce(0.92);

      expect(player.dodged()).toBe(true);
      expect(player.dodged()).toBe(false);
    });
  });

  describe('takeAttack', () => {
    test('damages the weapon and stops when the attack is blocked', () => {
      const player = new Player(0, 'Игрок');
      const knife = new Knife();

      knife.takeDamage(299);
      player.weapon = knife;
      jest.spyOn(player, 'isAttackBlocked').mockReturnValue(true);
      jest.spyOn(player, 'dodged').mockReturnValue(false);

      player.takeAttack(1);

      expect(player.life).toBe(100);
      expect(knife.durability).toBe(0);
      expect(player.weapon).toBeInstanceOf(Arm);
      expect(player.dodged).not.toHaveBeenCalled();
    });

    test('does not apply damage when the player dodges', () => {
      const player = new Player(0, 'Игрок');

      jest.spyOn(player, 'isAttackBlocked').mockReturnValue(false);
      jest.spyOn(player, 'dodged').mockReturnValue(true);

      player.takeAttack(20);

      expect(player.life).toBe(100);
    });

    test('applies damage when the attack is neither blocked nor dodged', () => {
      const player = new Player(0, 'Игрок');

      jest.spyOn(player, 'isAttackBlocked').mockReturnValue(false);
      jest.spyOn(player, 'dodged').mockReturnValue(false);

      player.takeAttack(20);

      expect(player.life).toBe(80);
    });
  });

  describe('checkWeapon', () => {
    test('keeps an unbroken weapon', () => {
      const warrior = new Warrior(0, 'Воин');
      const sword = warrior.weapon;

      warrior.checkWeapon();

      expect(warrior.weapon).toBe(sword);
    });

    test('replaces a broken main weapon with Knife', () => {
      const warrior = new Warrior(0, 'Воин');

      warrior.weapon.takeDamage(500);
      warrior.checkWeapon();

      expect(warrior.weapon).toBeInstanceOf(Knife);
    });
  });
});
