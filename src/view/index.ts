import { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'

import { State } from '../state'
import field from './components/field'
import tank from './components/tank'
import bullet from './components/bullet'
import wall from './components/wall'

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state => {
    const { tank: { position, lastDirection }, bullets, walls } = state
    return div([
      field([
        tank(position, lastDirection),
        ...walls.map(wall),
        ...bullets.map(bullet),
      ]),
      div(`x: ${position.x}, y: ${position.y}`),
    ])
  })
}
