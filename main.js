import { sumOfSquares } from "./util.js";

const noWorkerButton = document.getElementById("no-worker");
noWorkerButton.addEventListener("click", () => {
  const result = sumOfSquares(2_000_000_000);

  console.log(`Worker X: %c${result}`, "color:green");
});

const worker = new Worker("./worker.js", { type: "module" });
worker.onmessage = (msg) => {
  const result = msg.data;
  console.log(`Worker O: %c${result}`, "color:blue");
};

const workerButton = document.getElementById("worker");
workerButton.addEventListener("click", () => {
  worker.postMessage({ method: "sumOfSquares", params: [2_000_000_000] });
});
