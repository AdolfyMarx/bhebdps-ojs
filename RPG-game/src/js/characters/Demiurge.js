import StormStaff from '../weapons/StormStaff';
import Mage from './Mage';

class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getDamage(distance) {
    const damage = super.getDamage(distance);

    if (this.magic > 0 && this.getLuck() > 0.6) {
      return damage * 1.5;
    }

    return damage;
  }
}

export { StormStaff };
export default Demiurge;
