//for json data for backing up the last table
var savedData = [{}];
var data = [];
//alternating color
var light=false;
//grade mode
var mode = 1;
//increases with additional rows
var id=23000000;
var restoreCols=0;

function addRow(){
    var table = document.getElementById("myTable");
    //insert so many rows
    var row = table.insertRow(table.rows.length);
    //color
    if(light){
        row.classList.add("light");
        light=false;
    }
    else{
        row.classList.add("grey");
        light=true;
    }
    //amount of cells for the row
    var cells = [];
    for(let i = 0; i < table.rows[0].cells.length; i++){
        cells[i] = row.insertCell(i);
    }
    //for the changeable assignments
    for(let i = 2; i < (table.rows[0].cells.length) - 1; i++){
        //default text
        cells[i].innerHTML = "-";
        cells[i].classList.add("text-right");
        //needs to be editable and needs to work with my functions
        cells[i].setAttribute("contenteditable",true);
        cells[i].setAttribute("onfocusout","getAverage(),countUnsubmitted(),check(this);");
    }
    //change the rest to normal
    var endCol = table.rows[0].cells.length-1;
    cells[0].innerHTML="Student "+(--table.rows.length);
    cells[1].innerHTML=23000000+(--table.rows.length);
    cells[endCol].classList.add("text-right");
    cells[endCol].setAttribute("onclick","changeFormat()");
}

function addCol(){
    var table = document.getElementById("myTable");
    var columnIndex = table.rows[0].cells.length-1;
    for(let i = 0; i < table.rows.length; i++){
        var row = table.rows[i];
        var col = row.insertCell(columnIndex);
        col.innerHTML = "-";
        col.classList.add("text-right");
        col.setAttribute("contenteditable",true);
        col.setAttribute("onfocusout","getAverage(),countUnsubmitted(),check(this);");
    }
    //change heading to bold
    //inner text wouldnt work
    table.rows[0].cells[columnIndex].innerHTML = "<strong>Assignment "+(--columnIndex)+"</strong>";
    table.rows[0].cells[++columnIndex].style.textAlign="center";
    //console.log("col index: "+columnIndex);
    //table.rows[0].cells[columnIndex].style.FontWeight="bold";
}
function getAverage(){
    var table = document.getElementById("myTable");
    //for each row except heading
    for(let i = 1; i < table.rows.length; i++){
        var total = 0;
        var assignments = (table.rows[i].cells.length-1)-2;
        //all individual assignments
        for(let j = 2; j < assignments+2;j++){
            //if not a number or empty, it should be centered
            if(isNaN(table.rows[i].cells[j].innerText)||table.rows[i].cells[j].innerText==""){
                table.rows[i].cells[j].style.textAlign = "center";
            }
            else{
                total+=parseInt(table.rows[i].cells[j].innerText);
                table.rows[i].cells[j].style.textAlign = "right";
            }
        }
        var average = Math.floor(total/assignments);
        table.rows[i].cells[assignments+2].innerHTML=average;
        //fail case
        if(Math.floor(total/assignments)<60){
            //1(i)(b)
            table.rows[i].cells[assignments+2].style.backgroundColor="red";
            table.rows[i].cells[assignments+2].style.color="white";
            //console.log(total/assignments);
        }
        //use right color to change back
        else{
            table.rows[i].cells[assignments+2].style.backgroundColor=table.rows[i].getAttribute("color");
            table.rows[i].cells[assignments+2].style.color="black";
        }
    }
}
function countUnsubmitted(){
    //for each row except heading
    var count = 0;
    var table = document.getElementById("myTable");
    for(let i = 1; i < table.rows.length; i++){
        var assignments = (table.rows[i].cells.length-1)-2;
        for(let j = 2; j < assignments+2;j++){
            if(isNaN(table.rows[i].cells[j].innerText)||table.rows[i].cells[j].innerText==""){
                count++;
                table.rows[i].cells[j].style.backgroundColor="yellow";
            }
            else{
                table.rows[i].cells[j].style.backgroundColor=table.rows[i].getAttribute("color");
            }
        }
        //update html text
        document.getElementById("due").innerHTML="Assignments unsubmitted: "+count;
    }
}
//general maintenance once rows are added, etc.
function update(x){
    //console.log("updating");
    check(x);
    countUnsubmitted();
    getAverage();
}
function update(){
    countUnsubmitted();
    getAverage();
}
//if cell text is not acceptable, change to default (unsubmitted)
function check(x){
    console.log("checking "+x.innerText);
    if(isNaN(x.innerText)||x.innerText==""){

        x.innerText = "-";
        x.setAttribute("contenteditable",true);
    }
    else if(x.innerText < 0 || x.innerText > 100){

        x.innerText = "-";
        x.setAttribute("contenteditable",true);
        //prevents bug
        update();
    }
    else{

    }
}
//grade systems
function changeFormat(){
    var table = document.getElementById("myTable");
    var endCol = table.rows[0].cells.length-1;
    if(mode<3){
        mode++;
    }
    //loop back
    //if it shows a 4.0 GPA for unsubmitted click it three times and it'll fix
    else{
        mode=1;
    }
    //grade conversion
    switch(mode){
        case 1: table.rows[0].cells[endCol].innerHTML="<strong>"+"Average [%]"+"</strong>"; 
            getAverage();
        break;
        case 2: table.rows[0].cells[endCol].innerHTML="<strong>"+"Average [Letter]"+"</strong>"; 
            for(let i = 1; i < table.rows.length; i++){
                var x = parseInt(table.rows[i].cells[endCol].innerText);
                if(x<60){
                    table.rows[i].cells[endCol].innerText="F";
                }
                else if(x<63){
                    table.rows[i].cells[endCol].innerText="D-";
                }
                else if(x<67){
                    table.rows[i].cells[endCol].innerText="D";
                }
                else if(x<70){
                    table.rows[i].cells[endCol].innerText="D+";
                }
                else if(x<73){
                    table.rows[i].cells[endCol].innerText="C-";
                }
                else if(x<77){
                    table.rows[i].cells[endCol].innerText="C";
                }
                else if(x<80){
                    table.rows[i].cells[endCol].innerText="C+";
                }
                else if(x<83){
                    table.rows[i].cells[endCol].innerText="B-";
                }
                else if(x<87){
                    table.rows[i].cells[endCol].innerText="B";
                }
                else if(x<90){
                    table.rows[i].cells[endCol].innerText="B+";
                }
                else if(x<93){
                    table.rows[i].cells[endCol].innerText="A-";
                }
                else if(x<101){
                    table.rows[i].cells[endCol].innerText="A";
                }
                else{
                    table.rows[i].cells[endCol].innerText="-";
                }
            }
        break;
        case 3: table.rows[0].cells[endCol].innerHTML="<strong>"+"Average [4.0]"+"</strong>";{
            for(let i = 1; i < table.rows.length; i++){
                var x = table.rows[i].cells[endCol].innerText;
                if(x=="F"){
                    table.rows[i].cells[endCol].innerText="0.0";
                }
                else if(x=="D-"){
                    table.rows[i].cells[endCol].innerText="0.7";
                }
                else if(x=="D"){
                    table.rows[i].cells[endCol].innerText="1.0";
                }
                else if(x=="D+"){
                    table.rows[i].cells[endCol].innerText="1.3";
                }
                else if(x=="C-"){
                    table.rows[i].cells[endCol].innerText="1.7";
                }
                else if(x=="C"){
                    table.rows[i].cells[endCol].innerText="2.0";
                }
                else if(x=="C+"){
                    table.rows[i].cells[endCol].innerText="2.3";
                }
                else if(x=="B-"){
                    table.rows[i].cells[endCol].innerText="2.7";
                }
                else if(x=="B"){
                    table.rows[i].cells[endCol].innerText="3.0";
                }
                else if(x=="B+"){
                    table.rows[i].cells[endCol].innerText="3.3";
                }
                else if(x=="A-"){
                    table.rows[i].cells[endCol].innerText="3.7";
                }
                else{
                    table.rows[i].cells[endCol].innerText="4.0";
                }
            }
        break;
        }
    }
}
function backUp(table){
    //needed to write json
    savedData = [{}];
    data = [];
    var titles = [];
    //get titles to store each ones attributes
    for(let i = 0; i < table.rows[0].cells.length; i++){
        //store each title in header row
        titles[i] = table.rows[0].cells[i].innerText;
    }

    for(let i = 0; i < table.rows.length;i++){
        var row = table.rows[i];
        //data for each normal row
        var rData = {};
        for(let j = 0;j < row.cells.length;j++){
            rData[j] = row.cells[j].innerText;
        }
        data.push(rData);
    }
    savedData = JSON.stringify(data);
    // console.log("parsed");
    // console.log(savedData);
    restoreCols=table.rows[0].cells.length;
    return data;
}
function restore(table){
    //access json data as an array
    var backup=JSON.parse(savedData);
    //clear rows and columns and add in the data
    var oldTable = table;
    var rowCount = table.rows.length;
    //delete existing table
    while(table.rows.length > 0){
        for(let i = 0; i < table.rows[0].cells.length;i++){
            table.rows[0].deleteCell(0);
        }
        table.deleteRow(0);
    }
    console.log("stopped deleting data");
    //add new data
    for(let i = 0; i < backup.length; i++){
        var row = table.insertRow();
        for(let j = 0; j < restoreCols; j++){
            var cell = row.insertCell();
            //update data cell
            cell.innerHTML=backup[i][j];
        }
    }
    console.log(oldTable);
    update();
    restoreTable(oldTable,table);
}
function restoreTable(oldTable,newTable){
    //make colors right upon restoring
    var assignments = (newTable.rows[0].cells.length-1)-2;
    var columnIndex = newTable.rows[0].cells.length-1;
    light=false;
    for(let i = 0; i < newTable.rows.length; i++){
        if(i==0){
            for(let j = 0; j < newTable.rows[0].cells.length;j++){
                newTable.rows[i].style.backgroundColor="darkgray";
            }
        }
        else if(i%2==1){
            for(let j = 0; j < newTable.rows[0].cells.length;j++){
                newTable.rows[i].style.backgroundColor="#7393B3";
            }
        }
        else{
            for(let j = 0; j < newTable.rows[0].cells.length;j++){
                newTable.rows[i].style.backgroundColor="#F0FFFF";
            }
        }
    }
    //set editable and align
    for(let i = 1; i < newTable.rows.length; i++){
        for(let j = 2; j < assignments+2;j++){
            if(isNaN(newTable.rows[i].cells[j].innerText)||newTable.rows[i].cells[j].innerText==""){
                newTable.rows[i].cells[j].style.textAlign = "center";
            }
            else{
                newTable.rows[i].cells[j].style.textAlign = "right";
            }
            newTable.rows[i].cells[j].setAttribute("contenteditable",true);
            newTable.rows[i].cells[j].classList.add("text-right");
            newTable.rows[i].cells[j].setAttribute("onfocusout","getAverage(),countUnsubmitted(),check(this);");
            //console.log("parsed"+parseInt(table.rows[i].cells[j].innerText));
        }
    }
    //grade system
    for(let i = 0; i < newTable.rows.length; i++){
        newTable.rows[i].cells[assignments+2].setAttribute("onclick","changeFormat()");
        if(i>=1)
            newTable.rows[i].cells[assignments+2].style.textAlign="right";
    }
    //heading format
    for(let i = 0; i < newTable.rows[0].cells.length; i++ ){
        newTable.rows[0].cells[i].style.textAlign="center";
        var temp = newTable.rows[0].cells[i].innerHTML;
        newTable.rows[0].cells[i].innerHTML="<strong>"+temp+"</strong>";
    }
}
