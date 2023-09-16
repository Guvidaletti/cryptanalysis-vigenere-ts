import { friedman } from '../../../algorithms/friedman';

self.addEventListener('message', ({ data }) => {
  friedman(data).then((result) => {
    self.postMessage(result);
  });
});

export {};
