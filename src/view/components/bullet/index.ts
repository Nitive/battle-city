import { svg } from '@cycle/dom'

import { Bullet } from '../../../state/utils/bullet'

export const radius = 5

export default function bullet(bullet: Bullet) {
  const { position } = bullet

  return svg.circle({
    attrs: {
      cx: position.x,
      cy: position.y,
      r: radius,
    },
  })
}
