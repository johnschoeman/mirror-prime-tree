export const convertBase = function convertBase(digits, fromBase, toBase) {
  let decValue = digits.reduce((sum, value, idx) => {
    return sum + value * (Math.pow(fromBase, idx));
  });

  let resDigits = [];

  while (decValue > 0) {
    resDigits.push(decValue % toBase);
    decValue = Math.floor(decValue / toBase);
  }
  
  return resDigits;
};

export const isPrime = function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  if (num === 2) {
    return true;
  }

  for (let i = 3; i <= Math.sqrt(num) + 2; i = i + 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

export const toDigits = function toDigits(num) {
  let digits = [];
  while (num > 0) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  return digits;
};