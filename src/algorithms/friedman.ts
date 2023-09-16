import { coincidence } from '../utils/coincidence';
import { Languages } from '../utils/languages';
import { partition } from '../utils/transforms';

export type FriedmanCalcSizes = {
  size: number;
  values: number[];
  average: number;
} & { [k in Languages]?: number };

export const indexOfCoincidence = (text: string) => {
  const words = new Map<
    string,
    { count: number; percent?: number; percent2?: number }
  >();
  text.split('').forEach((char) => {
    if (words.has(char)) {
      words.set(char, { count: words.get(char)!.count + 1 });
    } else {
      words.set(char, { count: 1 });
    }
  });

  // console.log(`Arquivo: `, f);
  // console.log('Total de letras: ', text.length);

  // Cálculo do percentual
  Array.from(words.entries() ?? []).forEach(([k, obj]) => {
    if (k === '\n') return;
    obj.percent = obj.count / text.length;
    obj.percent2 = Math.pow(obj.percent, 2);
    // console.log(k, ": ", obj.count, obj.percent, obj.percent2);
    words.set(k, obj);
  });

  const somaDosQuadrados = Array.from(words.values() ?? []).reduce(
    (acc, at) => {
      return 1.0 * acc + (at.percent2 || 0);
    },
    0
  );

  return somaDosQuadrados;
};

export const friedman = async (text: string) => {
  const indexes = new Map<number, number[]>();

  for (let n = 1; n <= 20; n++) {
    const strings = partition(n, text);

    indexes.set(
      n,
      strings.map((str) => indexOfCoincidence(str))
    );
  }

  const averaged = Array.from(indexes.entries() ?? []).map<FriedmanCalcSizes>(
    ([k, v]) => {
      const average = v.reduce((acc, at) => acc + at, 0) / v.length;

      const diffs = Object.values(Languages).reduce((ac, at) => {
        return {
          ...ac,
          [at]: Math.abs(average - Math.abs(coincidence[at])),
        };
      }, {});

      return {
        size: k,
        values: v,
        average,
        ...diffs,
      };
    }
  );

  return averaged;
};
