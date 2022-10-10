export interface IFrame {
  next?: IFrame
  roll: (n: number) => IFrame
  isComplete: () => boolean
  score: () => number
  first: () => number
  fallenPins: () => number
}
