import xs from 'xstream'
import xstreamAdapter from '@cycle/xstream-adapter'
import { span, div, makeHTMLDriver, VNode } from '@cycle/dom'


// * Use this way: *
// const html = await toHTML(div(['123']))
// expect(html).toBe('<div>123</div>')
export function toHTML(node: VNode) {
  return new Promise(resolve => {
    const driver = makeHTMLDriver(html => {
      resolve(html)
    })

    driver(xs.of(node), xstreamAdapter, 'test')
  })
}
