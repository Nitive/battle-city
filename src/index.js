// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'
import { makeKeyboardDriver } from 'cycle-keyboard'
import { updatePosition } from './utils/position'

function main({ keyboard }) {
  const speed = 5
  const action$ = xs.merge(
    keyboard.downs('up').mapTo({ x: +speed, y: 0 }),
    keyboard.downs('down').mapTo({ x: -speed, y: 0 }),
    keyboard.downs('left').mapTo({ x: 0, y: -speed }),
    keyboard.downs('right').mapTo({ x: 0, y: +speed }),
  )

  const start = { x: 0, y: 0 }

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
