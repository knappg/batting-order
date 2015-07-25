# Batting Order

## Purpose
This repository attempts to answer the following questions:
- _"Does the batting order in baseball actually matter?"_
- _"If so, how much does baseball batting order matter?"_
- _"How far off are the Seattle Mariners (on average) from the statistically optimal batting order"_
- _"What are patterns of good batting order strategies vs. bad batting order strategies"_

## Results

![Image of Results](http://i.imgur.com/s2hrKLR.png)

- Standard deviation of lineup runs: 0.0811 runs
- Average of lineup runs: 3.336 runs

## Strategy

We're using just about the most simple strategy imaginable.

First, some assumptions:
- Fix our line-up with a common Seattle Mariners line-up.
- Assume that the performance of a batter, so far in the current (2015) season, is truly representative of their skills. This is a weak assumption because the number of at-bats is nowhere near statistically significant, but we've got to work with what we've got.
- Always assume a full 9 innings are played.
- Ignore defensive prowess entirely. We only care about batting order of a fixed line-up.
- Base running variable scenarios with on-base players:
  * A player is on first and a single is hit: 50% chance they go to second, 50% chance they go to third.
  * A player is on first and a double is hit: 95% chance they score, 5% chance they go to third.
  * A player is on second and a single is hit: 70% chance they score, 30% chance they go to third.

Our strategy is just to simulate the average runs scored for every permutation of the line-up. We simulate 1,000 games (which is variable) for each line-up, where a full game is played, using the player's current probability of walk, single, double, triple, home run and out to simulate the outcome of their at-bat.

Now, we represent each batter with their stat pairs, for example:
```
{
  "atBats": 100,
  "singles": 35,
  "doubles": 15,
  "triples": 3,
  "homeRuns": 9
}
```

The problem we then face is to find the ways in which the permutations of these batter data are similar within percentile ranges (i.e. how are batter permutations within the top 1% similar?).

Idea:

- _n_ is the number of tracked attributes for a player
- _m_ is the number of players
- **1(x)** is the vector of all ones of length _x_

Consider a lineup as a vector of attributes (perhaps on base percentage plus slugging for all its players): x<sub>0</sub>, x<sub>1</sub>, x<sub>2</sub> ... x<sub>n</sub>. Call the matrix of all these lineup vectors _X_. _X_ is an _n_ x _m_ matrix.

Now let's imagine that there's a set of associated co-efficients that match to each attribute: a<sub>0</sub>, a<sub>1</sub>, a<sub>2</sub> ... a<sub>n</sub>. Call this vector _A_. _A_ has _n_ elements.

Is there some set of co-efficients, such that (A<sup>-1</sup>·X)·**1(m)** is minimized?
