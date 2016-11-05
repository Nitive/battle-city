// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'
import { makeKeyboardDriver } from 'cycle-keyboard'

function main({ keyboard }) {
  const action$ = xs.merge(
    keyboard.downs('up').mapTo(+1),
    keyboard.downs('down').mapTo(-1)
  )

  const position$ = action$.fold((sum, x) => sum + x, 0)

  const vdom$ = position$.map(position => {
    return div(`Position is ${position}`)
  })

  return {
    DOM: vdom$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keyboard: makeKeyboardDriver(),
})
