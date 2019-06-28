import { Picker } from './Picker';
import { Pretender } from './Pretender';
import countBy from 'lodash/countBy';

describe('UnweightedPicker', () => {
  let picker: Picker<string>;
  const dataSet = ['foo', 'bar', 'baz', 'qux'];

  beforeEach(() => {
    picker = Pretender.fromSeed('tests').picker(dataSet);
  });

  describe('#choice', () => {
    it('should distribute the picks evenly', () => {
      const picks = [];
      for (let i = 0; i < 10000; i++) {
        picks.push(picker.choice());
      }

      const counts = countBy(picks);
      expect(counts.foo / counts.bar).toBeCloseTo(1, 0);
      expect(counts.foo / counts.baz).toBeCloseTo(1, 0);
      expect(counts.foo / counts.qux).toBeCloseTo(1, 0);
    });
  });

  describe('#choose', () => {
    it('should distribute picks evenly', () => {
      const picks = picker.choose(10000);

      const counts = countBy(picks);
      expect(counts.foo / counts.bar).toBeCloseTo(1, 0);
      expect(counts.foo / counts.baz).toBeCloseTo(1, 0);
      expect(counts.foo / counts.qux).toBeCloseTo(1, 0);
    });
  });
});
