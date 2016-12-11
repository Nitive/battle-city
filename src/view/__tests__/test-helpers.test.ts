import { div } from '@cycle/dom'

import { toHTML } from './test-helpers'

describe('toHTML', () => {
  it('should work', () => {
    return toHTML(div(['123']))
      .then(html => {
        expect(html).toBe('<div>123</div>')
      })
  })

  // * Use this way *
  it('should work with async/await', async () => {
    const html = await toHTML(div(['123']))
    expect(html).toBe('<div>123</div>')
  })
})
