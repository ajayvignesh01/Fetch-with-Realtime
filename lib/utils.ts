import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
 */
export function getURL() {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    return url
}