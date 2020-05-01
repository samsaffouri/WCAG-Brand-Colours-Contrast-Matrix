    var wacgVar = 1/4.5;
    var wacgTxt = "AA Normal"
    document.getElementById("wacgLevel").addEventListener("change", wLevelFunction);
    function wLevelFunction(){
        var wacg = document.getElementById("wacgLevel").value;
        if (wacg == "aaLevel-lg" ){
            wacgVar = 1/3;
            wacgTxt = "AA Large";       
        }
        if (wacg == "aaLevel-sm" ){
            wacgVar = 1/4.5;
            wacgTxt = "AA Normal";
        }
        if (wacg == "aaaLevel-lg"  ){
            wacgVar = 1/4.5;
            wacgTxt = "AAA Large";
        }   
        if (wacg == "aaaLevel-sm"  ){
            wacgVar = 1/7;
            wacgTxt = "AAA Normal";
        }   
    return  wacgVar, wacgTxt;
    }
// function from https://stackoverflow.com/a/5624139/3695983
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// function from https://stackoverflow.com/a/9733420/3695983                     
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
    : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateRatio(cl1, cl2) {

  // read the colors and transform them into rgb format
  const color1 = cl1 ;
  const color2 = cl2 ;
  const color1rgb = hexToRgb(color1);
  const color2rgb = hexToRgb(color2);

  // calculate the relative luminance
  const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
  const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);

  // calculate the color contrast ratio
  const ratio = color1luminance > color2luminance 
  ? ((color2luminance + 0.05) / (color1luminance + 0.05))
  : ((color1luminance + 0.05) / (color2luminance + 0.05));
 
 if(ratio < wacgVar) {result='PASS';}else{ result= 'FAIL';}

  return ratio;
}

//----check----//   
var x = 2;
var dd = 2; 
var html;
var arryDiv = document.getElementById("arrayHere");
var printBtn = document.getElementById('cmd');
printBtn.addEventListener('click', saveAs);
var coloursContainer = document.getElementById('container');
//---Add Colours Functions---//
function myFunction() {
    var divInp =document.createElement("li");
    var rem = document.createElement("button");
    var input = document.createElement('INPUT')
    var picker = new jscolor(input);
        picker.fromHSV(0, 0, 0);   
    coloursContainer.appendChild(input);
    rem.setAttribute("class", "removeBtn btn btn-danger");
    rem.setAttribute("onclick", "myRemove(this)");
    divInp.setAttribute("id", "color-"+x);
    rem.innerHTML = "<span aria-hidden='true'>&times;</span>";
    divInp.appendChild(input);
    divInp.appendChild(rem);
    coloursContainer.appendChild(divInp);
    x = x+1;
    dd++;
    hideBtn(dd);
    return x;
}
//---Remove Colours Functions---//
function myRemove(el){
    var xc = coloursContainer.getElementsByTagName("li").length; 
    var element = el.parentElement;
     element.remove();
     x = x-1;
    
    for ( i = xc-2; i >= 0 ; i--){
        var elA =i +1;
        var elB ="color-" + i;
        var xcLi = coloursContainer.getElementsByTagName("li")[i];
        xcLi.setAttribute("id", elB);
    }
    dd--;
    hideBtn(dd);
    return x;
    }
//---Hide Remove Colours Button when there is 2 colours only---//   
function hideBtn(dd){
    var rmHideBtn = document.querySelectorAll(".removeBtn");
    if (dd === 2){
    rmHideBtn.forEach(function(div) {
     div.setAttribute("style", "display:none");
        });
    }else{

        rmHideBtn.forEach(function(div) {
     div.setAttribute("style", "display:block");
        });
    }
}
//---Check and create Colours Matrix---//
function CheckFunc(){
    var arr = [];
    html ="";
    arryDiv.innerHTML = "";
    var xc = coloursContainer.getElementsByTagName("li").length; 
    html += "<table id ='bypassme'><tr><th colspan = "+ xc+1 + " style='text-align:left;padding: 16px;'>Brand Colours Matrix WACG 2.0 level " + wacgTxt +" Text Size</th></tr><tr><th class='txt-90' rowspan = " + xc+1 +" >background</th></tr><tr><th colspan = "+ xc+1 + " >Font</th></tr>";
    for (i = 0 ; i <= xc-1 ; i++){
            var cc = document.getElementById("color-"+ i);
            var cc0 = cc.getElementsByTagName("input")[0].value;
            arr.push(cc0);
        }
    for(g = 0; g < arr.length; g++){
        if (g == 0){
                html += "<tr style='height:10px; padding:0px; min-width:10px;'><td colspan='2' style='height:10px;'></td>"; 
                for (yz = 0; yz < arr.length; yz++){
                html += "<td style='min-width:10px; height:10px; padding:0px; background-color:#"+ arr[yz] +"!important'></td>";        
                }
                html += "<tr><td colspan='2'></td>";    
                for (y = 0; y < arr.length; y++){
                html += "<td class='boldCell-bottom'>" + arr[y] + "</td>";      
            }
          html += "</tr>";
        }
        
        if (arr.length > g > 0 ){
                html += "<tr><td style='min-width:10px; padding:10px ; width:10px; background-color:#"+ arr[g] +"!important'></td><td class='boldCell-right'>" + arr[g] + "</td>";  
                for (x = 0; x < arr.length; x++){
                compair(arr[g], arr, x);
                }
                html += "</tr>";
        }else{
            html += "</table>";
        }   
    }        
    arryDiv.innerHTML = html;
}
//---Check Colurs Ratio---//
function compair(arrX, arr){
        calculateRatio(arrX, arr[x])

        if(result == 'PASS'){

            html += "<td style='background-color:#" 
            + arrX + 
            "!important; color:#" 
            + arr[x] + "!important;'>PASS</td>";
        }
        else{
            html += "<td></td>";
        }
    }
//---Convert Table to Image---//  
function saveAs(){
    var table= document.getElementById("bypassme");
    var noTable = document.getElementById("editor");
    if (table == null){
        noTable.setAttribute("class", "alert alert-danger");
        noTable.innerHTML = "No Colour Matrix was Generated! Please check the color contrast first";
    }else{
        var tableWidth = table.offsetWidth;
        noTable.innerHTML ="";
        noTable.classList.remove("alert", "alert-danger");
         
        domtoimage.toJpeg(document.getElementById('bypassme'),{ quality: 0.95,bgcolor:'#ffffff', width: tableWidth})

        .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();      
        });
    }
  }