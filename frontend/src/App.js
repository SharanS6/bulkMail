
import { useState } from 'react';
import './App.css';
import axios from "axios"
import * as XLSX from "xlsx"
function App() {


 const [msg,setmsg]=useState("")
 const [status,setstatus]=useState(false)
const [newtotalemail,settotalemail]=useState([])

  function handlemsg(event){
    setmsg(event.target.value)

  }
  function sendmsg(){
    setstatus(true)
    axios.post("http://localhost:5000/sendmail",{msg:msg,newtotalemail:newtotalemail}).then(function(data){
      if(data.data === true)
      {
        alert("Email send successfully")
        setstatus(false)
      }
      else{
        alert("Failed")
      }
    })
  }

  function handlefile(event){
    const file=event.target.files[0]

//to read the file
const reader=new FileReader()

reader.onload=function(e){
    const data =e.target.result
    
//to convert binary
    const workbook=XLSX.read(data,{
        type: "binary",
});
    const sheetName=workbook.SheetNames[0]
    const worksheet=workbook.Sheets[sheetName]
    
    const emailist =XLSX.utils.sheet_to_json(worksheet,{header:'A'})

    const totalemail=emailist.map(function(items){
      return items.A
    })

    console.log(totalemail)
    settotalemail(totalemail)

}


reader.readAsBinaryString(file)
  }

  return (
    <div>
      <div className='bg-blue-950 text-white text-center'>
        <h1 className='text-2xl font-medium px-5 py-3'>BulkMail</h1>
      </div>

      <div className='bg-blue-800 text-white text-center'>
        <h1 className=' font-medium px-5 py-3'>We can help you business with sending multiple emails at once</h1>
      </div>

      <div className='bg-blue-600 text-white text-center'>
        <h1 className='font-medium px-5 py-3'>Drag and Drop</h1>
      </div>

      <div className='bg-blue-400 flex flex-col items-center text-black px-5 py-3'>
        <textarea value={msg} onChange={handlemsg }  className='w-[80%] h-32  outline-none px-2 py-2 border border-black rounded-sm' placeholder='Enter the email Text'></textarea>
        <div>
          <input type="file" onChange={handlefile} className='border-4 border-dashed py-4 px-4 mt-5 mb-5' />

        </div>
        <p>Total Emails in the file :{newtotalemail.length}</p>

        <button onClick={sendmsg} className='bg-blue-950 mt-2 mb-2 py-2 px-2 text-white font-medium rounded-md w-fit'>{ status?"Sending...":"Send"}</button>
      </div>


      <div className='bg-blue-300 text-white text-center p-16'>
       
      </div>
      <div className='bg-blue-200 text-white text-center p-16'>
        
      </div>

    </div>
  );
}

export default App;
