import { Game } from '../src/game';

describe('Bowling game score', () => {
  it('should be 0 when all rolls went into the gutter', () => {
    const game = new Game()
    const numberOfRolls = 20
    for (let i = 0; i < numberOfRolls; i++) {
      game.roll(0)
    }
    expect(game.score).toBe(0)
  })
})
