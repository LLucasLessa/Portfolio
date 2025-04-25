const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const numPoints = 100;
for (let i = 0; i < numPoints; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(point => {
    let closestPoints = [...points]
      .map(p => ({ point: p, distance: getDistance(point, p) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(1, 8);


    closestPoints.forEach(closest => {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(closest.point.x, closest.point.y);
      ctx.strokeStyle = 'rgb(1, 238, 255)';
      ctx.stroke();
    });


    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  update();
  requestAnimationFrame(draw);
}

function getDistance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function update() {
  points.forEach(point => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
  });
}

const mainSection = document.querySelector(".main-section");
const projectDivs = document.querySelectorAll(".project-div");

projectDivs.forEach(div => {
    div.addEventListener("mouseenter", () => {
        mainSection.style.backgroundColor = "rgb(14, 24, 46)";
        div.style.backgroundColor = "";
    });

    div.addEventListener("mouseleave", () => {
        mainSection.style.backgroundColor = ""; 
    });
});

document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  const divA = document.querySelector(".div-a");
  const divB = document.querySelector(".div-b");
  const divC = document.querySelector(".div-c");

  if (scrollPosition < 300) {
      divA.classList.add("hover-active");
      divB.classList.remove("hover-active");
      divC.classList.remove("hover-active");
  } else if (scrollPosition >= 300 && scrollPosition < 1000) {
      divA.classList.remove("hover-active");
      divB.classList.add("hover-active");
      divC.classList.remove("hover-active");
  } else {
      divA.classList.remove("hover-active");
      divB.classList.remove("hover-active");
      divC.classList.add("hover-active");  }
});

document.addEventListener("DOMContentLoaded", () => {
  const divA = document.querySelector(".div-a");
  divA.classList.add("hover-active");
});





draw();