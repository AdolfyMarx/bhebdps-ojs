import Axe from '../../weapons/Axe';
import Bow from '../../weapons/Bow';
import LongBow from '../../weapons/LongBow';
import Staff from '../../weapons/Staff';
import StormStaff from '../../weapons/StormStaff';
import Sword from '../../weapons/Sword';
import Archer from '../Archer';
import Crossbowman from '../Crossbowman';
import Demiurge from '../Demiurge';
import Dwarf from '../Dwarf';
import Mage from '../Mage';
import Player from '../Player';
import Warrior from '../Warrior';

const characterTypes = [
  ['Warrior', Warrior, Player, Sword, 120, 20, 2, 10, 5, 10, 'Воин'],
  ['Archer', Archer, Player, Bow, 80, 35, 1, 5, 10, 10, 'Лучник'],
  ['Mage', Mage, Player, Staff, 70, 100, 1, 5, 8, 10, 'Маг'],
  ['Dwarf', Dwarf, Warrior, Axe, 130, 20, 2, 15, 5, 20, 'Гном'],
  [
    'Crossbowman',
    Crossbowman,
    Archer,
    LongBow,
    85,
    35,
    1,
    8,
    20,
    15,
    'Арбалетчик'
  ],
  [
    'Demiurge',
    Demiurge,
    Mage,
    StormStaff,
    80,
    120,
    1,
    6,
    8,
    12,
    'Демиург'
  ]
];

describe('character types', () => {
  test.each(characterTypes)(
    '%s has the required properties, weapon, and inheritance',
    (
      className,
      CharacterType,
      ParentType,
      WeaponType,
      life,
      magic,
      speed,
      attack,
      agility,
      luck,
      description
    ) => {
      const character = new CharacterType(12, 'Тестовый персонаж');

      expect(character).toBeInstanceOf(ParentType);
      expect(character).toBeInstanceOf(Player);
      expect(character.weapon).toBeInstanceOf(WeaponType);
      expect(character).toMatchObject({
        life,
        magic,
        speed,
        attack,
        agility,
        luck,
        description,
        position: 12,
        name: 'Тестовый персонаж'
      });
    }
  );
});
