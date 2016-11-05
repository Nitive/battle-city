// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'
import { makeKeyboardDriver } from 'cycle-keyboard'

type Position = {
  x: number;
  y: number;
}

function main({ keyboard }) {
  const action$ = xs.merge(
    keyboard.downs('up').mapTo({ x: +1, y: 0 }),
    keyboard.downs('down').mapTo({ x: -1, y: 0 }),
    keyboard.downs('left').mapTo({ x: 0, y: -1 }),
    keyboard.downs('right').mapTo({ x: 0, y: +1 }),
  )

  const start: Position = { x: 0, y: 0 }

  const position$ = action$.fold((position: Position, diff) => ({
    x: position.x + diff.x,
    y: position.y + diff.y,
  }), start)

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
