import { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'

import { State } from '../state'
import field from './components/field'
import tank from './components/tank'

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state => {
    const { position, lastDirection } = state
    return div([
      field([
        tank(position, lastDirection),
      ]),
      div(`x: ${position.x}, y: ${position.y}`),
    ])
  })
}
