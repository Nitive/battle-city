import xs, { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver, DOMSource } from '@cycle/dom'
import { makeKeyboardDriver, KeyboardSource } from 'cycle-keyboard'
import { updatePosition } from './utils/position'

interface IDrivers {
  DOM: DOMSource,
  keyboard: KeyboardSource,
}

function main({ keyboard, DOM }: IDrivers) {
  const speed = 5
  const action$ = xs.merge(
    keyboard.downs('up').mapTo({ x: +speed, y: 0 }) as any,
    keyboard.downs('down').mapTo({ x: -speed, y: 0 }) as any,
    keyboard.downs('left').mapTo({ x: 0, y: -speed }) as any,
    keyboard.downs('right').mapTo({ x: 0, y: +speed }) as any,
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
