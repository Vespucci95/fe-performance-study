import { useEffect, useRef } from 'react';

export function useLazyImageLoad() {
    const imgRef = useRef(null)

    useEffect(() => {
        const options = {}
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && entry.target.tagName === 'IMG') {
                    entry.target.src = entry.target.dataset.src
                    observer.unobserve(entry.target)
                }
            })
        }

        const observer = new IntersectionObserver(callback, options)

        observer.observe(imgRef.current)

        return () => observer.disconnect()
    },[])

    return imgRef
}
