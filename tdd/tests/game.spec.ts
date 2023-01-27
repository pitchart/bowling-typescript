class BowlingCalculator {
  private readonly pinList: number[] = []

  private readonly totalPinsPerFrame: number = 10

  roll (pins: number): void {
    this.pinList.push(pins)
  }

  score (): number {
    let sum: number = 0

    for (let index = 0; index < this.pinList.length; index += 2) {
      const frameScore = this.pinList[index] + this.pinList[index + 1]
      sum += frameScore
      if (frameScore === this.totalPinsPerFrame) sum += this.pinList[index + 2]
    }
    return sum
  }
}

describe('Bowling score', () => {
  const ROLL_NUMBER_BY_GAME = 20
  it('should be 0 when all rolls go into gutters', () => {
    const bowling = new BowlingCalculator()

    rollTimesInGutter(ROLL_NUMBER_BY_GAME, bowling)
    const score = bowling.score()

    expect(score).toBe(0)
  })

  it('should be equal to the number of falling pins when no spare nor strike occurs', () => {
    const bowling = new BowlingCalculator()

    bowling.roll(1)

    rollTimesInGutter(19, bowling)
    const score = bowling.score()

    expect(score).toBe(1)
  })

  it('should', () => {
    const bowling = new BowlingCalculator()

    bowling.roll(5)
    bowling.roll(5)
    bowling.roll(1)
    rollTimesInGutter(17, bowling)

    const score = bowling.score()

    expect(score).toBe(12)
  })

  it('should2', () => {
    const bowling = new BowlingCalculator()
    bowling.roll(1)
    bowling.roll(2)
    bowling.roll(5)
    bowling.roll(5)
    bowling.roll(1)
    rollTimesInGutter(15, bowling)

    const score = bowling.score()

    expect(score).toBe(15)
  })
})

function rollTimesInGutter (numberOfRolls: number, bowling: BowlingCalculator): void {
  for (let i = 0; i < numberOfRolls; i++) {
    bowling.roll(0)
  }
}
