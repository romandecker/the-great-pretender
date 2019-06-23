import seedrandom from 'seedrandom';
import { Picker } from './Picker';
import { en } from './data';

type RNG = () => number;

export class Pretender {
  static fromSeed(seed: string) {
    return new Pretender(seedrandom(seed));
  }

  static fromRng(rng: RNG) {
    return new Pretender(rng);
  }

  firstNames = this.picker([
    ...en.names.firstNames.male.default,
    ...en.names.firstNames.female.default,
  ]);

  private constructor(private readonly rng: RNG) {}

  integer(min: number = 0, upperBound: number = Number.MAX_SAFE_INTEGER) {
    return Math.floor(this.float(min, upperBound));
  }

  float(min: number = 0, upperBound: number = Number.MAX_VALUE) {
    return min + this.rng() * (upperBound - min);
  }

  picker<T>(dataSet: T[]): Picker<T> {
    return new Picker(this, dataSet);
  }
}
