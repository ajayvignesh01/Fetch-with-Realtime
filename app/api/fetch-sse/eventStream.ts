import { NextRequest } from 'next/server'

export function eventStream(request: NextRequest) {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  /**
   * Send updates to client
   * @param message - string message to display in toast
   * @param progress - number progress to display in button progress
   */
  async function update(message: string, progress: number) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ complete: false, success: false, message, progress })
      await writer.write(encoder.encode(`${data}\n`))
    }
  }

  /**
   * Send error to client
   * @param message - string message to display in toast
   * @param progress - number progress to display in button progress
   */
  async function error(message: string, progress: number) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ complete: true, success: false, message, progress })
      await writer.write(encoder.encode(`${data}\n`))

      // return
    }
  }

  /**
   * Send success to client
   * @param message - string message to display in toast
   * @param progress - number progress to display in button progress
   */
  async function success(message: string, progress: number) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ complete: true, success: true, message, progress })
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
    update,
    error,
    success,
    close
  }
}
