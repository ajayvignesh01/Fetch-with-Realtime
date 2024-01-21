export type StreamData = {
    event: 'message' | 'error' | 'success'
    data: { message: string, progress: number}
}

export type Stream = {
    readable: ReadableStream<any>,
    message: (message: string, progress: number) => Promise<void>,
    error: (message: string) => Promise<void>,
    success: (message: string) => Promise<void>,
    close: () => Promise<void>
}
