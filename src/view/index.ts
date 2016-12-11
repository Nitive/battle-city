import { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'

import { State } from '../state'
import field from './components/field'
import tank from './components/tank'
import bullet from './components/bullet'

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state => {
    const { position, bullets, lastDirection } = state
    return div([
      field([
        tank(position, lastDirection),
        ...bullets.map(bullet),
      ]),
      div(`x: ${position.x}, y: ${position.y}`),
    ])
  })
}
