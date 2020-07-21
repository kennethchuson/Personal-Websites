

var canvas;  
var ctx; 
var img0, img1, img2; 
var button0, button1, button2, button3;

alert("WARNING: if you choose an image, it will restart everything");


    function draw2Dcoordinate() { 
            ctx = canvas.getContext("2d"); 

            img0 = new Image(); 
            img0.onload = function() {
                ctx.drawImage(img0, 0, 0, canvas.width, canvas.height); 
            }
            img0.src = 'IMG/axis.png'; 

        }

    function drawGridCoordinate() {
            
            ctx = canvas.getContext("2d");
            img1 = new Image(); 
            img1.onload = function() {
                ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
            };
            img1.src = 'IMG/cor.png';
            


        }

    function drawCircleCoordinate() {

            ctx = canvas.getContext("2d"); 
            img2 = new Image(); 
            img2.onload = function() {
                ctx.drawImage(img2, 0, 0, canvas.width, canvas.height); 
            }
            img2.src = "IMG/cor2.png"; 
        }


    function canvasForm() {
            
            
            canvas = document.getElementById("myCanvas"); 
            ctx = canvas.getContext("2d"); 
            img1 = new Image(); 
            img1.onload = function() {
                ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
            };
            img1.src = 'IMG/background.png';
            
        
        }


    function showhideBorders() {
            canvas = document.getElementById("myCanvas"); 
            button1 = document.getElementById("btn1"); 
            var option1 = ""; 
            var option2 = "10px solid black"; 
            canvas.style.border = option1; 
            button1.addEventListener("click", (event) => {
            if (canvas.style.border == option1) {
                canvas.style.border = option2;  
            }
            else {
                canvas.style.border = option1;
            }
            }); 
        }



    function addCoordinate() { 
            var switchingEvents = "show";   
            button0 = document.getElementById("btn0"); 
            
            button0.addEventListener("click", (event) => {
                if (switchingEvents == "show") {
                    draw2Dcoordinate(); 
                    switchingEvents = "hide"; 
                } 
                else {
                // canvasForm(); 
                inputImage(); 
                switchingEvents = "show"; 
                }
            }); 
        }

    function addGridCoordinate() {
            var switchingEvents = "show";   
            button2 = document.getElementById("btn2"); 

            button2.addEventListener("click", (event) => {
                if (switchingEvents == "show") { 
                    drawGridCoordinate(); 
                    switchingEvents = "hide"; 
                } 
                else {
                // canvasForm(); 
                inputImage(); 
                    switchingEvents = "show"; 
                }
            }); 
        }

    function addCircleCoordinate() {
            var switchingEvents = "show";   
            button3 = document.getElementById("btn3"); 

            button3.addEventListener("click", (event) => {
                if (switchingEvents == "show") { 
                    drawCircleCoordinate(); 
                    switchingEvents = "hide"; 
                } 
                else {
                    //canvasForm(); 
                    inputImage(); 

                    
                    switchingEvents = "show"; 
                }
            }); 
        }



    function InputHistory() {




            //create elements and form user inputs
            var listing = document.getElementsByTagName("LI");
            for (let i = 0; i < listing.length; i++) {
                var txt = document.createTextNode("\u00D7");
            }

            var list = document.querySelector('ul'); 
            list.addEventListener('click', function(ev) {
                if (ev.target.tagName === 'LI') {
                    ev.target.classList.toggle('checked'); 
                }
            }, false);

            var li = document.createElement("li");

            var inputValue1 = document.getElementById("OnerightInput").value;
        
            var t = document.createTextNode(inputValue1);
        

            
            li.appendChild(t);


            if (inputValue1 === '') {
                alert("Write something..."); 
            } 
            else {
                document.getElementById("myUL").appendChild(li);
            }

            li.appendChild(t);

            //clear Input 
            var inputValue1 = document.getElementById("OnerightInput").value = " "; 

            
        }

    function showInputHistory() {
            var showHistoryList = document.getElementById('grow');
            if (showHistoryList.clientHeight) {
            showHistoryList.style.height = 0;
            } else {
            var wrapper = document.querySelector('.store_history');
            showHistoryList.style.height = wrapper.clientHeight + 16 + "px";
            }
            document.getElementById("showingHistoryInputs").value = document.getElementById("showingHistoryInputs").value == true ? false : true;
        }

    function openSidebar() {
            document.getElementById("myLeftSidebar").style.width = "200px";
            document.getElementById("main").style.marginLeft = "200px";
        }
        
     function closeSidebar() {
            document.getElementById("myLeftSidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }



    function inputImage() { 
            document.getElementById('inp').onchange = function(e) {
                var previewImage = document.getElementById('previewImage');
                previewImage.src = URL.createObjectURL(e.target.files[0]);
               
                var nameFile = this.files[0].name; 
                var img = new Image();
                img.onload = function() {
                    var canvas = document.getElementById('myCanvas');
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width , canvas.height);
                }
                img.src = URL.createObjectURL(this.files[0]);
            }; 
    }



    function putPoint() {

        var canvas = document.getElementById('myCanvas'); 
        var ctx = canvas.getContext("2d");
        var countPoints = 1; 

        var radius = 10;  

        var putPoint = function(e) {

            var targetOffsetX = e.offsetX; 
            var targetOffsetY = e.offsetY; 

          //  analyzePoints(targetOffsetX, targetOffsetY); 

            console.log("x: " + targetOffsetX); 
            console.log("y: " + targetOffsetY); 

            
            var imgTarget = new Image(); 

            imgTarget.onload = function() {
                ctx.drawImage(imgTarget, targetOffsetX, targetOffsetY, radius, radius);
            }

            imgTarget.src = "IMG/target.png"; 
            document.getElementById("numberPoints").innerHTML = countPoints++; 
        }

        canvas.addEventListener('mousedown', putPoint); 

        showdivFeatursPoint(); 


        //change size radius
        var minRad = 1;  
        var maxRad = 20; 
        var interval = 1; 
        var radSpan = document.getElementById('radval'); 
        var decRad = document.getElementById('decrad'); 
        var incRad = document.getElementById('incrad'); 
        var showPointMessage = document.getElementById('showMaxMinPoint'); 

        var setRadius = function(newRadius) {
            if (newRadius < minRad) {
                newRadius = minRad; 
            }
            else if (newRadius > maxRad) {
                newRadius = maxRad; 
            }
            radius = newRadius; 
           // ctx.lineWidth = radius; 

            radSpan.innerHTML = radius; 

            if (radius == maxRad) {
                alert("Maximum Point exceeded"); 
            }
            if (radius == minRad) {                
                alert("Minimum Point exceeded"); 
            }


        }
          
        decRad.addEventListener('click', function() {
            setRadius(radius - interval); 
        }); 

        incRad.addEventListener('click', function() {
            setRadius(radius + interval); 
        });

}

//Show div Point features
function showdivFeatursPoint() {
    var buttonShow = document.getElementsByClassName("putPoints");
        
    for (var i = 0; i < buttonShow.length; i++) {
        buttonShow[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
        panel.style.display = "block";
    } 
    
    else {
        panel.style.display = "block";
    }
});
}
}

//Show div Setting features
function showdivSettingOption() {
    var buttonShow = document.getElementsByClassName("settingOption");
        
    for (var i = 0; i < buttonShow.length; i++) {
        buttonShow[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } 
    
    else {
        panel.style.display = "block";
    }
});
}
}

//Show div user Preference settings features
function showdivSettingOption2() {
    var buttonShow = document.getElementsByClassName("userPrefences");
        
    for (var i = 0; i < buttonShow.length; i++) {
        buttonShow[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } 
    
    else {
        panel.style.display = "block";
    }
});
}
} 


function changeBackgroundColor() {
    function changeColor() {
        var red = document.getElementById('rangeRED').value; 
        var green = document.getElementById('rangeGREEN').value; 
        var blue = document.getElementById('rangeBLUE').value; 
        
        var color = 'rgb(' + red + ',' + green + ',' + blue + ')'; 
    
        document.body.style.backgroundColor = color; 
    
    }
    
    document.getElementById('rangeRED').addEventListener('input', changeColor); 
    document.getElementById('rangeGREEN').addEventListener('input', changeColor); 
    document.getElementById('rangeBLUE').addEventListener('input', changeColor); 
}


//toggle switch for change background
    document.addEventListener('DOMContentLoaded', function () {
        var switchToggleBackgroundColor = document.querySelector('input[type="checkbox"]');
      
        switchToggleBackgroundColor.addEventListener('change', function () {
          if (switchToggleBackgroundColor.checked) {
            document.body.style.backgroundColor = "silver"; 
          } 
        });
      });    





    

        
    


canvasForm(); 
showhideBorders(); 
addCoordinate(); 
addGridCoordinate(); 
addCircleCoordinate(); 
inputImage();  
showdivFeatursPoint(); 
showdivSettingOption(); 
showdivSettingOption2(); 
changeBackgroundColor(); 
