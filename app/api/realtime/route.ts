import { realtimeStream } from './realtimeStream'
import { delay } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import {Stream} from "@/lib/types";

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const stream = realtimeStream(request)

  action(stream, request).then(() => stream.close())

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform'
    }
  })
}

async function action(stream: Stream, request: NextRequest) {
  await stream.message('Hello from the Server', 0)

  await delay(1000) // fake api request
  await stream.message('Server Sent Event 1', 25)

  await delay(1000) // fake api request
  await stream.message('Server Sent Event 2', 50)

  await delay(1000) // fake api request
  await stream.message('Server Sent Event 3', 75)

  await delay(1000) // fake api request
  await stream.success('Bye to the Client')
}
