onmessage = (event) => {
  const { buffer, start, end, width, height } = event.data;
  const particles = new Float32Array(buffer);

  setInterval(() => {
    // 위치 갱신
    for (let i = start; i < end; i += 4) {
      const x = particles[i];
      const y = particles[i + 1];
      const vx = particles[i + 2];
      const vy = particles[i + 3];

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

      particles[i] = newX;
      particles[i + 1] = newY;
      particles[i + 2] = newVX;
      particles[i + 3] = newVY;
    }
  }, 1);
};
