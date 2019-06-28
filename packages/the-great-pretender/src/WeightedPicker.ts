import { Pretender } from './Pretender';
import { Picker } from './Picker';

interface Weighted<T> {
  item: T;
  weight: number;
}

export class WeightedPicker<T> implements Picker<T> {
  private weightedData: Array<Weighted<T>>;

  constructor(readonly pretender: Pretender, dataSet: T[], weights: number[]) {
    this.weightedData = new Array(dataSet.length);
    for (let i = 0; i < dataSet.length; i++) {
      const item = dataSet[i];
      const givenWeight = weights[i];
      const weight = typeof givenWeight === 'undefined' ? 1 : givenWeight;

      this.weightedData[i] = { item, weight };
    }

    this.weightedData.sort(({ weight: a }, { weight: b }) => a - b);
  }

  private getWeightedIndex(array: Weighted<any>[]): number {
    let passedWeight = 0;
    let choice = 0;

    for (let i = 1; i < array.length; i++) {
      const item = array[i];

      // get a random number between 0 and the current cumulative weight
      const n = this.pretender.float(0, passedWeight + item.weight);

      if (n >= passedWeight) {
        choice = i;
      }
      passedWeight += item.weight;
    }

    return choice;
  }

  choice(): T {
    return this.weightedData[this.getWeightedIndex(this.weightedData)].item;
  }

  choose(min: number = 1, max?: number): T[] {
    const count = typeof max === 'undefined' ? min : this.pretender.integer(min, max + 1);

    const ret = [];
    for (let i = 0; i < count; i++) {
      ret.push(this.choice());
    }

    return ret;
  }

  sample(min: number = 0, max: number = this.weightedData.length): T[] {
    if (min > this.weightedData.length) {
      throw new Error(
        `Can't pick at least ${min} unique elements from a data set that only has ${
          this.weightedData.length
        } elements`
      );
    }

    const count = this.pretender.integer(min, Math.min(max + 1, this.weightedData.length + 1));

    // create a clone so we don't mutate the passed in data set
    const unpicked = [...this.weightedData];

    const picks: T[] = [];
    for (let i = 0; i < count; i++) {
      const index = this.getWeightedIndex(unpicked);
      const [pick] = unpicked.splice(index, 1);

      picks.push(pick.item);
    }

    return picks;
  }
}
