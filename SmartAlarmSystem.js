'use strict';

// Set static LocalTunnel URL for your ESP32 web server
let apiBase = 'https://esp32web.loca.lt';

// Optional: Set camera URL if you want to use it somewhere else
let cameraUrl = 'https://esp32cam.loca.lt';

function postToESP(endpoint, payload) {
  return fetch(`${apiBase}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

function getFromESP(endpoint) {
  return fetch(`${apiBase}/${endpoint}`).then(response => response.text());
}

// Start your logic immediately since we’re not fetching from a Gist anymore
startEventListeners();
startPolling();

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

  // CAMERA BUTTON: Re-enabled with LocalTunnel URL
  document.getElementById("camera").addEventListener("click", function () {
    window.open(cameraUrl, "_blank");
  });
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
      document.getElementById("cameraControls").style.display = (data === "detected") ? "block" : "none";
      document.getElementById('Breach').textContent = data;
    })
    .catch(error => console.error("Error:", error));
}

function updatePir1() {
  getFromESP('pir1')
    .then(data => document.getElementById('movementSensor1').textContent = data)
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
