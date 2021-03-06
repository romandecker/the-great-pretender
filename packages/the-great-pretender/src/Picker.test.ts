import { Picker } from './Picker';
import { Pretender } from './Pretender';

describe('Picker interface', () => {
  let pickers: Array<[string, Picker<string>]>;
  const dataSet = ['foo', 'bar', 'baz', 'qux'];
  const weights = [1, 2, 3, 4];

  const pretender = Pretender.fromSeed('tests');
  pickers = [
    ['UnweightedPicker', pretender.picker(dataSet)],
    ['WeightedPicker', pretender.picker(dataSet, weights)],
  ];

  pickers.forEach(testPicker);

  function testPicker([name, picker]: [string, Picker<string>]) {
    describe(name, () => {
      describe('#choice', () => {
        it('should return a member of the input array', () => {
          for (let i = 0; i < 100; i++) {
            const elem = picker.choice();
            expect(dataSet.find((e) => e === elem)).toBeTruthy();
          }
        });
      });

      describe('#choose', () => {
        describe('when only passing min', () => {
          it('should return an array of length min', () => {
            for (let i = 0; i < 100; i++) {
              const elems = picker.choose(3);
              expect(elems).toHaveLength(3);
            }
          });
        });

        describe('when passing min and max', () => {
          it('should return an array of length between min and max', () => {
            for (let i = 0; i < 100; i++) {
              const elems = picker.choose(1, 3);
              expect(elems.length).toBeGreaterThanOrEqual(1);
              expect(elems.length).toBeLessThanOrEqual(3);
            }
          });
        });
      });

      describe('#sample', () => {
        it('should only return unique picks', () => {
          for (let i = 0; i < 100; i++) {
            const elems = picker.sample(1, 4);
            expect(elems.length).toBeGreaterThanOrEqual(1);
            expect(elems.length).toBeLessThanOrEqual(4);
            expect(new Set(elems).size).toBe(elems.length);
          }
        });

        it('should throw when trying to pick more elements than are available', () => {
          expect(() => picker.sample(55)).toThrow();
        });
      });
    });
  }
});
