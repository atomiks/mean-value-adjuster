<?php

class MeanAdjuster {

  private $ratings;

  public function __construct($ratings) {
    $this->ratings = $ratings;
    $this->calculateAdjustedMean();
  }

  public function getTrueMean() {
    return array_sum($this->ratings) / count($this->ratings);
  }

  public function getStandardDeviation() {
    $mean = $this->getTrueMean();
    $variability = [];
    foreach ($this->ratings as $rating) {
      $variability[] = pow(($rating - $mean), 2);
    }
    $sd = sqrt(array_sum($variability) / count($this->ratings));
    return $sd;
  }

  private function applyWeightingFunction() {

    $mean = $this->getTrueMean();
    $sd = $this->getStandardDeviation();

    $ratingWeights = [];
    foreach ($this->ratings as $rating) {
       $zScore = ($sd != 0 ? (($rating - $mean) / $sd) : 0);
       $weight = sin(($zScore + pi() / 2));
       if ($weight < 0) {
         $weight = 0;
       }
       $ratingWeights[] = ['rating' => $rating, 'weight' => $weight];
    }
    return $ratingWeights;
  }

  private function calculateAdjustedMean() {

    $ratingWeights = $this->applyWeightingFunction();

    $ratingSum = 0;
    $weightSum = 0;

    foreach ($ratingWeights as $ratingWeight) {
      $ratingSum += $ratingWeight['rating'] * $ratingWeight['weight'];
      $weightSum += $ratingWeight['weight'];
    }
    $this->adjustedMean = $ratingSum / $weightSum;
  }

  public function getAdjustedMean() {
    return $this->adjustedMean;
  }

}
