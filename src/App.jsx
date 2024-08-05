import { Button as Btn } from "@mui/joy";
import {  Box} from "@mui/material";
import Child from "./Chlid"
import "@emotion/react";
import "three";
import { NodeREPL } from "@opentf/react-node-repl";
import "@opentf/react-node-repl/lib/style.css";
function App() {
  const code = `console.log("Hello World")`;
  // const deps = ["pkg1", "pkg2@1.2.3", "pkg3@beta"];

  return (
  <>


   <NodeREPL code={code} deps={[]} layout="SPLIT_PANEL" console={{show:true}} />;

  </>
  )
}

export default App
