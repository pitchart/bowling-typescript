import { Frame, LastFrame, Strike } from '../src/frame'

let frame: Frame

describe('Strike', () => {
  beforeEach(() => {
    frame = new Frame(null)
  })

  it('should be strike when roll 10', () => {
    const strike = frame.roll(10)

    expect(strike).toBeInstanceOf(Strike)
  })

  it('should only contain 10 pins', () => {
    const strike = new Strike(new LastFrame())

    expect(strike.first()).toBe(10)
  })

  it('should be complete after one roll of 10', () => {
    const strike = frame.roll(10)

    expect(strike.isComplete()).toBe(true)
  })
})
