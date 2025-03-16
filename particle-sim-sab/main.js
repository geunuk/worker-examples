function initializeParticles(particles, width, height) {
  const numParticles = particles.length / 4;

  for (let i = 0; i < numParticles; i++) {
    particles[i * 4] = Math.random() * width; // x
    particles[i * 4 + 1] = Math.random() * height; //y
    particles[i * 4 + 2] = Math.random() * 4 - 2; // vx
    particles[i * 4 + 3] = Math.random() * 4 - 2; // vy
  }
}

function initializeColors(colors) {
  const numParticles = colors.length / 3;

  for (let i = 0; i < numParticles; i++) {
    colors[i * 3] = Math.floor(Math.random() * 255); // r
    colors[i * 3 + 1] = Math.floor(Math.random() * 255); // g
    colors[i * 3 + 2] = Math.floor(Math.random() * 255); // b
  }
}

function animate(particles, colors, ctx, width) {
  const numParticles = particles.length / 4;

  backbuffer.data.fill(0);
  for (let i = 0; i < numParticles; i++) {
    const x = particles[i * 4];
    const y = particles[i * 4 + 1];

    const pixelIndex = ((y | 0) * width + (x | 0)) * 4;
    backbuffer.data[pixelIndex] = colors[i * 3]; // r
    backbuffer.data[pixelIndex + 1] += colors[i * 3 + 1]; // g
    backbuffer.data[pixelIndex + 2] += colors[i * 3 + 2]; // b
    backbuffer.data[pixelIndex + 3] = 255; // a
  }

  ctx.putImageData(backbuffer, 0, 0);

  requestAnimationFrame(() => {
    animate(particles, colors, ctx, width);
  });
}

const numParticles = 10_000_000;
const numWorkers = 4;
const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.getElementById("particleCanvas");
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");
const backbuffer = new ImageData(window.innerWidth, window.innerHeight);
const buffer = new SharedArrayBuffer(
  Float32Array.BYTES_PER_ELEMENT * numParticles * 4
);

// 시뮬레이션 시작
const particles = new Float32Array(buffer);
const colors = new Array(numParticles * 3);

initializeParticles(particles, width, height);
initializeColors(colors);

let workers = [];
for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker("./worker.js", { type: "module" });
  workers.push(worker);
}

workers.forEach((worker, idx) => {
  const chunkSize = Math.floor(numParticles / numWorkers) * 4;
  const start = idx * chunkSize;
  const end = Math.min(start + chunkSize, particles.length);

  worker.postMessage({ buffer, start, end, width, height });
});

animate(particles, colors, ctx, width);
