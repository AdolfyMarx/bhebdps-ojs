import Axe from '../weapons/Axe';
import Warrior from './Warrior';

class Dwarf extends Warrior {
  #receivedAttacks = 0;

  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
  }

  takeDamage(damage) {
    this.#receivedAttacks += 1;

    if (this.#receivedAttacks % 6 === 0 && this.getLuck() > 0.5) {
      super.takeDamage(damage / 2);
      return;
    }

    super.takeDamage(damage);
  }
}

export { Axe };
export default Dwarf;
