const NewClient = () => {
  var ws = new WebSocket('ws://localhost:8080/v1/ws')
  ws.onopen = () => {
    console.log('open')
  }
  ws.onclose = () => {
    console.log('close')
  }
  ws.onerror = (e) => {
    console.log(e)
  }
  return ws
}
export {NewClient}

