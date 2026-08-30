import Arm from '../Arm';
import Axe from '../Axe';
import Bow from '../Bow';
import Knife from '../Knife';
import LongBow from '../LongBow';
import Staff from '../Staff';
import StormStaff from '../StormStaff';
import Sword from '../Sword';
import Weapon from '../Weapon';

const weaponTypes = [
  ['Arm', Arm, Weapon, 'Рука', 1, Infinity, 1],
  ['Bow', Bow, Weapon, 'Лук', 10, 200, 3],
  ['Sword', Sword, Weapon, 'Меч', 25, 500, 1],
  ['Knife', Knife, Weapon, 'Нож', 5, 300, 1],
  ['Staff', Staff, Weapon, 'Посох', 8, 300, 2],
  ['LongBow', LongBow, Bow, 'Длинный лук', 15, 200, 4],
  ['Axe', Axe, Sword, 'Секира', 27, 800, 1],
  ['StormStaff', StormStaff, Staff, 'Посох Бури', 10, 300, 3]
];

describe('weapon types', () => {
  test.each(weaponTypes)(
    '%s has the required properties and inheritance',
    (className, WeaponType, ParentType, name, attack, durability, range) => {
      const weapon = new WeaponType();

      expect(weapon).toBeInstanceOf(ParentType);
      expect(weapon).toBeInstanceOf(Weapon);
      expect(weapon).toMatchObject({
        name,
        attack,
        durability,
        initDurability: durability,
        range
      });
    }
  );

  test.each(weaponTypes)(
    '%s inherits durability and damage behavior',
    (className, WeaponType, ParentType, name, attack, durability) => {
      const weapon = new WeaponType();

      weapon.takeDamage(durability);

      if (durability === Infinity) {
        expect(weapon.durability).toBe(Infinity);
        expect(weapon.isBroken()).toBe(false);
        expect(weapon.getDamage()).toBe(attack);
        return;
      }

      expect(weapon.durability).toBe(0);
      expect(weapon.isBroken()).toBe(true);
      expect(weapon.getDamage()).toBe(0);
    }
  );
});
