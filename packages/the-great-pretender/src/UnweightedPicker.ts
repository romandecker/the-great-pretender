import { Pretender } from './Pretender';
import { Picker } from './Picker';

/**
 * Very simple picker that just picks from the given data set. Each item has the same chance of
 * getting picked.
 */
export class UnweightedPicker<T> implements Picker<T> {
  constructor(readonly pretender: Pretender, readonly dataSet: T[]) {}

  /**
   * Pick a single item from the dataset, each item has the same chance of getting picked.
   */
  choice(): T {
    const [element] = this.choose(1);
    return element;
  }

  /**
   * Pick a number of items at random from the dataset. Each item has the same chance of getting
   * picked. If the first argument (`min`) is given, will select exactly that many items.
   *
   * When `max` is passed to, will select a random number of items in
   * the range `(min, max)` (inclusively).
   *
   * Any item may be picked multiple times. If you need a unique set
   * of picks, use [[sample]] instead.
   */
  choose(min: number = 1, max?: number): T[] {
    const count = typeof max === 'undefined' ? min : this.pretender.integer(min, max + 1);

    const ret = [];
    for (let i = 0; i < count; i++) {
      ret.push(this.dataSet[this.index()]);
    }

    return ret;
  }

  /**
   * Pick a number of items at random from the dataset. Each item has the same chance of getting
   * picked. If the first argument (`min`) is given, will select exactly that many items.
   *
   * When `max` is passed to, will select a random number of items in
   * the range `(min, max)` (inclusively).
   *
   * Each item can only be picked once - if you need the possibility
   * of duplicates, use [[choose]] instead.
   *
   * When `min` is bigger than the number of items in the data set, an
   * error is thrown. When `max` is bigger than the number of items in
   * the dataset, it will be assumed to be set to the maximum number
   * of available items.
   */
  sample(min: number = 0, max: number = this.dataSet.length): T[] {
    if (min > this.dataSet.length) {
      throw new Error(
        `Can't pick at least ${min} unique elements from a data set that only has ${
          this.dataSet.length
        } elements`,
      );
    }

    const count = this.pretender.integer(min, Math.min(max + 1, this.dataSet.length + 1));
    const allIndexes = this.dataSet.map((_, i) => i);

    const ret = [];
    for (let i = 0; i < count; i++) {
      const indexOfIndex = this.pretender.integer(0, allIndexes.length);
      const [index] = allIndexes.splice(indexOfIndex, 1);

      ret.push(this.dataSet[index]);
    }

    return ret;
  }

  private index(): number {
    return this.pretender.integer(0, this.dataSet.length);
  }
}
