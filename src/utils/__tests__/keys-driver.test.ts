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
})
