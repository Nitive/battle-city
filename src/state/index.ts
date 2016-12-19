import { Stream } from 'xstream'

import { Tank } from './utils/tank'
import { Direction } from './utils/direction'
import { Bullet } from './utils/bullet'
import { Wall } from './utils/wall'

import reducer from './reducer'
import { Action } from './actions'

const walls: Wall[] = [{
  position: { x: 500, y: 200 },
  size: { width: 50, height: 200 },
}]

export interface State {
  readonly tank: Tank,
  readonly bullets: Bullet[],

  readonly walls: Wall[],
}

const initialState: State = {
  tank: {
    position: { x: 0, y: 0 },
    lastDirection: Direction.Right,
  },
  bullets: [],
  walls,
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
