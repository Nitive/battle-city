import { State } from '.'
import { Action } from './actions'
import { tankStep } from './utils/position'
import { getBulletByTank, moveBulletInTick } from './utils/bullet'

const speed = 5

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection':
      const { direction } = action
      return {
        ...state,
        direction,
        lastDirection: direction != null
          ? direction
          : state.lastDirection,
      }

    case 'Tick':
      const bullets = state.bullets.map(moveBulletInTick)
      return {
        ...state,
        position: state.direction != null
          ? tankStep(state.position, state.direction, speed)
          : state.position,
        bullets,
      }

    case 'FireBullet':
      const bullet = getBulletByTank(state.position, state.lastDirection)
      return {
        ...state,
        bullets: state.bullets.concat(bullet),
      }
  }
}
