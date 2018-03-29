/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

// Step 1. Using data type 2D Array to store the 25 characters
let characters=[
    ["e","t","a","n","d"],
    ["o","i","r","u","c"],
    ["s","h","m","f","p"],
    ["l","y","g","v","j"],
    ["w","b","x","q","z"]
];


let red=0;
let green=0;
let blue=0;
var listening={
    tapgap:[],
    timing:[]
};
let output="";
let totaltime=0;
let code="";
let final=[];
let finalcode=[];

let rxcodeRef=document.getElementById("rx-code");
let rxtranslatedRef=document.getElementById("rx-translated");

_listen = function(event)
{
	for (let i=0; i<1600; i=i+4)
        {
            red+=event.detail.data[i];
            green+=event.detail.data[i+1];
            blue+=event.detail.data[i+2];
        }
    
    avg=(red+green+blue)/1200;
    
    
    if (avg<(255/2))
        {
            listening.tapgap.push("Black");
            listening.timing.push(event.timeStamp);
        }
    else
        {
            listening.tapgap.push("White");
            listening.timing.push(event.timeStamp);
            
        }
    
    listeninglength=listening.tapgap.length;
    code="";    
    for(i=0; i<listeninglength; i++)
        {
            if(listening.tapgap[i]=="Black")
                {
                    if (code!=="")
                        {
                            totaltime+=listening.timing[i]-listening.timing[i-1];
                        }
                }
            else if(listening.tapgap[i]=="White")
                {
                    if(listening.tapgap[i-1]!=="White")
                        {
                            code+="*";
                            totaltime=0;
                        }
                }
            
            if (totaltime>450 && totaltime<600)
                {
                    code+=" ";
                }
        }
    
    
    
    
    
    
    
    red=0;
    green=0;
    blue=0;
    
    
    
   
};

/**
 * Your header documentation here for clear
 */
clear = function()
{
    
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
    rxcodeRef.innerHTML=code;
	code=code.split(" ");
    for (let j=0;j<code.length;j++)
        {
            if (code[j]!=="")
                {
                    finalcode.push(code[j].length);
                }
        }
    
    for(i=0; i<finalcode.length;i+=2)
        {
            output += characters[finalcode[i]-1][finalcode[i+1]-1];
        }
    
    
    output=output.replace(/wuw/g," ");
    output=output.replace(/qc/g,"k");
        
    
    rxtranslatedRef.innerHTML=output;
    
    
};