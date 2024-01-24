function sortData(input){

}

document.getElementById('file').addEventListener('change', function read(Event){
    console.log('File obtained:', Event.target)
    Papa.parse(Event.target,{
        complete: function(results){
             console.log(results)
    }
    })

})