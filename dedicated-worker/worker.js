import { sumOfSquares } from "./method.js";

onmessage = (event) => {
  console.log("Worker: Message received from main script");
  console.log({ event });
  const { method, params } = event.data;

  let result;
  if (method === "sumOfSquares") {
    result = sumOfSquares(...params);
  }

  postMessage(result);
};
