import { State } from '.'
import { Action } from './actions'
import { tankStep } from './utils/position'
import { getBulletByTank, moveBullet, isVisibleBullet } from './utils/bullet'

const tankSpeed = 5
const bulletSpeed = 15

const moveBulletInTick = moveBullet(bulletSpeed)

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
      const bullets = state.bullets.map(moveBulletInTick).filter(isVisibleBullet)
      return {
        ...state,
        position: state.direction != null
          ? tankStep(state.position, state.direction, tankSpeed)
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
