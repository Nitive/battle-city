// @flow

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { div, makeDOMDriver } from '@cycle/dom'

function main() {
  return {
    DOM: xs.of(div('Hello, world!')),
  }
}

run(main, { DOM: makeDOMDriver('#app') })
