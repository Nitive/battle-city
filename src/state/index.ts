import xs, { Stream } from 'xstream'

import { step, Position } from '../view/utils/position'
import { Direction } from '../view/utils/direction'
import { KeyCode } from '../utils/keys-driver'

import { Sources } from '..'

export type State = {
  position: Position,
  time: number,
  direction?: Direction,
  lastDirection?: Direction,
}

export type ChangeDirectionAction
  = { type: 'ChangeDirection', payload: { direction?: Direction } }

export type TickAction
  = { type: 'Tick' }

export type Action
  = ChangeDirectionAction
  | TickAction

const speed = 5
const startPosition: Position = { x: 0, y: 0 }
const initialState: State = {
  position: startPosition,
  time: 0,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ChangeDirection':
      return {
        position: state.position,
        time: state.time,
        direction: action.payload.direction,
        lastDirection: action.payload.direction || state.lastDirection,
      }

    case 'Tick':
      return {
        position: state.direction
          ? step(state.position, state.direction, speed)
          : state.position,
        time: state.time + 50,
        direction: state.direction,
        lastDirection: state.lastDirection,
      }
  }
}

export function intent({ keys, DOM }: Sources): Stream<Action> {
  const direction$ = xs
    .merge(
      keys.down(KeyCode.Up).mapTo(Direction.Up),
      keys.down(KeyCode.Down).mapTo(Direction.Down),
      keys.down(KeyCode.Left).mapTo(Direction.Left),
      keys.down(KeyCode.Right).mapTo(Direction.Right),
      keys.up(KeyCode.Up).mapTo(undefined),
      keys.up(KeyCode.Down).mapTo(undefined),
      keys.up(KeyCode.Left).mapTo(undefined),
      keys.up(KeyCode.Right).mapTo(undefined),
    )
    .map<ChangeDirectionAction>(direction => {
      return {
        type: 'ChangeDirection',
        payload: { direction },
      }
    })

  const time$ = xs.periodic(50).mapTo<TickAction>({ type: 'Tick' })
  return xs.merge(direction$, time$)
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
