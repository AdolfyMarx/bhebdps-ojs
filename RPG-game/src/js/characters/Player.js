import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';

class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    const weaponDamage = this.weapon.getDamage();

    return ((this.attack + weaponDamage) * this.getLuck()) / distance;
  }

  takeDamage(damage) {
    this.life = Math.max(this.life - damage, 0);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    const movement = Math.min(Math.abs(distance), this.speed);

    this.position -= movement;
  }

  moveRight(distance) {
    const movement = Math.min(Math.abs(distance), this.speed);

    this.position += movement;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(distance);
      return;
    }

    this.moveRight(distance);
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      console.log(`${this.name} блокирует удар.`);
      return;
    }

    if (this.dodged()) {
      console.log(`${this.name} уклоняется от удара.`);
      return;
    }

    this.takeDamage(damage);
    console.log(
      `${this.name} получает ${damage} урона. Осталось жизни: ${this.life}.`
    );
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }

    const brokenWeaponName = this.weapon.name;

    if (this.weapon instanceof Knife) {
      this.weapon = new Arm();
    } else {
      this.weapon = new Knife();
    }

    console.log(
      `${this.name} меняет ${brokenWeaponName} на ${this.weapon.name}.`
    );
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);

    if (distance > this.weapon.range) {
      console.log(`${this.name} не достаёт до ${enemy.name}.`);
      return;
    }

    this.weapon.takeDamage(10 * this.getLuck());

    const attackDistance = Math.max(distance, 1);
    const damage = this.getDamage(attackDistance);

    this.checkWeapon();

    if (distance === 0) {
      console.log(`${this.name} наносит ${enemy.name} двойной урон ${damage * 2}.`);
      enemy.moveRight(1);
      enemy.takeAttack(damage * 2);
      return;
    }

    console.log(`${this.name} атакует ${enemy.name} с уроном ${damage}.`);
    enemy.takeAttack(damage);
  }

  chooseEnemy(players) {
    return players.reduce((enemy, player) => {
      if (player === this || player.isDead()) {
        return enemy;
      }

      if (!enemy || player.life < enemy.life) {
        return player;
      }

      return enemy;
    }, undefined);
  }

  moveToEnemy(enemy) {
    const startPosition = this.position;

    this.move(enemy.position - this.position);
    console.log(
      `${this.name} перемещается с позиции ${startPosition} на ${this.position}.`
    );
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);

    if (!enemy) {
      console.log(`${this.name}: живых противников нет.`);
      return;
    }

    console.log(`${this.name} выбирает противника ${enemy.name}.`);
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}

export { Arm, Knife };
export default Player;
