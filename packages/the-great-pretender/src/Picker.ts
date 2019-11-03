/**
 * @typeparam T Type of the things that are being picked.
 */
export interface Picker<T> {
  /**
   * Pick a single item at random from the dataset
   */
  choice(): T;

  /**
   * Pick a number of items at random from the dataset. If the first
   * argument (`min`) is given, will select exactly that many items.
   *
   * When `max` is passed to, will select a random number of items in
   * the range `(min, max)` (inclusively).
   *
   * Any item may be picked multiple times. If you need a unique set
   * of picks, use [[sample]] instead.
   */
  choose(min?: number, max?: number): T[];

  /**
   * Pick a number of items at random from the dataset. If the first
   * argument (`min`) is given, will select exactly that many items.
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
  sample(min?: number, max?: number): T[];
}
