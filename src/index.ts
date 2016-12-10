import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, DOMSource, VNode } from '@cycle/dom'
import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { model, intent } from './state'
import { view } from './view'

export type Sources = {
  DOM: DOMSource,
  keys: KeysSource,
}

export type Sinks = {
  DOM: Stream<VNode>,
}

function main(sources: Sources): Sinks {
  return {
    DOM: view(model(intent(sources))),
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keys: makeKeysDriver(),
})
