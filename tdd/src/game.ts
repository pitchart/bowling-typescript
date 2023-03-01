export class Game {
  private _score: number = 0

  roll (pins: number): void {
    this._score += pins
  }

  get score (): number {
    return this._score
  }
}
