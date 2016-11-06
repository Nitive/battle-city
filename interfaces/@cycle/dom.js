declare module '@cycle/dom' {
  declare module.exports: {
    div(text: string, children: any[]): Object;
    makeDOMDriver(selector: string): Object;
  }
}
