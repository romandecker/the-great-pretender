import seedrandom from 'seedrandom';
import { Picker } from './Picker';
import { WeightedPicker } from './WeightedPicker';
import { UnweightedPicker } from './UnweightedPicker';
import { en } from './data';

type RNG = () => number;

/**
 * Main class for generating random data.
 */
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

  /**
   * Generate an integer `n` in the range `(min, upperBound]`,
   * i.e. between `min` inclusively and `upperBound` exclusively.
   */
  integer(min: number = 0, upperBound: number = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(this.float(min, upperBound));
  }

  /**
   * Generate a random floating point number in the range `(min, max)` inclusively.
   */
  float(min: number = 0, max: number = Number.MAX_VALUE): number {
    return min + this.rng() * (max - min);
  }

  /**
   * Generate either `true` or `false`, depending on the `chance` you
   * pass (which defaults to `0.5`, i.e. 50%).
   */
  boolean(chance: number = 0.5): boolean {
    return this.float(0, 1) < chance;
  }

  /**
   * Generate a new [[Picker]] for the given dataSet that's based on this
   * `Pretender` instance.
   */
  picker<T>(dataSet: T[]): UnweightedPicker<T>;
  picker<T>(dataSet: T[], weights: number[]): WeightedPicker<T>;
  picker<T>(dataSet: T[], weights?: number[]): Picker<T> {
    if (weights) {
      return new WeightedPicker(this, dataSet, weights);
    } else {
      return new UnweightedPicker(this, dataSet);
    }
  }
}
