'use client'

import { useState } from 'react'
import {StreamData} from "@/lib/types";

export function useFetchRealtime(
    input: string | URL | Request,
    init?: RequestInit | undefined,
    onEvent?: (data: StreamData) => any
) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [data, setData] = useState<StreamData>({
        event: 'message',
        data: {message: '', progress: 0}
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
                if (onEvent) onEvent(data)
            })
        }
        setIsLoading(false)
    }

    return { fetcher, data, isLoading }
}
