class MeanAdjuster {
    constructor(values) {
        this.values = values;
        this._calculateAdjustedMean();
    }

    getTrueMean() {
        return this.values.reduce((sum, value) => sum + value) / this.values.length;
    }

    getAdjustedMean() {
        return this.adjustedMean;
    }

    getStandardDeviation() {
        const mean = this.getTrueMean();
        const variability = [];
        this.values.forEach((value) => variability.push(Math.pow(value - mean, 2)));
        const sum = variability.reduce((sum, value) => sum + value);
        return Math.sqrt(sum / this.values.length);
    }

    _applyWeightingFunction()  {
        const mean = this.getTrueMean();
        const sd = this.getStandardDeviation();
        const valueWeights = [];
        this.values.forEach(value => {
            const zScore = sd !== 0 ? (value - mean) / sd : 0;
            let weight = Math.sin(zScore + Math.PI / 2);
            if (weight < 0) weight = 0;
            valueWeights.push({value: value, weight: weight});
        });
        return valueWeights;
    }

    _calculateAdjustedMean() {
        const valueWeights = this._applyWeightingFunction();
        let valueSum = 0;
        let weightSum = 0;
        valueWeights.forEach(item => {
            valueSum += item.value * item.weight;
            weightSum += item.weight;
        });
        this.adjustedMean = valueSum / weightSum;
    }
}
