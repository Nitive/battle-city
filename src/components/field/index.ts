import { svg, VNode } from '@cycle/dom'

export const width = 800
export const height = 600

export default function field(children: VNode[]) {
  const style = {
    width,
    height,
    background: '#d8d8d8',
  }

  return svg({ style }, [
    svg.g(children),
  ])
}
