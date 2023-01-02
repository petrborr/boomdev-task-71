import { useEffect, useRef, useState } from "react";
import "./App.css";

const ContentStyle = {
  overflowY: "scroll",
  width: "400px",
  height: "400px",
}

function Document({title, contents}) {
  const targetP = useRef()
  const contentRef = useRef(null)
  const [isEnabled, setIsenabled] = useState(false)
  
  useEffect(()=>{
    const options = {
      threshold: 1
    }
    const target = targetP.current
    const observer = new IntersectionObserver((entries, observer)=>{
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

function App() {
  const title = "Terms and Conditions"
  const [contents, setContents] = useState(null)

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetch("https://jaspervdj.be/lorem-markdownum/markdown.txt")
      const text =  await response.text()
      setContents(text)
    }
    fetchResponse()
  }, [])
  
  return (
    <div className="App">
      <section className="hero">
        <div className="hero-body">
          <p className="title">A React Task</p>
          <p className="subtitle">by Boom.dev</p>
        </div>
      </section>
      <div className="container is-fullhd">
        <div className="notification">
          Edit the <code>./src</code> folder to add components.
        </div>
      </div>
      {contents!==null && 
        <Document title={title} contents={contents}/>
      }
      
    </div>
  );
}

export default App;
