import './App.css'
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

function App() {
  useEffect(() => {
    themeChange(true)
    // 👆 false parameter is required for react project
  }, [])
  // const ref = useRef<HTMLDivElement | string>('\0x0')
  // useEffect(() => {
    
  //   new Q(ref.current, {
  //     theme: "snow",
  //     placeholder:"kk"
  //   })
  // },[]) 
  
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Click
          <svg
            width="12px"
            height="12px"
            className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <button
              className="btn"
              data-set-theme="lofi"
              data-act-class="ACTIVECLASS"
            >
              lofi
            </button>
          </li>
          <li>
            <a data-set-theme="dark" data-act-class="ACTIVECLASS">
              Dark
            </a>
          </li>
        </ul>
      </div>
      {/* <ReactQuill theme='snow'></ReactQuill> */}
    </>
  );
}

export default App
