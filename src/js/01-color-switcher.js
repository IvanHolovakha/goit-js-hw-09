const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
 console.log(1)

 startBtn.addEventListener("click", onStartBtnClick);
//  stopBtn.addEventListener("click", onStopBtnClick);

 function onStartBtnClick(event){
    setInterval(
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          }, 1000
    )
 }