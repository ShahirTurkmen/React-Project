import "./index.css";
import { WebContainer,FitAddon } from "../webcontainer-api/dist";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

async function webcontainerInit() {
  const webcontainer = await WebContainer.boot({workdirName:"hello",coep:"none"});
  return webcontainer;
}
/* <html>
  <head>
    <title>Plotly Example</title>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.2/plotly.min.js"
      charset="utf-8"
    ></script>
  </head>
  <body>
    <div>
      <pre><code id="out">Loading webR, please wait...</code></pre>
    </div>
    
    <script type="module">
      import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs';
      const webR = new WebR({ interactive: false });
      await webR.init();
      const outElem = document.getElementById('out');
      outElem.innerText = 'Loading plotly, please wait...';
      await webR.installPackages(['jsonlite', 'ggplot2', 'plotly'], true);
      outElem.innerText = 'Generating plot, please wait...';
      const plotlyData = await webR.evalRString(`
library(plotly)
library(ggplot2)

p <- ggplot(mpg, aes(displ, hwy, colour = class)) +
  geom_point()

plotly_json(p, pretty = FALSE)
`);
      outElem.replaceChildren();
      Plotly.newPlot('out', JSON.parse(plotlyData), {});
    </script>
  </body>
</html> */

const files = {
  "index.js": {
    file: {
      contents: `
      console.log('hello')
      `,
    },
  },
  "package.json": {
    file: {
      contents: `
  {
    "name": "example-app",
    "type": "module"
  }`,
    },
  },
};
async function startShell(webcontainer, terminal) {
  const shellProcess = await webcontainer.spawn("bash", {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  });

  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  const input = shellProcess.input.getWriter();
  terminal.onData((data) => {
    input.write(data);
  });

  return shellProcess;
}
const fitAddon = new FitAddon();

function App() {
  const terminalRef = useRef();
  useEffect(() => {
    const terminalEl = terminalRef.current
    window.onload = async () => {
      const webcontainer = await webcontainerInit();
      const shellProcess = await startShell(webcontainer, terminal);
      console.log(webcontainer)
      window.addEventListener("resize", () => {
        fitAddon.fit();
        shellProcess.resize({
          cols: terminal.cols,
          rows: terminal.rows,
        });
      });
    };
    const terminal = new Terminal({
      convertEol: true,
    });
    terminal.loadAddon(fitAddon);
    console.log(terminalEl)
    terminal.open(terminalEl);
  fitAddon.fit();
  }, []);
  return (
    <>
      <div className="xterm" ref={terminalRef}></div>
    </>
  );
}
export default App;