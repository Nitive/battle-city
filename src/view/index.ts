import { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'

import { State } from '../state'
import field from './components/field'
import tank from './components/tank'
import bullet from './components/bullet'
import wall from './components/wall'

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state => {
    const { position, bullets, lastDirection, walls } = state
    return div([
      field([
        tank(position, lastDirection),
        ...bullets.map(bullet),
        ...walls.map(wall),
      ]),
      div(`x: ${position.x}, y: ${position.y}`),
    ])
  })
}
