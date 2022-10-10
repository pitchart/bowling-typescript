import { Game } from '../src/game'

let g: Game = new Game()

beforeEach(() => {
  g = new Game()
})

describe('Bowling game', () => {
  it('should score 0 when rolled only gutters', () => {
    rollGutters(20)

    expect(g.score()).toBe(0)
  })

  it('should score 20 when rolled only ones', () => {
    rollMany(1, 20)

    expect(g.score()).toBe(20)
  })

  it('should score 16 when roll a spare followed by a 3 ball', () => {
    rollSpare()
    g.roll(3)

    expect(g.score()).toBe(16)
  })

  it('should score 24 when roll a strike followed by a 3 and a 4 ball', () => {
    rollStrike()
    g.roll(3)
    g.roll(4)
    rollGutters(16)

    expect(g.score()).toBe(24)
  })

  it('should score 60 when roll strikes on 4 last rolls', () => {
    rollGutters(16)
    rollStrike()
    rollStrike()
    rollStrike()
    rollStrike()

    expect(g.score()).toBe(60)
  })

  it('should score 300 when rolled perfect game', () => {
    rollMany(10, 12)

    expect(g.score()).toBe(300)
  })

  it('should not accept roll when game is over', () => {
    rollGutters(20)
    expect(() => g.roll(0))
      .toThrow('Can not roll when game is over')
  })

  function rollStrike (): void {
    g.roll(10)
  }

  function rollSpare (): void {
    g.roll(5)
    g.roll(5)
  }

  function rollMany (pins: number, times: number): void {
    for (let i = 0; i < times; i++) {
      g.roll(pins)
    }
  }

  function rollGutters (times: number): void {
    rollMany(0, times)
  }
})
