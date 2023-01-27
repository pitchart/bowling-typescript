class BowlingCalculator {
  private readonly pinList: number[] = []

  private readonly totalPinsPerFrame: number = 10

  roll (pins: number): void {
    this.pinList.push(pins)
    if (pins === this.totalPinsPerFrame) this.pinList.push(0)
  }

  score (): number {
    let sum: number = 0

    for (let index = 0; index < Math.min(this.pinList.length, this.totalPinsPerFrame * 2); index += 2) {
      sum += this.pinList[index] + this.pinList[index + 1]
      if (this.isStrike(index)) sum += this.pinList[index + 2] + (this.isStrike(index + 2) ? this.pinList[index + 4] : this.pinList[index + 3]);
      else if (this.isSpare(index)) sum += this.pinList[index + 2]
    }
    return sum
  }

  private isSpare(index: number) {
    return this.pinList[index] + this.pinList[index + 1] === this.totalPinsPerFrame
  }

  private isStrike(index: number) {
    return this.pinList[index] === this.totalPinsPerFrame
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

  it('should add next roll for a spare', () => {
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

  it('should add bonus roll for a spare on last frame', () => {
    const bowling = new BowlingCalculator()

    rollTimesInGutter(18, bowling)
    bowling.roll(5)
    bowling.roll(5)
    bowling.roll(3)

    const score = bowling.score()

    expect(score).toBe(13)
  })

  it('should add 2 next roll for a strike', () => {
    const bowling = new BowlingCalculator()

    bowling.roll(10)
    bowling.roll(1)
    bowling.roll(8)
    rollTimesInGutter(16, bowling)

    const score = bowling.score()

    expect(score).toBe(28)
  })

  it('should add 2 bonus roll for a strike on last frame', () => {
    const bowling = new BowlingCalculator()

    rollTimesInGutter(18, bowling)
    bowling.roll(10)
    bowling.roll(1)
    bowling.roll(8)

    const score = bowling.score()

    expect(score).toBe(19)
  })

  it('should', () => {
    const bowling = new BowlingCalculator()

    bowling.roll(10)
    bowling.roll(10)
    bowling.roll(10)
    rollTimesInGutter(14, bowling)

    const score = bowling.score()

    expect(score).toBe(60)
  })
})

function rollTimesInGutter (numberOfRolls: number, bowling: BowlingCalculator): void {
  for (let i = 0; i < numberOfRolls; i++) {
    bowling.roll(0)
  }
}
