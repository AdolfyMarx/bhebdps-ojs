import Archer from '../Archer';
import Demiurge from '../Demiurge';
import Dwarf from '../Dwarf';
import Mage from '../Mage';
import Warrior from '../Warrior';

describe('character abilities', () => {
  describe('Archer.getDamage', () => {
    test('calculates damage using distance and weapon range', () => {
      const archer = new Archer(2, 'Леголас');

      jest.spyOn(archer, 'getLuck').mockReturnValue(0.5);

      expect(archer.getDamage(2)).toBe(5);
    });

    test('returns zero when the weapon cannot reach the enemy', () => {
      const archer = new Archer(2, 'Леголас');

      jest.spyOn(archer, 'getLuck');

      expect(archer.getDamage(4)).toBe(0);
      expect(archer.getLuck).not.toHaveBeenCalled();
    });
  });

  describe('Warrior.takeDamage', () => {
    test('takes damage from life while life is not below half', () => {
      const warrior = new Warrior(6, 'Алёша Попович');

      jest.spyOn(warrior, 'getLuck').mockReturnValue(1);
      warrior.takeDamage(60);

      expect(warrior.life).toBe(60);
      expect(warrior.magic).toBe(20);
      expect(warrior.getLuck).not.toHaveBeenCalled();
    });

    test('takes damage from magic when life is below half and luck is high', () => {
      const warrior = new Warrior(6, 'Алёша Попович');

      warrior.life = 50;
      jest.spyOn(warrior, 'getLuck').mockReturnValue(0.81);
      warrior.takeDamage(5);

      expect(warrior.life).toBe(50);
      expect(warrior.magic).toBe(15);
    });

    test('does not reduce magic below zero', () => {
      const warrior = new Warrior(6, 'Алёша Попович');

      warrior.life = 50;
      warrior.magic = 5;
      jest.spyOn(warrior, 'getLuck').mockReturnValue(0.81);
      warrior.takeDamage(10);

      expect(warrior.life).toBe(50);
      expect(warrior.magic).toBe(0);
    });

    test('takes damage from life when luck is not above the threshold', () => {
      const warrior = new Warrior(6, 'Алёша Попович');

      warrior.life = 50;
      jest.spyOn(warrior, 'getLuck').mockReturnValue(0.8);
      warrior.takeDamage(5);

      expect(warrior.life).toBe(45);
      expect(warrior.magic).toBe(20);
    });

    test('takes damage from life when magic is zero', () => {
      const warrior = new Warrior(6, 'Алёша Попович');

      warrior.life = 50;
      warrior.magic = 0;
      jest.spyOn(warrior, 'getLuck').mockReturnValue(1);
      warrior.takeDamage(5);

      expect(warrior.life).toBe(45);
      expect(warrior.getLuck).not.toHaveBeenCalled();
    });
  });

  describe('Mage.takeDamage', () => {
    test('spends magic and halves damage while magic is above 50', () => {
      const mage = new Mage(10, 'Гендальф');

      mage.magic = 52;
      mage.takeDamage(20);

      expect(mage.life).toBe(60);
      expect(mage.magic).toBe(40);
    });

    test('takes full damage when magic is not above 50', () => {
      const mage = new Mage(10, 'Гендальф');

      mage.magic = 50;
      mage.takeDamage(20);

      expect(mage.life).toBe(50);
      expect(mage.magic).toBe(50);
    });
  });

  describe('Dwarf.takeDamage', () => {
    test('halves every sixth attack when luck is high', () => {
      const dwarf = new Dwarf(4, 'Торин');

      jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.51);

      for (let attack = 1; attack <= 5; attack += 1) {
        dwarf.takeDamage(10);
      }

      dwarf.takeDamage(10);

      expect(dwarf.life).toBe(75);
      expect(dwarf.getLuck).toHaveBeenCalledTimes(1);
    });

    test('takes full damage from the sixth attack when luck is not high', () => {
      const dwarf = new Dwarf(4, 'Торин');

      jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.5);

      for (let attack = 1; attack <= 5; attack += 1) {
        dwarf.takeDamage(0);
      }

      dwarf.takeDamage(10);

      expect(dwarf.life).toBe(120);
    });
  });

  describe('Demiurge.getDamage', () => {
    test('increases damage when magic and luck are sufficient', () => {
      const demiurge = new Demiurge(8, 'Мерлин');

      jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.7);

      expect(demiurge.getDamage(1)).toBeCloseTo(16.8);
      expect(demiurge.getLuck).toHaveBeenCalledTimes(2);
    });

    test('does not increase damage at the luck threshold', () => {
      const demiurge = new Demiurge(8, 'Мерлин');

      jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.6);

      expect(demiurge.getDamage(1)).toBeCloseTo(9.6);
    });

    test('does not increase damage when magic is zero', () => {
      const demiurge = new Demiurge(8, 'Мерлин');

      demiurge.magic = 0;
      jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.7);

      expect(demiurge.getDamage(1)).toBeCloseTo(11.2);
      expect(demiurge.getLuck).toHaveBeenCalledTimes(1);
    });
  });
});
