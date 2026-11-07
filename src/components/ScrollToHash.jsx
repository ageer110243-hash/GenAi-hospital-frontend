import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to #section on route change (e.g. /#services) or to top on a new page
const ScrollToHash = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToHash
