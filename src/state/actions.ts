import { Direction } from './utils/direction'

export type ChangeDirectionAction
  = { type: 'ChangeDirection', payload: { direction?: Direction } }

export function changeDirection(direction: Direction): ChangeDirectionAction {
  return {
    type: 'ChangeDirection',
    payload: { direction },
  }
}

export type TickAction
  = { type: 'Tick' }

export function tick(): TickAction {
  return { type: 'Tick' }
}

export type Action
  = ChangeDirectionAction
  | TickAction
