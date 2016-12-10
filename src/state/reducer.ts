import { State } from '.'
import { Action } from './actions'
import { step } from './utils/position'

const speed = 5

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection':
      const { direction } = action.payload
      return {
        ...state,
        direction,
        lastDirection: direction != null
          ? direction
          : state.lastDirection,
      }

    case 'Tick':
      return {
        ...state,
        position: state.direction != null
          ? step(state.position, state.direction, speed)
          : state.position,
      }
  }
}
