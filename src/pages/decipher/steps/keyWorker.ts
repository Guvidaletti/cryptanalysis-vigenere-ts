// const probableKeys = useMemo<
//     { size: number; k: string }[] | undefined
//   >(() => {
//     return sizes.map((calc) => {
//       return {
//         size: calc.size,
//         k: vigenere(text, calc.size, language),
//       };
//     });
//   }, [language, text, sizes]);

import { vigenere } from '../../../algorithms/vigenere';

self.addEventListener('message', ({ data }) => {
  const { text, language, sizes } = data;

  const promisses = sizes.map((size: number) => {
    return new Promise((res) => {
      vigenere(text, size, language).then((k) => {
        res({
          size,
          k,
        });
      });
    });
  });

  Promise.all(promisses).then((result) => {
    self.postMessage(result);
  });
});

export {};
