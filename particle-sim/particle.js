export function createParticles(numParticles, width, height) {
  const particles = new Array(numParticles * 4);

  for (let i = 0; i < numParticles; i++) {
    particles[i * 4] = Math.random() * width; // x
    particles[i * 4 + 1] = Math.random() * height; //y
    particles[i * 4 + 2] = Math.random() * 4 - 2; // vx
    particles[i * 4 + 3] = Math.random() * 4 - 2; // vy
  }

  return particles;
}

export function createColors(numParticles) {
  const colors = new Array(numParticles * 3);

  for (let i = 0; i < numParticles; i++) {
    colors[i * 3] = Math.floor(Math.random() * 255); // r
    colors[i * 3 + 1] = Math.floor(Math.random() * 255); // g
    colors[i * 3 + 2] = Math.floor(Math.random() * 255); // b
  }

  return colors;
}

export function updateParticles(particles, width, height) {
  const numParticles = particles.length / 4;

  for (let i = 0; i < numParticles; i++) {
    const x = particles[i * 4];
    const y = particles[i * 4 + 1];
    const vx = particles[i * 4 + 2];
    const vy = particles[i * 4 + 3];

    let newX = x + vx;
    let newY = y + vy;

    let newVX = vx;
    if (newX > width || newX < 0) {
      newVX *= -0.9; // 충돌 시 속도 감소
    }

    let newVY = vy + 0.1; // 중력 효과
    if (newY > height || newY < 0) {
      newVY *= -0.9; // 충돌 시 속도 감소
    }

    particles[i * 4] = newX;
    particles[i * 4 + 1] = newY;
    particles[i * 4 + 2] = newVX;
    particles[i * 4 + 3] = newVY;
  }
}
