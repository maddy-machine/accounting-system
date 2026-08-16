'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Spline component with SSR disabled
const SplineScene = dynamic(() => import('./SplineScene'), { ssr: false })

export default function SplineSceneWrapper(props: { scene: string; className?: string; style?: React.CSSProperties }) {
  return <SplineScene {...props} />
}
