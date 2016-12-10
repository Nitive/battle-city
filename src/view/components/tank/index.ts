import { svg, VNode } from '@cycle/dom'

import { Position } from '../../../state/utils/position'
import { Direction } from '../../../state/utils/direction'

export const width = 60
export const height = 60

const angles = {
  [Direction.Up]: 0,
  [Direction.Down]: 180,
  [Direction.Left]: -90,
  [Direction.Right]: 90,
}

const tankBody = svg.rect({
  attrs: {
    x: 5,
    y: 5,
    width: 50,
    height: 50,
    fill: 'red',
  },
})

const tankGun = svg.path({
  attrs: {
    fill: '#000',
    d: 'M25 0h10v35H25z',
  },
})

export default function tank(position: Position, direction: Direction = Direction.Right): VNode {
  const { x, y } = position
  const rotation = angles[direction]

  const translate = `translate(${x} ${y})`
  // second and third args to fix transform origin
  const rotate = `rotate(${rotation} ${x + width / 2} ${y + height / 2})`
  const containerStyle = {
    transform: rotate + translate,
  }

  return svg.g({ attrs: containerStyle }, [tankBody, tankGun])
}
