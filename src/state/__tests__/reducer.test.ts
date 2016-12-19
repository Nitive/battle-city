import { Direction } from '../utils/direction'
import { State } from '..'

import * as actions from '../actions'
import reducer from '../reducer'

const defaultState: State = {
  bullets: [],
  tank: {
    position: { x: 0, y: 0 },
    direction: Direction.Right,
    lastDirection: Direction.Right,
  },
  walls: [],
}

describe('Tick:', () => {
  it('should move up', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 50, y: 100 },
        direction: Direction.Up,
      },
    }

    const { tank } = reducer(state, actions.tick())
    expect(tank.position.y).toBeLessThan(state.tank.position.y)
    expect(tank.position.x).toBe(state.tank.position.x)
  })

  it('should move down', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 50, y: 100 },
        direction: Direction.Down,
      },
    }

    const { tank } = reducer(state, actions.tick())
    expect(tank.position.y).toBeGreaterThan(state.tank.position.y)
    expect(tank.position.x).toBe(state.tank.position.x)
  })

  it('should move right', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 50, y: 50 },
        direction: Direction.Right,
      },
    }

    const { tank } = reducer(state, actions.tick())
    expect(tank.position.x).toBeGreaterThan(state.tank.position.x)
    expect(tank.position.y).toBe(state.tank.position.y)
  })

  it('should move left', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 100, y: 50 },
        direction: Direction.Left,
      },
    }

    const { tank } = reducer(state, actions.tick())
    expect(tank.position.x).toBeLessThan(state.tank.position.x)
    expect(tank.position.y).toBe(state.tank.position.y)
  })

  it('should has up limit', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 0, y: 0 },
        direction: Direction.Up,
      },
    }

    expect(reducer(state, actions.tick())).toEqual(state)
  })

  it('should has down limit', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 0, y: 2000 },
        direction: Direction.Down,
      },
    }

  const { tank } = reducer(state, actions.tick())
    expect(tank.position.y).toBeLessThanOrEqual(state.tank.position.y)
    expect(tank.position.x).toBe(state.tank.position.x)
  })

  it('should has left limit', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 0, y: 0 },
        direction: Direction.Left,
      },
    }

    expect(reducer(state, actions.tick())).toEqual(state)
  })

  it('should has right limit', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 2000, y: 0 },
        direction: Direction.Right,
      },
    }

    const { tank } = reducer(state, actions.tick())
    expect(tank.position.x).toBeLessThanOrEqual(state.tank.position.x)
    expect(tank.position.y).toBe(state.tank.position.y)
  })
})

describe('ChangeDirection:', () => {
  it('should change direction to right', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 0, y: 0 },
        direction: Direction.Up,
      },
    }

    const { tank } = reducer(state, actions.changeDirection(Direction.Right))
    expect(tank.direction).toBe(Direction.Right)
    expect(tank.lastDirection).toBe(Direction.Right)
  })

  it('should change direction to up', () => {
    const state: State = {
      ...defaultState,
      tank: {
        ...defaultState.tank,
        position: { x: 0, y: 0 },
        direction: Direction.Down,
      },
    }

    const { tank } = reducer(state, actions.changeDirection(Direction.Up))
    expect(tank.direction).toBe(Direction.Up)
    expect(tank.lastDirection).toBe(Direction.Up)
  })
})
