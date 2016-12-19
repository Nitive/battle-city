import { svg } from '@cycle/dom'

import { Bullet, isBlowingUpBullet } from '../../../state/utils/bullet'

export const radius = 5

export default function bullet(bullet: Bullet) {
  const { position } = bullet

  const fill = isBlowingUpBullet(bullet)
    ? 'red'
    : 'black'

  return svg.circle({
    attrs: {
      cx: position.x,
      cy: position.y,
      r: radius + bullet.explosionStep ** 2,
      fill,
    },
  })
}
