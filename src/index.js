// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'
import { makeKeyboardDriver } from 'cycle-keyboard'
import { clamp } from 'ramda'

type Position = {
  x: number;
  y: number;
}

const updatePosition = (position: Position, diff: Position) => ({
  x: clamp(0, 800, position.x + diff.x),
  y: clamp(0, 600, position.y + diff.y),
})

function main({ keyboard }) {
  const speed = 5
  const action$ = xs.merge(
    keyboard.downs('up').mapTo({ x: speed, y: 0 }),
    keyboard.downs('down').mapTo({ x: -speed, y: 0 }),
    keyboard.downs('left').mapTo({ x: 0, y: -speed }),
    keyboard.downs('right').mapTo({ x: 0, y: speed }),
  )

  const start: Position = { x: 0, y: 0 }

  const position$ = action$.fold(updatePosition, start)

  const vdom$ = position$.map(position => {
    return div(`Position is ${position.x}, ${position.y}`)
  })

  return {
    DOM: vdom$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keyboard: makeKeyboardDriver(),
})
