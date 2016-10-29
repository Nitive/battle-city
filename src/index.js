// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'

export const sum = (...args: number[]) => {
  return args.reduce((acc, x) => acc + x, 0)
}

function main() {
  return {
    DOM: xs.of(div('Hello, world!')),
  }
}

run(main, { DOM: makeDOMDriver('#app') })
