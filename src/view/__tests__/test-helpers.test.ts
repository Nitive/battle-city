import { div } from '@cycle/dom'

import { toHTML } from './test-helpers'

test('test helper toHTML', () => {
  return toHTML(div(['123']))
    .then(html => {
      expect(html).toBe('<div>123</div>')
    })
})

// Use this way
test('test helper toHTML with async/await', async () => {
  const html = await toHTML(div(['123']))
  expect(html).toBe('<div>123</div>')
})
