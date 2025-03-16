import { createParticles, createColors, updateParticles } from "./particle.js";

function animate(particles, colors, ctx, backbuffer, width) {
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

  requestAnimationFrame(() =>
    animate(particles, colors, ctx, backbuffer, width)
  );
}

const numParticles = 10_000_000;
const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.getElementById("particleCanvas");
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");
const backbuffer = new ImageData(window.innerWidth, window.innerHeight);

// 시뮬레이션 시작
const particles = createParticles(numParticles, width, height);
const colors = createColors(numParticles);

setInterval(() => {
  updateParticles(particles, width, height);
}, 1);

animate(particles, colors, ctx, backbuffer, width);
