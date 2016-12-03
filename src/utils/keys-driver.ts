import { Stream } from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

export const enum KeyCode {
  Space = 32,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
}

export class KeysSource {
  down(code: KeyCode): Stream<KeyboardEvent> {
    return fromEvent(document, 'keydown')
      .filter(event => event.keyCode === code)
  }
  up(code: KeyCode): Stream<KeyboardEvent> {
    return fromEvent(document, 'keyup')
      .filter(event => event.keyCode === code)
  }
}

export function makeKeysDriver () {
  return function keysDriver() {
    return new KeysSource()
  }
}