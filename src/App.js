import React, {useState, useEffect} from 'react';
import _ from 'lodash';

function App() {
const [data, setData] =useState("Loading");
const [keyWord, setKeyWord] = useState("Loading");
useEffect(()=>{
  try {
    query({"inputs": keyWord}).then((response) => {
      const imageUrl = URL.createObjectURL(response);
      setData(imageUrl);
      console.log(imageUrl);
    });
  } catch (error) {

    console.log(error);
  }
},[keyWord]);




  async function query(d) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(d),
        }
      );
      const result = await response.blob();
            return result;
    } catch (error) {
      console.log(error);
    }
  }

  const debouncedAPICall = _.debounce((e) => {
    console.log("Arya");
    getValue(e);
  }, 200);


function getValue(e){
const value = e.target.value;
console.log(value);
setKeyWord(value);
}
  return (
    <>
    
    <main className='main' style={{width:'100vw', height:'100vh', display:'flex',flexDirection:"column", justifyContent:'center', alignItems:"center", gap:"1rem"}}>
    <input type="text" placeholder='Enter any keyword' onChange={(e)=>debouncedAPICall(e)} /> <br/>
    <img src={data} alt="" />
    </main>
    </>
  );
}

export default App;
