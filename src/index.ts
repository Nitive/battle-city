import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver, DOMSource } from '@cycle/dom'
import { makeKeysDriver, KeysSource, KeyCode } from './utils/keys-driver'
import { step, Position, Direction } from './utils/position'

interface Drivers {
  DOM: DOMSource
  keys: KeysSource
}

function log<T>(data: T): T {
  console.log(data)
  return data
}

interface State {
  position: Position
  time: number
  direction?: Direction
}

function main({ keys, DOM }: Drivers) {
  const speed = 5
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

  const startPosition: Position = { x: 0, y: 0 }
  const position$ = xs.of(startPosition)

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
    }
  }

  const time$ = xs.periodic(100).startWith(0)

  const state$ = xs
    .combine(position$, time$, direction$)
    .map(([position, time, direction]): State => ({ position, time, direction }))
    .fold(reducer, initialState)

  const vdom$ = state$.map(state => {
    const { position } = state
    return div(`Position is ${position.x}, ${position.y}`)
  })

  return {
    DOM: vdom$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keys: makeKeysDriver(),
})
