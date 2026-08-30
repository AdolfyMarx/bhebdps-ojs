import Player from '../Player';
import Warrior from '../Warrior';

describe('Player enemy selection and turn', () => {
  describe('chooseEnemy', () => {
    test('chooses the living opponent with the lowest life', () => {
      const player = new Player(0, 'Игрок');
      const dead = new Player(1, 'Погибший');
      const healthier = new Player(2, 'Здоровый');
      const weaker = new Player(3, 'Слабый');

      player.life = 1;
      dead.takeDamage(100);
      healthier.life = 70;
      weaker.life = 30;

      expect(
        player.chooseEnemy([player, dead, healthier, weaker])
      ).toBe(weaker);
    });

    test('keeps the first opponent when minimum life values are equal', () => {
      const player = new Player(0, 'Игрок');
      const first = new Player(1, 'Первый');
      const second = new Player(2, 'Второй');

      first.life = 30;
      second.life = 30;

      expect(player.chooseEnemy([player, first, second])).toBe(first);
    });

    test('returns undefined when no living opponent is available', () => {
      const player = new Player(0, 'Игрок');
      const dead = new Player(1, 'Погибший');

      dead.takeDamage(100);

      expect(player.chooseEnemy([player, dead])).toBeUndefined();
    });
  });

  describe('moveToEnemy', () => {
    test('moves toward an enemy using the player speed', () => {
      const player = new Warrior(6, 'Воин');
      const leftEnemy = new Player(0, 'Противник слева');
      const rightEnemy = new Player(10, 'Противник справа');
      const samePositionEnemy = new Player(6, 'Противник рядом');

      player.moveToEnemy(leftEnemy);
      expect(player.position).toBe(4);

      player.moveToEnemy(rightEnemy);
      expect(player.position).toBe(6);

      player.moveToEnemy(samePositionEnemy);
      expect(player.position).toBe(6);
    });
  });

  describe('turn', () => {
    test('chooses, approaches, and attacks an enemy in strict order', () => {
      const player = new Player(0, 'Игрок');
      const enemy = new Player(2, 'Противник');
      const players = [player, enemy];

      jest.spyOn(player, 'chooseEnemy').mockReturnValue(enemy);
      jest.spyOn(player, 'moveToEnemy').mockReturnValue(undefined);
      jest.spyOn(player, 'tryAttack').mockReturnValue(undefined);

      player.turn(players);

      expect(player.chooseEnemy).toHaveBeenCalledWith(players);
      expect(player.moveToEnemy).toHaveBeenCalledWith(enemy);
      expect(player.tryAttack).toHaveBeenCalledWith(enemy);
      expect(player.chooseEnemy.mock.invocationCallOrder[0]).toBeLessThan(
        player.moveToEnemy.mock.invocationCallOrder[0]
      );
      expect(player.moveToEnemy.mock.invocationCallOrder[0]).toBeLessThan(
        player.tryAttack.mock.invocationCallOrder[0]
      );
    });

    test('does nothing when there is no living opponent', () => {
      const player = new Player(0, 'Игрок');

      jest.spyOn(player, 'moveToEnemy');
      jest.spyOn(player, 'tryAttack');

      player.turn([player]);

      expect(player.moveToEnemy).not.toHaveBeenCalled();
      expect(player.tryAttack).not.toHaveBeenCalled();
    });
  });
});
