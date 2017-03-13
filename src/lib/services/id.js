export default () => {
  const mask = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 6; i > 0; i -= 1) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }

  return result;
};
