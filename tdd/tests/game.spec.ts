import { Game } from '../src/game'

describe('Bowling game score', () => {
  it('should be 0 when all rolls went into the gutter', () => {
    const game = new Game()
    const numberOfRolls = 20
    for (let i = 0; i < numberOfRolls; i++) {
      game.roll(0)
    }
    expect(game.score).toBe(0)
  })

  it('should be 20 when we hit 1 pin per roll', () => {
    const game = new Game()
    const numberOfRolls = 20
    for (let i = 0; i < numberOfRolls; i++) {
      game.roll(1)
    }
    expect(game.score).toBe(20)
  })

  it('should handle spare case', () => {
    const game = new Game()

    game.roll(2)
    game.roll(8)
    game.roll(4)

    const numberOfRolls = 17
    for (let i = 0; i < numberOfRolls; i++) {
      game.roll(2)
    }

    expect(game.score).toBe(52)
  })
})
