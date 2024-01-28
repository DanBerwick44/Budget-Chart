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

function graphTypeSelector(){
    return document.getElementById('graphType').value
}

function sortData(inputFile, outputType){
    //Compatible with csv's as formatted by Monarch
    let results = []
    inputFile.forEach(element => {


        if (element.Spending == undefined){return} //handles that pesky null-value entry in the csv
        let workingValue = element[outputType]
        
        if (document.getElementById('toggleSpendingTotal').checked == false){ 
            if (element.MERCHANT == 'Total'){return}
        }

        if (outputType == 'Spending'){  //trims dollar-sign on monetary values
            workingValue = workingValue.slice(1)
        }
            results.push(workingValue);
            console.log("sorting data in category",outputType)
    });
    return results

    }
//Add function to sort 'check' and non-discretionary costs as a single element.
//Still need to condense duplicates


function buildChart(parsedData){
    let myChart = document.getElementById('myChart').getContext('2d');

    new Chart(myChart, {
        type: graphTypeSelector(),
        data:{
            labels:sortData(parsedData,'MERCHANT'),
            datasets:[{
                label: 'spending $',
                data:sortData(parsedData,'Spending')

            }]
        },
        options:{}
    })}

    // drop menu to change graph type
    // checkbox for total