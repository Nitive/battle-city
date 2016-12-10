import { State } from '.'
import { Action } from './actions'
import { step } from '../view/utils/position'

const speed = 5

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection':
      return {
        position: state.position,
        direction: action.payload.direction,
        lastDirection: action.payload.direction || state.lastDirection,
      }

    case 'Tick':
      return {
        position: state.direction
          ? step(state.position, state.direction, speed)
          : state.position,
        direction: state.direction,
        lastDirection: state.lastDirection,
      }
  }
}
