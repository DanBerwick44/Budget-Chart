var activeFile = []
function parseData(activeFile){

    Papa.parse(activeFile,{
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

document.getElementById('file').addEventListener('change', function (Event){
    activeFile = Event.target.files[0]
    
    parseData(activeFile)
    //Papa.parse(Event.target.files[0],{
    //    dynamicTyping: false,
     //   header: true,
    //    complete: function(results){
    //        console.log('data parse complete')
      //      var parsedData = results.data
    //        buildChart(parsedData)
        //console.log(parsedData)
       // }
            
             
        })
//}
//)

function resetCanvas(){
    document.getElementById('spendingChart').remove()
    let newCanvas = document.createElement('canvas')
    newCanvas.setAttribute('id', 'spendingChart')
    document.getElementById('canvasContainer').appendChild(newCanvas)
    parseData(activeFile)
}

const updateTriggers = document.getElementsByClassName('updateTrigger')
for(let i=0; i<updateTriggers.length; i++){
    updateTriggers[i].addEventListener('change', resetCanvas)
}

addEventListener('change', resetCanvas())
// Updates chart on any change to objects in a class

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
    let spendingChart = document.getElementById('spendingChart').getContext('2d');

    new Chart(spendingChart, {
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