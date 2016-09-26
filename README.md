# mean-value-adjuster

A class to adjust the mean (average) value of a dataset by weighing each value based on its z-score.
Values closer to the mean are considered "better" and so are given more weight.

Very useful for giving less weight to "troll votes" in rating systems. 

## Usage

The class is given an array of values:

```php
$values = [10,9,7,1]; // "1" is far from the mean and considered a troll vote
$adjuster = new MeanAdjuster($values);
$adjuster->getTrueMean(); // ≈ 6.8
$adjuster->getAdjustedMean(); // ≈ 8.4
    
```
