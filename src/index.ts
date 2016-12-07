import xs, { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { svg, div, makeDOMDriver, DOMSource, VNode } from '@cycle/dom'

import { makeKeysDriver, KeysSource, KeyCode } from './utils/keys-driver'
import { step, Position } from './utils/position'
import { Direction } from './utils/direction'
import field from './components/field'
import tank from './components/tank'

interface Sources {
  DOM: DOMSource
  keys: KeysSource
}

interface Sinks {
  DOM: Stream<VNode>
}

function log<T>(data: T): T {
  console.log(data)
  return data
}

interface State {
  position: Position
  time: number
  direction?: Direction
  lastDirection?: Direction
}

const speed = 5
const startPosition: Position = { x: 0, y: 0 }
const initialState = {
  position: startPosition,
}

function reducer(state: State, nextState: State): State {
  const isNextTick = nextState.time > state.time

  const nextPosition = isNextTick && nextState.direction != null
    ? step(state.position, nextState.direction, speed)
    : state.position

  return {
    position: nextPosition,
    time: nextState.time,
    direction: nextState.direction,
    lastDirection: nextState.direction != null
      ? nextState.direction
      : state.lastDirection,
  }
}

function main({ keys, DOM }: Sources): Sinks {
  const direction$ = xs.merge(
    keys.down(KeyCode.Up).mapTo(Direction.Up),
    keys.down(KeyCode.Down).mapTo(Direction.Down),
    keys.down(KeyCode.Left).mapTo(Direction.Left),
    keys.down(KeyCode.Right).mapTo(Direction.Right),
    keys.up(KeyCode.Up).mapTo(undefined),
    keys.up(KeyCode.Down).mapTo(undefined),
    keys.up(KeyCode.Left).mapTo(undefined),
    keys.up(KeyCode.Right).mapTo(undefined),
  )

  const position$ = xs.of(startPosition)

  const time$ = xs.periodic(50)

  const state$ = xs
    .combine(position$, time$, direction$)
    .map(([position, time, direction]): State => ({ position, time, direction }))
    .fold(reducer, initialState)

  const vdom$ = state$.map((state: State) => {
    const { position } = state
    return div([
      field([
        tank(position, state.lastDirection),
      ]),
      div(`Position is x: ${position.x}, y: ${position.y}`),
    ])
  })

  return {
    DOM: vdom$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keys: makeKeysDriver(),
})
