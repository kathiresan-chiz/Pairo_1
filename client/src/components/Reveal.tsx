import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react'

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
  variant?: 'fade' | 'rise'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

// Fades content up the first time it scrolls into view.
// variant="rise" moves without fading: an ancestor with opacity < 1 disables
// backdrop-filter, so glass cards must not fade in.
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'fade', className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`${variant === 'rise' ? 'reveal-rise' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
