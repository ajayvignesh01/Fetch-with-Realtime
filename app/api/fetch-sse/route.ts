import { eventStream } from './eventStream'
import { delay } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import {Stream} from "@/lib/types";

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const stream = eventStream(request)
  const body = await request.json()

  action(stream, body).then(() => stream.close())

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform'
    }
  })
}

async function action(stream: Stream, body: any) {
  await stream.update('Hello from the Server', 0)

  await delay(1000) // fake api request
  await stream.update('Server Sent Event 1', 25)

  await delay(1000) // fake api request
  await stream.update('Server Sent Event 2', 50)

  await delay(1000) // fake api request
  await stream.update('Server Sent Event 3', 75)

  await delay(1000) // fake api request
  await stream.success('Bye to the Client', 100)
}
