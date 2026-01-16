'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    ym: any
  }
}

export default function YandexMetrika({ id }: { id: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(id, 'hit', url)
    }
  }, [pathname, searchParams, id])

  return null
}
