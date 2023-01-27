class BowlingCalculator {
  private pins: number = 0;

  roll(pins: number): void {
    this.pins += pins;
  }

  score(): number {
    return this.pins;
  }
}

describe("Bowling score", () => {
  const ROLL_NUMBER_BY_GAME = 20;
  it("should be 0 when all rolls go into gutters", () => {
    const bowling = new BowlingCalculator();

    rollTimesInGutter(ROLL_NUMBER_BY_GAME, bowling);
    const score = bowling.score();

    expect(score).toBe(0);
  });

  it("should be equal to the number of falling pins when no spare nor strike occurs", () => {
    const bowling = new BowlingCalculator();

    bowling.roll(1);

    rollTimesInGutter(19, bowling);
    const score = bowling.score();

    expect(score).toBe(1);
  });

  it("should", () => {
    const bowling = new BowlingCalculator();

    bowling.roll(5);
    bowling.roll(5);
    bowling.roll(1);
    rollTimesInGutter(17, bowling);

    const score = bowling.score();

    expect(score).toBe(12);
  })
});

function rollTimesInGutter(numberOfRolls: number, bowling: BowlingCalculator) {
  for (let i = 0; i < numberOfRolls; i++) {
    bowling.roll(0);
  }
}
