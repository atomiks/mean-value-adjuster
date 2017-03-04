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
        this.values.forEach((rating) => variability.push(Math.pow(rating - mean, 2)));
        let sum = variability.reduce((sum, value) => sum + value);
        return Math.sqrt(sum / this.values.length);
    }

    _applyWeightingFunction()  {
        const mean = this.getTrueMean();
        const sd = this.getStandardDeviation();
        const ratingWeights = [];
        this.values.forEach(rating => {
            const zScore = sd !== 0 ? (rating - mean) / sd : 0;
            let weight = Math.sin(zScore + Math.PI / 2);
            if (weight < 0) weight = 0;
            ratingWeights.push({rating: rating, weight: weight});
        });
        return ratingWeights;
    }

    _calculateAdjustedMean() {
        const ratingWeights = this._applyWeightingFunction();
        let valueSum = 0;
        let weightSum = 0;
        ratingWeights.forEach(item => {
            valueSum += item.rating * item.weight;
            weightSum += item.weight;
        });
        this.adjustedMean = valueSum / weightSum;
    }
}
