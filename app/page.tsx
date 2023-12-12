'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {ModeToggle} from "@/components/mode-toggle";
import {useReadableStream} from "@/lib/useReadableStream";

export default function Home() {
    const { fetcher, data, isLoading } = useReadableStream('api/fetch-sse', 'fetch-sse')

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')]">
            <div className='absolute top-4 right-4'>
                <ModeToggle />
            </div>
            <Button
                variant={'outline'}
                type='submit'
                disabled={isLoading}
                onClick={fetcher}
                className={`w-[60%] rounded-b-none border-b-0`}
            >
                Fetch with SSE
            </Button>
            <Progress value={data.progress} className='h-1 w-[60%] rounded-none rounded-b-md' />
        </div>
    )
}
