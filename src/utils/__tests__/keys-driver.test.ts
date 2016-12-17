import { makeKeysDriver, KeyCode } from '../keys-driver'

type KeyEventType = 'keydown' | 'keyup' | 'keypress'

function keyEvent(type: KeyEventType, keyCode: number) {
  const spaceDown = new KeyboardEvent(type, { keyCode } as any)
  document.dispatchEvent(spaceDown)
}

describe('keysDriver', () => {
  it('down', done => {
    const driver = makeKeysDriver()
    const keys$ = driver()

    keys$
      .down(KeyCode.Space)
      .addListener({
        next(event) {
          expect(event.keyCode).toBe(32)
          done()
        },
        error: done,
        complete: () => {
          throw new Error('should not complete')
        },
      })

      keyEvent('keydown', 32)
  })

  it('up', done => {
    const driver = makeKeysDriver()
    const keys$ = driver()

    keys$
      .up(KeyCode.Space)
      .addListener({
        next(event) {
          expect(event.keyCode).toBe(32)
          done()
        },
        error: done,
        complete: () => {
          throw new Error('should not complete')
        },
      })

      keyEvent('keyup', 32)
  })

  it('press', done => {
    const driver = makeKeysDriver()
    const keys$ = driver()
    let down = false

    keys$
      .press(KeyCode.Space)
      .addListener({
        next(isPressed) {
          if (down) {
            expect(isPressed).toBe(true)
          } else {
            expect(isPressed).toBe(false)
            done()
          }
        },
        error: done,
        complete: () => {
          throw new Error('should not complete')
        },
      })

    down = true
    keyEvent('keydown', 32)
    down = false
    keyEvent('keyup', 32)
  })
})
