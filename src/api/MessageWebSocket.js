import { bus } from '../main'

class MessageWebSocket {
  static instance = null
  ws = null

  static getInstance() {
    if (!MessageWebSocket.instance) {
      MessageWebSocket.instance = new MessageWebSocket()
    }
    return MessageWebSocket.instance
  }

  connect(userId) {
    if (this.ws) {
      this.disconnect()
    }

    this.ws = new WebSocket(`ws://10.251.254.187:9995/ws/messages/?user_id=${userId}`)
    
    this.ws.onopen = () => {
      console.log('WebSocket connected')
    }

    this.ws.onmessage = (message) => {
      console.log('WebSocket message received:', message)
      bus.emit('message-received', JSON.parse(message.data))
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected')
      this.ws = null;
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    }
  }
}

export default MessageWebSocket.getInstance()
  