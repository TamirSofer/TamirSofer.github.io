'use strict';

let apiBase = '';

function postToESP(endpoint, payload) {
  return fetch(`${apiBase}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

function getFromESP(endpoint) {
  return fetch(`${apiBase}${endpoint}`).then(response => response.text());
}

fetch('https://gist.githubusercontent.com/TamirSofer/17549519d051b4520ff175fce213e002/raw/13e97c8dc545e3951d0c9e28dc72e7696e98ad2f/ngrok-url.txt')
  .then(response => response.text())  // get the raw text
  .then(text => {
    console.log("Raw Gist content:", text);
    const config = JSON.parse(text);  // manually parse it as JSON
    apiBase = config.api;
    console.log('Loaded ngrok URL:', apiBase);
    startEventListeners();
    startPolling();
  })
  .catch(error => {
    console.error('Failed to load or parse ngrok URL config:', error);
    alert("Couldn't load API configuration.");
  });
function startEventListeners() {
  document.getElementById("sendPin").addEventListener("click", function () {
    const input = document.getElementById('myInput').value;
    postToESP('send', { type: "pin", text: input })
      .then(data => {
        console.log('Success:', data);
        alert('Sent: ' + data);
        document.getElementById('myInput').value = '';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send');
      });
  });

  document.getElementById("Left").addEventListener("click", function () {
    postToESP('send', { type: "ServoLeft" })
      .then(data => alert('Sent: ' + data))
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send');
      });
  });

  document.getElementById("Right").addEventListener("click", function () {
    postToESP('send', { type: "ServoRight" })
      .then(data => alert('Sent: ' + data))
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send');
      });
  });

  document.getElementById("manualControl").addEventListener("click", function () {
    postToESP('send', { type: "manual", text: true })
      .then(() => {
        document.getElementById("manualControl").style.display = "none";
        document.getElementById("autoControl").style.display = "inline-block";
        document.getElementById("Left").style.display = "inline-block";
        document.getElementById("Right").style.display = "inline-block";
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send');
      });
  });

  document.getElementById("autoControl").addEventListener("click", function () {
    postToESP('send', { type: "auto", text: true })
      .then(() => {
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

  //document.getElementById("camera").addEventListener("click", function () {
    //window.open("http://192.168.1.100", "_blank");
  //});
}

function startPolling() {
  setInterval(updatePir1, 1000);
  setInterval(updatePir2, 1000);
  setInterval(updateMic1, 1000);
  setInterval(updateMic2, 1000);
  setInterval(updateBreach, 1000);
}

function updateBreach() {
  getFromESP('Breach')
    .then(data => {
      document.getElementById('Breach').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}

function updatePir1() {
  getFromESP('pir1')
    .then(data => {
      document.getElementById('movementSensor1').textContent = data
    })
    .catch(error => console.error("Error:", error));
}

function updatePir2() {
  getFromESP('pir2')
    .then(data => document.getElementById('movementSensor2').textContent = data)
    .catch(error => console.error("Error:", error));
}

function updateMic1() {
  getFromESP('mic1')
    .then(data => document.getElementById('soundSensor1').textContent = data)
    .catch(error => console.error("Error:", error));
}

function updateMic2() {
  getFromESP('mic2')
    .then(data => document.getElementById('soundSensor2').textContent = data)
    .catch(error => console.error("Error:", error));
}
