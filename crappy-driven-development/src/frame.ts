import { IFrame } from './iframe'

export class Frame implements IFrame {
  pins: number[]

  public next: IFrame

  constructor (next: IFrame) {
    this.pins = new Array<number>()
    this.next = next
  }

  first (): number {
    return this.pins[0] ?? 0
  }

  roll (pins: number): IFrame {
    if (this.isComplete()) {
      if (this.next == null) {
        throw new Error('Can not roll on a complete frame')
      }
      this.next = this.next.roll(pins)
    } else {
      this.pins.push(pins)
    }

    if (!(this instanceof LastFrame)) {
      if (this.isSpare()) return this.toSpare()
      if (this.isStrike()) return this.toStrike()
    }

    return this
  }

  protected isSpare = (): boolean => this.pins.length === 2 && (this.pins[0] + this.pins[1] === 10)

  protected isStrike = (): boolean => this.pins[0] === 10

  isComplete = (): boolean => this.pins.length === 2

  score (): number {
    return this.fallenPins()
  }

  fallenPins = (): number => this.pins.reduce((acc: number, current: number) => acc + current, 0)

  private readonly toStrike = (): Strike => new Strike(this.next)

  private toSpare (): Spare {
    const spare = new Spare(this.next, this.pins)
    return spare
  }
}

export class Strike extends Frame implements IFrame {
  constructor (next: IFrame) {
    super(next)
    this.pins.push(10)
  }

  protected isStrike = (): boolean => true

  isComplete = (): boolean => this.pins.length === 1

  score (): number {
    const score: number = super.score()

    if (this.next instanceof Strike) {
      return score + this.next.first() + this.next.next.first()
    }

    return score + this.next.fallenPins()
  }
}

export class Spare extends Frame implements IFrame {
  constructor (next: IFrame, pins: number[]) {
    super(next)
    if (pins.reduce((acc: number, current: number) => acc + current, 0) !== 10) {
      throw new Error('A spare is 10 pins fallen in two rolls')
    }
    this.pins = pins
  }

  protected isStrike = (): boolean => false

  isSpare: () => true

  score (): number {
    return super.score() + this.next.first()
  }
}

export class LastFrame extends Frame {
  constructor () {
    super(null)
  }

  isComplete = (): boolean => {
    if (this.isStrike() || this.isSpare()) {
      return this.pins.length === 3
    }
    return this.pins.length === 2
  }

  score = (): number => this.pins.reduce((acc: number, current: number) => acc + current, 0)

  fallenPins = (): number => this.pins.slice(0, 2).reduce((acc: number, current: number) => acc + current, 0)

  roll = (pins: number): LastFrame => {
    if (this.isComplete()) {
      throw new Error('Can not roll when game is over')
    }
    this.pins.push(pins)

    return this
  }
}
