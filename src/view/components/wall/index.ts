import { svg } from '@cycle/dom'

import { Wall } from '../../../state/utils/wall'

export default function block(wall: Wall) {
  const { position, size } = wall
  return svg.rect({
    attrs: {
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      fill: 'black',
    },
  })
}
