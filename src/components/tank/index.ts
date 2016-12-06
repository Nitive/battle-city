import { svg, VNode } from '@cycle/dom'

import { Position, Direction } from '../../utils/position'

const width = 60
const height = 60

const directions = {
  [Direction.Up]: 0,
  [Direction.Down]: 180,
  [Direction.Left]: -90,
  [Direction.Right]: 90,
}

export default function tank(position: Position, direction: Direction = Direction.Right): VNode {
  const { x, y } = position
  const rotation = directions[direction]

  const translate = `translate(${x} ${y})`
  // second and third args to fix transform origin
  const rotate = `rotate(${rotation} ${x + width / 2} ${y + height / 2})`
  const containerStyle = {
    transform: rotate + translate,
  }

  return svg.g({ attrs: containerStyle }, [
    svg.rect({ attrs: { width, height, fill: 'rgba(0, 0, 0, 0)' } }),
    svg.path({ attrs: { fill: '#f00', d: 'M5 10h50v50H5z' } }),
    svg.path({ attrs: { fill: '#000', d: 'M25 0h10v35H25z' } }),
  ])
}
