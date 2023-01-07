import { useEffect, useState } from "react";
import "./App.css";
import Document from "./Document.js"

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
