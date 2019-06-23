import { Pretender } from './Pretender';
import { Picker } from './Picker';

jest.mock('./Picker');

describe('Pretender', () => {
  let pretender: Pretender;

  beforeEach(() => (pretender = Pretender.fromSeed('tests')));

  describe('#integer', () => {
    it('should return a random integer', () => {
      for (let i = 0; i < 100; i++) {
        expect(pretender.integer() % 1).toBe(0);
      }
    });

    describe('with min = 10 and upperBound = 20', () => {
      const MIN = 10;
      const UPPER_BOUND = 20;

      it('should return a random value between 10 and 20 inclusively', () => {
        for (let i = 0; i < 100; i++) {
          const n = pretender.integer(MIN, UPPER_BOUND);
          expect(n).toBeGreaterThanOrEqual(MIN);
          expect(n).toBeLessThan(UPPER_BOUND);
        }
      });

      it('should generate evenly distributed values', () => {
        const COUNT = 1000000;

        let sum = 0;
        for (let i = 0; i < COUNT; i++) {
          sum += pretender.integer(MIN, UPPER_BOUND + 1);
        }

        expect(sum / COUNT).toBeCloseTo(MIN + (UPPER_BOUND - MIN) / 2);
      });

      it('should work with negative values', () => {
        for (let i = 0; i < 100; i++) {
          const n = pretender.integer(-5, 6);
          expect(n).toBeGreaterThanOrEqual(-5);
          expect(n).toBeLessThan(6);
        }
      });
    });
  });

  describe('#float', () => {
    describe('with min = 10 and upperBound = 20', () => {
      const MIN = 0;
      const UPPER_BOUND = 1;

      it('should return a random value between 10 and 20 inclusively', () => {
        for (let i = 0; i < 100; i++) {
          const n = pretender.float(MIN, UPPER_BOUND);
          expect(n).toBeGreaterThanOrEqual(MIN);
          expect(n).toBeLessThan(UPPER_BOUND);
        }
      });

      it('should generate evenly distributed values', () => {
        const COUNT = 1000000;

        let sum = 0;
        for (let i = 0; i < COUNT; i++) {
          sum += pretender.float(MIN, UPPER_BOUND);
        }

        expect(sum / COUNT).toBeCloseTo(MIN + (UPPER_BOUND - MIN) / 2);
      });
    });
  });

  describe('#picker', () => {
    it('should return an instance of Picker', () => {
      const dataSet = ['a', 'b', 'c'];
      const picker = pretender.picker(dataSet);
      expect(picker).toBeInstanceOf(Picker);
    });
  });
});
