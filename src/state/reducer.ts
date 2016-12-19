import { State } from '.'
import { Action } from './actions'
import { tankStep } from './utils/position'
import * as bulletUtils from './utils/bullet'
import { reject, pipe, filter, map } from 'ramda'

const tankSpeed = 5
const bulletSpeed = 15

const moveBulletInTick = bulletUtils.moveBullet(bulletSpeed)
const getBrowingUpBullets = pipe(
  filter(bulletUtils.isBlowingUpBullet),
  map(bulletUtils.blowUpBullet),
  reject(bulletUtils.isBlowedUpBullet),
)

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection':
      const { direction } = action
      const lastDirection = direction != null
        ? direction
        : state.lastDirection

      return {
        ...state,
        direction,
        lastDirection,
      }

    case 'Tick':
      const bullets = state.bullets.map(bulletUtils.blowUpBullet)

      const browingUpBullets = getBrowingUpBullets(bullets)

      const flyingBullets = reject(bulletUtils.isBlowingUpBullet, bullets)
        .map(moveBulletInTick)

      const position = state.direction != null
        ? tankStep(state.position, state.direction, tankSpeed)
        : state.position

      return {
        ...state,
        position,
        bullets: [...browingUpBullets, ...flyingBullets],
      }

    case 'FireBullet':
      return {
        ...state,
        bullets: state.bullets.concat(
          bulletUtils.getBulletByTank(state.position, state.lastDirection),
        ),
      }
  }
}
