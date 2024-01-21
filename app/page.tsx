'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {ModeToggle} from "@/components/mode-toggle";
import {useFetchRealtime} from "@/lib/useFetchRealtime";
import {StreamData} from "@/lib/types";
import {toast} from "sonner";

export default function Home() {
    const {data, isLoading, fetcher } = useFetchRealtime('api/realtime', {method: 'POST', body: JSON.stringify({})}, toaster)

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
            <Progress value={data.data.progress} className='h-1 w-[60%] rounded-none rounded-b-md' />
        </div>
    )
}

function toaster(data: StreamData) {
    if (data.event === 'message') {
        toast.loading(data.data.message, {
            id: 'realtime',
            position: 'top-center',
            duration: 10000
        })
    }
    else if (data.event === 'success') {
        toast.success(data.data.message, {
            id: 'realtime',
            position: 'top-center',
            duration: 4000
        })
    }
    else if (data.event === 'error') {
        toast.error(data.data.message, {
            id: 'realtime',
            position: 'top-center',
            duration: 4000
        })
    }
}
