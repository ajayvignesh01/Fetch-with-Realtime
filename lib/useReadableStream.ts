'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {StreamData} from "@/lib/types";

export function useReadableStream(
    input: string | URL | Request,
    init?: RequestInit | undefined,
    toastId?: string
) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [data, setData] = useState<StreamData>({
        complete: false,
        success: false,
        message: '',
        progress: 0
    })

    async function fetcher() {
        setIsLoading(true)
        const response = await fetch(input, init)
        const reader = response.body!.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { value, done } = await reader.read()
            if (done) break

            // Split the string into an array of individual JSON objects
            const stream = decoder.decode(value)
            console.log(stream)
            const jsonObjects = stream.trim().split('\n')

            // Now you can parse each JSON object
            jsonObjects.forEach((jsonStr) => {
                const data = JSON.parse(jsonStr) as StreamData
                setData(data)
                if (toastId) toaster(data, toastId)
            })
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
