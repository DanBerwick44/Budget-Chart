function sortData(input){

}

document.getElementById('file').addEventListener('change', function(Event){
 
    console.log('File obtained:', Event.target.files[0])
    
    Papa.parse(Event.target.files[0],{
        dynamicTyping: false,
        header: true,
        complete: function(results){
            console.log('data parse complete')
            var parsedData = results.data
        console.log(parsedData)
        }
            
             
        })
}
)