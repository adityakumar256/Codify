"use client"
import { useEffect, useRef, useState } from "react"

export default function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false) // 👈 जब user upar jaye → invisible again
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}





// "use client"
// import { useEffect, useRef, useState } from "react"

// export default function useScrollReveal(threshold = 0.15) {
//   const ref = useRef(null)
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true)
//             observer.unobserve(entry.target)
//           }
//         })
//       },
//       {
//         threshold,
//         rootMargin: "0px 0px -10% 0px", // smoother early reveal
//       }
//     )

//     if (ref.current) observer.observe(ref.current)
//     return () => observer.disconnect()
//   }, [])

//   return { ref, isVisible }
// }
