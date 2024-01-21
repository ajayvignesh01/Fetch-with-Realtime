export type StreamData = {
    complete: boolean
    success: boolean
    message: string
    progress: number
}

export type Stream = {
    readable: ReadableStream<any>
    success: (message: string, progress: number) => Promise<void>
    update: (message: string, progress: number) => Promise<void>
    error: (message: string, progress: number) => Promise<void>
    close: () => Promise<void>
}
