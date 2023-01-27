class BowlingCalculator {
  roll (number: number): void {

  }

  score (): number {
    return 0
  }
}

describe('Bowling score', () => {
  it('should be 0 when all rolls go into gutters', () => {
    const bowling = new BowlingCalculator()

    for (let i = 0; i < 20; i++) {
      bowling.roll(0)
    }
    const score = bowling.score()

    expect(score).toBe(0)
  })
})
