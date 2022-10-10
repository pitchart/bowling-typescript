import { Frame, LastFrame } from './frame'
import { IFrame } from './iframe'

export class Game {
  frames: IFrame

  constructor () {
    let firstFrame: IFrame = new LastFrame()
    for (let i = 1; i < 10; i++) {
      firstFrame = new Frame(firstFrame)
    }
    this.frames = firstFrame
  }

  roll (pins: number): void {
    this.frames = this.frames.roll(pins)
  }

  score (): number {
    let result: number = 0
    let current = this.frames

    while (!(current === null)) {
      result += current.score()
      current = current.next
    }

    return result
  }
}
