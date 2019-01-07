# mean-value-adjuster

Adjust the mean (average) value of a dataset by weighing each value based on its z-score.
Values closer to the mean are considered "better" and so are given more weight.

Very useful for giving less weight to "troll votes" in rating systems.

## Usage

Pass an array of values to `adjustedMean()`.

For example let's say they are IMDb ratings:

```js
// All the `1` ratings are considered more illegitimate than the ones closer
// to the mean (≈6.3)
const ratings = [
  10, 10,
  9, 9, 9, 9, 9, 9,
  8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  6, 6, 6, 6, 6, 6, 6, 6,
  5, 5, 5, 5,
  4, 4,
  3,
  2,
  1, 1, 1, 1, 1, 1,
]

mean(ratings) // ≈6.3
adjustedMean(ratings) // ≈6.8
```
