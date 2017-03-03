# mean-value-adjuster

### Now in ES6 JavaScript

A class to adjust the mean (average) value of a dataset by weighing each value based on its z-score.
Values closer to the mean are considered "better" and so are given more weight.

Very useful for giving less weight to "troll votes" in rating systems. 

## Usage

The class is given an array of values:

JavaScript:

```javascript
const values = [100,70,88,91,85,60,99,2]; // "2" is very far from the most values and the mean
const adjuster = new MeanAdjuster(values);
adjuster.getTrueMean(); // 74.4
adjuster.getAdjustedMean(); // 83.4
```

PHP:

```php
$values = [10,9,7,1]; // "1" is far from the mean and considered a troll vote
$adjuster = new MeanAdjuster($values);
$adjuster->getTrueMean(); // ≈ 6.8
$adjuster->getAdjustedMean(); // ≈ 8.4
```
