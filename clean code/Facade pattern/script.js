const canvas = document.createElement("canvas");
canvas.height = window.innerHeight - 20;
canvas.width = window.innerWidth - 20;
document.body.append(canvas);

const context = canvas.getContext("2d");

// draw square
context.fillStyle = "red";
context.fillRect(50, 50, 200, 200);

// draw square outline
context.strokeStyle = "blue";
context.lineWidth = 20;
context.strokeRect(300, 50, 200, 200);

// draw circle
context.fillStyle = "green";
context.arc(650, 150, 100, 0, Math.PI * 2);
context.fill();

document.addEventListener("keypress", (e) => {
  if (e.key === "c")
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
});
