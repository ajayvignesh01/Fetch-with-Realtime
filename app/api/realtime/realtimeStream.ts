import { NextRequest } from 'next/server'

export function realtimeStream(request: NextRequest) {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  /**
   * Send updates to client
   * @param message - string message to display in toast
   * @param progress - number progress to display in button progress
   */
  async function message(message: string, progress: number) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ event: 'message', data: {message, progress} })
      await writer.write(encoder.encode(`${data}\n`))
    }
  }

  /**
   * Send error to client
   * @param message - string message to display in toast
   */
  async function error(message: string) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ event: 'error', data: {message, progress: 0} })
      await writer.write(encoder.encode(`${data}\n`))

      // return
    }
  }

  /**
   * Send success to client
   * @param message - string message to display in toast
   */
  async function success(message: string) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ event: 'success', data: {message, progress: 100}})
      await writer.write(encoder.encode(`${data}\n`))
    }
  }

  /**
   * Close the stream and terminate server process
   */
  async function close() {
    if (!request.signal.aborted) {
      await writer.close()
    }
  }

  return {
    readable: stream.readable,
    message,
    error,
    success,
    close
  }
}
