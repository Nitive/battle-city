// tslint:disable:no-switch-case-fall-through
// see https://github.com/palantir/tslint/issues/1538#issuecomment-253700633

import { State } from '.'
import { Action } from './actions'
import { tankStep, isTankInWall } from './utils/tank'
import * as bulletUtils from './utils/bullet'
import { reject, pipe, filter, map } from 'ramda'

const tankSpeed = 5
const bulletSpeed = 15

const moveBulletInTick = bulletUtils.moveBullet(bulletSpeed)

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection': {
      const { direction } = action
      const lastDirection = direction != null
        ? direction
        : state.tank.lastDirection

      return {
        ...state,
        tank: {
          ...state.tank,
          direction,
          lastDirection,
        },
      }
    }

    case 'Tick': {
      const blowUp = bulletUtils.blowUpBullet(state.walls)
      const bullets = state.bullets.map(blowUp)

      const browingUpBullets = pipe(
        filter(bulletUtils.isBlowingUpBullet),
        map(blowUp),
        reject(bulletUtils.isBlowedUpBullet),
      )(bullets)

      const flyingBullets = reject(bulletUtils.isBlowingUpBullet, bullets)
        .map(moveBulletInTick)

      const { tank, walls } = state
      const newPosition = tank.direction != null && tankStep(tank.position, tank.direction, tankSpeed)
      const position = newPosition
        ? isTankInWall(newPosition, walls) ? tank.position : newPosition
        : tank.position

      return {
        ...state,
        tank: {
          ...state.tank,
          position,
        },
        bullets: [...flyingBullets, ...browingUpBullets],
      }
    }

    case 'FireBullet': {
      const { tank } = state
      return {
        ...state,
        bullets: state.bullets.concat(
          bulletUtils.getBulletByTank(tank.position, tank.lastDirection),
        ),
      }
    }
  }
}
