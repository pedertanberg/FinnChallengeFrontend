import React, { useEffect } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import Switch from "react-switch";
import axios from "axios";
 
const ImageDisplayer = () => {
    const [data,setData]=React.useState([])
    const [txtFileData,setTxtFileData]=React.useState()
    


    function getAdsData(){
        console.log(data.length)
        axios.get('https://finnchallengepedertanberg2021.azurewebsites.net/')
        .then(res =>{
            console.log(res)
            const data = res.data;
            const arr =data[0]
            const obj = data[1]
            const lineData = obj.join("\r\n")
            console.log(lineData)
            setTxtFileData(lineData)
            // array of N elements, where N is the number of rows needed
            const rows = [...Array( Math.ceil(arr.length / 4) )];
            // chunk the products into the array of rows
            const productRows = rows.map( (row, idx) => arr.slice(idx * 4, idx * 4 + 4) );
            console.log(productRows)
            setData(productRows)
            download(lineData,'adStats.txt','txt')
        },
        )
    }

    

    function download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
    




    //UseEffect dependent on the 4 attributes. If there is a change in any of them, make a new axios GET call. 
    useEffect(() => {     
        getAdsData() 
    },[]);
   

    return (
        <div>
             <div style={{display:"inline-block"}}>
                    <div style={{display:"block", justifyContent:"space-between"}}>
                        <div>Convert to Text File: </div>
                        <a onClick={()=>getAdsData()}><Icon name="download"/>Download</a>
                    </div>
                </div>
        
        <div style={{flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

            {data.map((row,index1)=>{
                console.log("row", row)
                return(
                 <div style={{marginTop:"50px", display:"inline-flex",flexDirection:"row", height:"250px", marginRight:"20px", marginLeft:"20px"}}>
                     {row.map((item,index)=>{
                         console.log("item", index1)
                         
                         return(
                            <div id="card" style={{display:"block",width:"350px", height:"250px", backgroundColor:"rgba(208,208,206,0.0)", borderRadius:"20px", border:"2px solid rgba(208,208,206,0.5)", margin:"10px 10px 0px 10px"}}>
                                <h3 style={{marginTop:"2px",borderBottom:"2px solid rgba(208,208,206,0.5)"}}><Icon style={{color:'#0063fc'}} name="tag"/>Ad Category - {item[0]}</h3>
                                <div style={{display:"flex", justifyContent:"left", margin:"5px 5px 0px 3px"}}><Icon style={{color:"#06bffc"}} name="plus"/><div style={{fontWeight:"bold", color:"#06bffc"}}>Number of Ads: </div> {item[1]}</div>
                                <div style={{display:"flex", justifyContent:"left",margin:"5px 5px 0px 3px"}}><Icon style={{color:"#06bffc"}} name="id badge outline"/><div style={{fontWeight:"bold", color:"#06bffc"}}> ID of max price: </div> {item[2]}</div>
                                <div style={{display:"flex", justifyContent:"left",margin:"5px 5px 0px 3px"}}><Icon style={{color:"#06bffc"}} name="arrow up"/><div style={{fontWeight:"bold", color:"#06bffc"}}>Max Price (NOK): </div> {item[3]}</div>
                                <div style={{display:"flex", justifyContent:"left",margin:"5px 5px 0px 3px"}}><Icon style={{color:"#06bffc"}} name="id badge outline"/><div style={{fontWeight:"bold", color:"#06bffc"}}>ID of min price: </div> {item[4]}</div>
                                <div style={{display:"flex", justifyContent:"left",margin:"5px 5px 0px 3px"}}><Icon style={{color:"#06bffc"}} name="minus"/><div style={{fontWeight:"bold", color:"#06bffc"}}> Min Price (NOK): </div>{item[5]}</div>
                                <div style={{display:"flex", justifyContent:"left",margin:"5px 5px 5px 3px"}}><Icon style={{color:"#06bffc"}} name="arrows alternate horizontal"/><div style={{fontWeight:"bold", color:"#06bffc"}}>Difference: </div> {item[6]}</div>
                                </div>
                         )
                     })}
                </div>
                )

            })}
           
               

                
      </div>
      </div>
    );
  }

 
export default ImageDisplayer;