// @ts-expect-error TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hello = () => {
  Logger.log('Hello World!')
}

// @ts-expect-error TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('Custom Menu')
    .addItem('Show dialog', 'showDialog')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi()
}

// @ts-expect-error TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const showDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog')
    .setWidth(400)
    .setHeight(300)
  SpreadsheetApp.getUi().showModalDialog(html, 'My custom dialog')
}

// @ts-expect-error TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const showSidebar = () => {
  const html =
    HtmlService.createHtmlOutputFromFile('sidebar').setTitle(
      'My custom sidebar'
    )
  SpreadsheetApp.getUi().showSidebar(html)
}
