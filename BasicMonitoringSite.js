'use strict';
document.getElementById("btn").addEventListener("click", function() 
{
  window.open("http://192.168.217.166", "_blank"); // open new tab with camera
});
function updatePir() 
{
  fetch('http://192.168.217.112/pir')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('movementSensor').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}
//need to make sure they each get their correct data and dont mix up
function updateMic() 
{
  fetch('http://192.168.217.112/mic')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('soundSensor').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}

setInterval(updatePir, 1000);
setInterval(updateMic, 1000);
