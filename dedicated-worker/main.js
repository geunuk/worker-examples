import { sumOfSquares } from "./method.js";

// Worker X
const noWorkerButton = document.getElementById("worker-x");
noWorkerButton.addEventListener("click", () => {
  const result = sumOfSquares(2_000_000_000);

  console.log(`Worker X: %c${result}`, "color:green");
});

// Worker O
const worker = new Worker("./worker.js", { type: "module" });
worker.onmessage = (event) => {
  const result = event.data;
  console.log(`Worker O: %c${result}`, "color:blue");
};

const workerButton = document.getElementById("worker-o");
workerButton.addEventListener("click", () => {
  worker.postMessage({ method: "sumOfSquares", params: [2_000_000_000] });
});
