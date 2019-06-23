import { Pretender } from './Pretender';

export class Picker<T> {
  constructor(readonly pretender: Pretender, readonly dataSet: T[]) {}

  choice(): T {
    const [element] = this.choose(1);
    return element;
  }

  choose(min: number = 1, max?: number): T[] {
    const count = typeof max === 'undefined' ? min : this.pretender.integer(min, max + 1);

    const ret = [];
    for (let i = 0; i < count; i++) {
      ret.push(this.dataSet[this.index()]);
    }

    return ret;
  }

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
