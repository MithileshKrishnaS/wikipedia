import React,{useState,useEffect} from 'react'
var firsttime=true;

const UrlValidator = () => {
    const [inp,setInp]=useState(
        {
            value :'programming',
            result:[],
            one:[],
            two:[]
        });

    useEffect(() => {
        if (inp.value===null)
        {
            console.log('empty');
            document.getElementById("contents").style.display='none';
        }
        
        else
        {  
            if(firsttime)
            {
                if(inp.result[0]==='programming')
                {
                    firsttime=false;   
                }
                
                else{
                    document.getElementById("contents").style.display='block';
                    const timer = setTimeout(() => {
                        var path='https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='+inp.value
                                fetch(path)
                                .then(( results ) =>results.json())
                                .then((json)=>setInp({value:'programming',result:json,one:json[1],two:json[3]}))
                    }, 500);
                    return () => clearTimeout(timer);

                }  
            }

            else
            {
                
                if(inp.one===undefined)
                {    
                    document.getElementById("contents").style.display='none';
                    var set=false;
                    setTimeout(function(){
                            document.getElementById("contents").style.display='block';  
                            
                   },500);
                }                  
                    var path='https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='+inp.value
                            fetch(path)
                            .then(( results ) =>results.json())
                            .then((json)=>setInp({value:document.getElementById("wikisearch").value,result:json,one:json[1],two:json[3]}))
            }
        }        
        });
        

    return (
        <div>
            <h1>Wikipedia</h1><br></br>
            <input type="text"  value={inp.value} id="wikisearch" onChange={(e)=>{setInp(e.target.value)}}></input><br></br>
            <br></br><br></br>
            <div id="contents" className="contents">
            {inp.one&&inp.two?inp.one.map((input, index)=>
            <div className='each'>
                <a href={inp.two[index]} key={index}>{input}</a><br></br><br></br>
            </div>) :null
            }
            </div>
        </div>
    )
}

export default UrlValidator
