const socket = io("http://localhost:3000");

document.getElementById("sendButton").addEventListener("click", () => {
  const smsData = {
    recipient: document.getElementById("recipient").value,
    message: document.getElementById("message").value,
  };

  socket.emit("send_sms", smsData);

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = "0%";

  socket.on("progress", (data) => {
    progressBar.style.width = `${data.progress}%`;
    progressBar.innerText = `${data.progress}%`;
  });

  socket.on("done", (data) => {
    alert(data.message);
    progressBar.style.width = "100%";
  });
});
