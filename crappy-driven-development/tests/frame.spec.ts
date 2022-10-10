import { Frame, Spare } from '../src/frame'

let frame: Frame

describe('Frame', () => {
  beforeEach(() => {
    frame = new Frame(null)
  })

  it('should not be complete after one roll', () => {
    frame.roll(1)

    expect(frame.isComplete()).toBe(false)
  })

  it('should be complete after two rolls', () => {
    frame.roll(1)
    frame.roll(1)

    expect(frame.isComplete()).toBe(true)
  })

  it('should not be a spare when roll 10 ', () => {
    const result = frame.roll(10)

    expect(result).not.toBeInstanceOf(Spare)
  })

  it('should have value which is sum of its rolls', () => {
    frame.roll(1)
    frame.roll(1)

    expect(frame.score()).toBe(2)
  })

  it('should be a spare when the sum of its rolls is 10', () => {
    frame.roll(5)
    const spare = frame.roll(5)

    expect(spare).toBeInstanceOf(Spare)
  })
})
