'use client'

import {StreamData} from "@/lib/types";
import { getURL } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

export function useReadableStream(endpoint: string, toastId?: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [data, setData] = useState<StreamData>({
        complete: false,
        success: false,
        message: '',
        progress: 0
    })

    async function fetcher() {
        setIsLoading(true)
        const response = await fetch(getURL() + endpoint, { method: 'POST' })
        const reader = response.body!.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { value, done } = await reader.read()
            if (done) break
            const data = JSON.parse(decoder.decode(value)) as StreamData
            setData(data)
            if (toastId) toaster(data, toastId)
        }
        setIsLoading(false)
    }

    return { fetcher, data, isLoading }
}

function toaster(data: StreamData, toastId: string) {
    if (data.complete) {
        if (data.success) {
            toast.success(data.message, {
                id: toastId,
                position: 'top-center',
                duration: 4000
            })
        } else {
            toast.error(data.message, {
                id: toastId,
                position: 'top-center',
                duration: 4000
            })
        }
    } else {
        toast.loading(data.message, {
            id: toastId,
            position: 'top-center',
            duration: 10000
        })
    }
}
