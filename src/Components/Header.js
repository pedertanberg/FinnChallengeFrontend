import React from "react";
import FinnLogo from "../Assets/finn.png"

function App() {
  return (
    <div style={{borderBottom:"2px solid #dddddd", margin:"15px 100px 50px 100px"}}>  
        <div style={{display:"grid", justifyContent:"left"}}><img width={92} height={50} src={FinnLogo}/></div>
        <div style={{display:"grid", justifyContent:"center", marginBottom:"15px"}}>Finn Challenge - Ad Analysis - Peder Tanberg Hansen </div>
    </div>
  );
}

export default App;