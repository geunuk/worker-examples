export function sumOfSquares(num) {
  let result = 0;

  for (let i = 1; i <= num; i++) {
    result += i * i;
  }

  return result;
}
