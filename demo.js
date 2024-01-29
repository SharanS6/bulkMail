
//input file 
const fileInput=document.getElementById("excelfile")



//on change
fileInput.addEventListener("change",function(event){
const file=event.target.files[0]

//to read the file
const reader=new FileReader()

reader.onload=function(e){
    const data =e.target.result
    
//to convert binary
    //from cdn
    const workbook=XLSX.read(data,{
        type: "binary",
});
    const sheetName=workbook.SheetNames[0]
    const worksheet=workbook.Sheets[sheetName]
    
    const emailist =XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    console.log(emailist[0].A)

}


reader.readAsBinaryString(file)

})