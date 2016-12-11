import { Direction } from '../utils/direction'
import reducer from '../reducer'
import * as actions from '../actions'

describe('Tick:', () => {
  it('should move up', () => {
    const state = {
      position: { x: 0, y: 100 },
      direction: Direction.Up,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.y).toBeLessThan(state.position.y)
    expect(newState.position.x).toBe(state.position.x)
  })

  it('should move down', () => {
    const state = {
      position: { x: 0, y: 100 },
      direction: Direction.Down,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.y).toBeGreaterThan(state.position.y)
    expect(newState.position.x).toBe(state.position.x)
  })

  it('should move right', () => {
    const state = {
      position: { x: 0, y: 0 },
      direction: Direction.Right,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.x).toBeGreaterThan(state.position.x)
    expect(newState.position.y).toBe(state.position.y)
  })

  it('should move left', () => {
    const state = {
      position: { x: 100, y: 0 },
      direction: Direction.Left,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.x).toBeLessThan(state.position.x)
    expect(newState.position.y).toBe(state.position.y)
  })

  it('should has up limit', () => {
    const state = {
      position: { x: 0, y: 0 },
      direction: Direction.Up,
    }

    expect(reducer(state, actions.tick())).toEqual(state)
  })

  it('should has down limit', () => {
    const state = {
      position: { x: 0, y: 2000 },
      direction: Direction.Down,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.y).toBeLessThanOrEqual(state.position.y)
    expect(newState.position.x).toBe(state.position.x)
  })

  it('should has left limit', () => {
    const state = {
      position: { x: 0, y: 0 },
      direction: Direction.Left,
    }

    expect(reducer(state, actions.tick())).toEqual(state)
  })

  it('should has right limit', () => {
    const state = {
      position: { x: 2000, y: 0 },
      direction: Direction.Right,
    }

    const newState = reducer(state, actions.tick())
    expect(newState.position.x).toBeLessThanOrEqual(state.position.x)
    expect(newState.position.y).toBe(state.position.y)
  })
})

describe('ChangeDirection:', () => {
  it('should change direction to right', () => {
    const state = {
      position: { x: 0, y: 0 },
      direction: Direction.Up,
    }

    const newState = reducer(state, actions.changeDirection(Direction.Right))
    expect(newState.direction).toBe(Direction.Right)
    expect(newState.lastDirection).toBe(Direction.Right)
  })

  it('should change direction to up', () => {
    const state = {
      position: { x: 0, y: 0 },
      direction: Direction.Down,
    }

    const newState = reducer(state, actions.changeDirection(Direction.Up))
    expect(newState.direction).toBe(Direction.Up)
    expect(newState.lastDirection).toBe(Direction.Up)
  })
})
