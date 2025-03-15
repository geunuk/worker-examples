import { sumOfSquares } from "./util.js";

onmessage = (msg) => {
  console.log("Worker: Message received from main script");
  console.log({ msg });
  const { method, params } = msg.data;

  let result;
  if (method === "sumOfSquares") {
    result = sumOfSquares(...params);
  }

  postMessage(result);
};
