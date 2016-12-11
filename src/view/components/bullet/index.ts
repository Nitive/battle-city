import { svg } from '@cycle/dom'

import { Bullet } from '../../../state/utils/bullet'

export default function bullet(bullet: Bullet) {
  const size = 10
  const { position } = bullet

  return svg.rect({
    attrs: {
      x: position.x,
      y: position.y,
      width: size,
      height: size,
    },
  })
}
