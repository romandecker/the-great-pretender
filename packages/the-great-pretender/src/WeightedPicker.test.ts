import { WeightedPicker } from './WeightedPicker';
import { Pretender } from './Pretender';
import countBy from 'lodash/countBy';

describe('WeightedPicker', () => {
  let picker: WeightedPicker<string>;
  const dataSet = ['foo', 'bar', 'baz', 'qux'];
  const weights = [50, 25, 12.5, 6.25];

  beforeEach(() => {
    picker = Pretender.fromSeed('tests').picker(dataSet, weights);
  });

  describe('#choice', () => {
    it('should respect the passed weights', () => {
      const picks = [];
      for (let i = 0; i < 10000; i++) {
        picks.push(picker.choice());
      }

      const counts = countBy(picks);
      expect(counts.foo / counts.bar).toBeCloseTo(2, 1);
      expect(counts.foo / counts.baz).toBeCloseTo(4, 0);
      expect(counts.foo / counts.qux).toBeCloseTo(8, 0);
    });
  });

  describe('#choose', () => {
    it('should respect the passed weights', () => {
      const picks = picker.choose(10000);

      const counts = countBy(picks);
      expect(counts.foo / counts.bar).toBeCloseTo(2, 1);
      expect(counts.foo / counts.baz).toBeCloseTo(4, 0);
      expect(counts.foo / counts.qux).toBeCloseTo(8, 0);
    });
  });
});
