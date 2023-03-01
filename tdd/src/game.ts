export class Game {
  private readonly rolls: number[] = []

  roll (pins: number): void {
    this.rolls.push(pins)
  }

  get score (): number {
    let score = 0
    for (let i = 0; i < 10; i++) {
      const firstRoll = this.rolls[2 * i]
      const secondRoll = this.rolls[2 * i + 1]
      const scoreOfTurn = firstRoll + secondRoll
      score += scoreOfTurn
      if (this.isSpare(firstRoll, secondRoll)) {
        score += this.rolls[2 * i + 2]
      }
    }
    return score
  }

  private isSpare (firstRoll: number, secondRoll: number): boolean {
    return firstRoll + secondRoll === 10 && firstRoll !== 10
  }
}
