// Using `for` loops here instead of functional array methods
// because they are much faster. This function may be passed
// thousands or millions of numbers, so it should be as performant
// as possible.
//
// Results in Chrome console for 1,000,000 numbers in `values`:
// * Functional using Array#map, Array#reduce ≈ 1100ms
// * Imperative using for loops ≈ 120ms

function getSum(values) {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
  }
  return sum
}

function getMean(values) {
  return getSum(values) / values.length
}

function getStandardDeviation(values, mean) {
  const variability = []
  for (let i = 0; i < values.length; i++) {
    variability[i] = (values[i] - mean) ** 2
  }
  return Math.sqrt(getSum(variability) / values.length)
}

function getWeightedValues(values) {
  const mean = getMean(values)
  const sd = getStandardDeviation(values, mean)
  const weightedValues = []
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    const zScore = sd !== 0 ? (value - mean) / sd : 0
    const weighting = Math.max(0, Math.sin(zScore + Math.PI / 2))
    weightedValues[i] = { value, weighting }
  }
  return weightedValues
}

function adjustedMean(values) {
  const weightedValues = getWeightedValues(values)
  let sum = 0
  let weightingSum = 0
  for (let i = 0; i < weightedValues.length; i++) {
    sum += weightedValues[i].value * weightedValues[i].weighting
    weightingSum += weightedValues[i].weighting
  }
  return sum / weightingSum
}

export default adjustedMean
