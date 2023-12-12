import { NextRequest } from 'next/server'

export function eventStream(request: NextRequest) {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  async function update(complete: boolean, success: boolean, message: string, progress: number) {
    if (!request.signal.aborted) {
      const data = JSON.stringify({ complete, success, message, progress })
      await writer.write(encoder.encode(data))
    }
  }

  return {
    readable: stream.readable,
    update,
    close: async () => await writer.close()
  }
}
