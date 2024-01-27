document.getElementById('file').addEventListener('change', function(Event){
 
    console.log('File obtained:', Event.target.files[0])
    
    Papa.parse(Event.target.files[0],{
        dynamicTyping: false,
        header: true,
        complete: function(results){
            console.log('data parse complete')
            var parsedData = results.data
            buildChart(parsedData)
        console.log(parsedData)
        }
            
             
        })
}
)

function sortData(inputFile, outputType){
    //Compatible with csv's as formatted by Monarch
    let results = []
    let category = outputType
    inputFile.forEach(element => {
            results.push(element[outputType]);
            console.log("sorting data in category",category)
    });
    return results

    }



function buildChart(parsedData){
    let myChart = document.getElementById('myChart').getContext('2d');

    new Chart(myChart, {
        type:'bar',
        data:{
            labels:sortData(parsedData,'MERCHANT'),
            datasets:[{
                label: 'spending $',
                data:sortData(parsedData,'Spending')

            }]
        },
        options:{}
    })}