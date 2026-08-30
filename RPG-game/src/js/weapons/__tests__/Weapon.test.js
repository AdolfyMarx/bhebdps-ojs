import Weapon from '../Weapon';

describe('Weapon', () => {
  test('creates a weapon with the specified properties', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon).toEqual({
      name: 'Старый меч',
      attack: 20,
      durability: 10,
      initDurability: 10,
      range: 1
    });
  });

  test('reduces durability without going below zero', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    weapon.takeDamage(5);
    expect(weapon.durability).toBe(5);

    weapon.takeDamage(50);
    expect(weapon.durability).toBe(0);
  });

  test.each([
    [0, 20],
    [69, 20],
    [70, 20],
    [71, 10],
    [99, 10],
    [100, 0]
  ])('returns expected damage after receiving %i damage', (damage, expected) => {
    const weapon = new Weapon('Старый меч', 20, 100, 1);

    weapon.takeDamage(damage);

    expect(weapon.getDamage()).toBe(expected);
  });

  test('returns zero damage when durability is negative', () => {
    const weapon = new Weapon('Старый меч', 20, 100, 1);

    weapon.durability = -1;

    expect(weapon.getDamage()).toBe(0);
  });

  test('reports whether the weapon is broken', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.isBroken()).toBe(false);

    weapon.takeDamage(10);

    expect(weapon.isBroken()).toBe(true);
  });
});
