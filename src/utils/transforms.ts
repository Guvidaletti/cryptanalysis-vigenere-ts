export const partition = (n: number, text: string) => {
  const strings: string[] = [];

  for (let i = 0; i < text.length; i++) {
    strings[i % n] = (strings[i % n] ?? '') + text[i];
  }

  return strings;
};

export const getMaxOccurrence = (arr: Map<string, number>) => {
  return Array.from(arr.entries()).reduce(
    (acc, [k, v]) => {
      // Teste de frequência
      if (v > acc[1]) {
        return [k, v];
      }

      return acc;
    },
    // Valor inicial
    ['', -1]
  );
};
