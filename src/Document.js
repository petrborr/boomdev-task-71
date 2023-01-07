import { useEffect, useRef, useState } from "react";

const ContentStyle = {
  overflowY: "scroll",
  width: "400px",
  height: "400px",
}

export default function Document({ title, contents }) {
  const targetP = useRef()
  const contentRef = useRef(null)
  const [isEnabled, setIsenabled] = useState(false)

  useEffect(() => {
    const options = {
      threshold: 1
    }
    const target = targetP.current
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0]
      // entries.forEach(entry=>{
      if (entry.isIntersecting) {
        setIsenabled(true)
        observer.unobserve(entry.target)
      }
      // })
    }, options)
    observer.observe(target)
  }, [])

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="wrapper" style={ContentStyle}>
        <div ref={contentRef} className="content">{contents}
          <div ref={targetP} className="last"></div>
        </div>
      </div>
      <button disabled={isEnabled ? false : true} type="button">I Agree</button>
    </div>
  )
}
