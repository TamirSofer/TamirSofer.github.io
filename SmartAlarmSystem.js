'use strict';
document.getElementById("sendPin").addEventListener("click", function () 
{
  const input = document.getElementById('myInput').value;
  fetch('https://40dd-79-177-136-90.ngrok-free.app/send', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: "pin" ,text: input })
  })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert('Sent: ' + data);

      // Clear the input after sending
      document.getElementById('myInput').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send');
    });
});
document.getElementById("Left").addEventListener("click", function () 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/send', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: "ServoLeft" })
  })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert('Sent: ' + data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send');
    });
});
document.getElementById("Right").addEventListener("click", function () 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/send', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: "ServoRight" })
  })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert('Sent: ' + data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send');
    });
});
document.getElementById("manualControl").addEventListener("click", function () 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/send', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({type: "manual" , text: true })
  })
    .then(response => response.text())
    .then(data => 
    {
      console.log('Manual mode activated');
      // Hide manual button and show auto button
      document.getElementById("manualControl").style.display = "none";
      document.getElementById("autoControl").style.display = "inline-block";
      document.getElementById("Left").style.display = "inline-block";
      document.getElementById("Right").style.display = "inline-block";
    })
    .catch(error => 
    {
      console.error('Error:', error);
      alert('Failed to send');
    });
});

document.getElementById("autoControl").addEventListener("click", function () 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/send', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({type: "auto" , text: true })
  })
    .then(response => response.text())
    .then(data => 
    {
      console.log('Auto mode activated');
      // Show manual button again
      document.getElementById("manualControl").style.display = "inline-block";
      document.getElementById("autoControl").style.display = "none";
      document.getElementById("Left").style.display = "none";
      document.getElementById("Right").style.display = "none";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send');
    });
});
document.getElementById("camera").addEventListener("click", function() 
{
  window.open("http://192.168.1.100", "_blank"); // open new tab with camera
});
function updateBreach() 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/Breach')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      if(data === "detected")
      {
        document.getElementById("cameraControls").style.display = "block";
      }
      else
      {
        document.getElementById("cameraControls").style.display = "none";
      }
      document.getElementById('Breach').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}
function updatePir1() 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/pir1')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('movementSensor1').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}
function updatePir2() 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/pir2')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('movementSensor2').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}
function updateMic1() 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/mic1')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('soundSensor1').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}
function updateMic2() 
{
  fetch('https://40dd-79-177-136-90.ngrok-free.app/mic2')  //gets the data from the board
    .then(response => response.text())//makes it a text type
    .then(data => {
      // Update the content of the <p> tag with id 'msg' to display the string
      document.getElementById('soundSensor2').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}

//update every second
setInterval(updatePir1, 1000);
setInterval(updatePir2, 1000);
setInterval(updateMic1, 1000);
setInterval(updateMic2, 1000);
setInterval(updateBreach, 1000);
