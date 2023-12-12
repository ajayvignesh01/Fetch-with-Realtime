import { eventStream } from './eventStream'
import { delay } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const stream = eventStream(request)

  async function action() {
    await stream.update(false, false, 'Hello from the Server', 0)

    await delay(1000) // fake api request
    await stream.update(false, false, 'Server Sent Event 1', 25)

    await delay(1000) // fake api request
    await stream.update(false, false, 'Server Sent Event 2', 50)

    await delay(1000) // fake api request
    await stream.update(false, false, 'Server Sent Event 3', 75)

    await delay(1000) // fake api request
    await stream.update(true, true, 'Bye to the Client', 100)
  }

  action().then(() => {
    if (!request.signal.aborted) stream.close()
  })

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform'
    }
  })
}
