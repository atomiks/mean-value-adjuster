class MeanAdjuster {
    constructor(ratings) {
        this.ratings = ratings;
        this.calculateAdjustedMean();
    }

    getTrueMean() {
        return this.ratings.reduce((sum, num) => sum + num) / this.ratings.length;
    }

    getStandardDeviation() {
        const mean = this.getTrueMean();
        const variability = [];
        this.ratings.forEach((rating) => variability.push(Math.pow(rating - mean, 2)));
        let sum = variability.reduce((sum, num) => sum + num);
        return Math.sqrt(sum / this.ratings.length);
    }

    applyWeightingFunction()  {
        const mean = this.getTrueMean();
        const sd = this.getStandardDeviation();
        const ratingWeights = [];

        this.ratings.forEach(rating => {
            const zScore = sd !== 0 ? (rating - mean) / sd : 0;
            let weight = Math.sin((zScore + Math.PI / 2));
            if (weight < 0) weight = 0;
            ratingWeights.push({'rating': rating, 'weight': weight});
        });

        return ratingWeights;
    }

    calculateAdjustedMean() {
        const ratingWeights = this.applyWeightingFunction();
        let ratingSum = 0;
        let weightSum = 0;
        ratingWeights.forEach(item => {
            ratingSum += item.rating * item.weight;
            weightSum += item.weight;
        });
        this.adjustedMean = ratingSum / weightSum;
    }

    getAdjustedMean() {
        return this.adjustedMean;
    }
}
