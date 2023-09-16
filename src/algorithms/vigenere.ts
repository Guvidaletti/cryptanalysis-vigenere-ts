import { frequency } from '../utils/frequency';
import { Languages, alphabet } from '../utils/languages';
import { getMaxOccurrence, partition } from '../utils/transforms';

/**
 * Método para descobrir a chave de um texto cifrado com o algoritmo de Vigenère
 * @param text texto cifrado
 * @param size tamanho da chave
 * @param language linguagem em que provavelmente o texto foi escrito
 * @returns chave
 */
export const vigenere = async (
  text: string,
  size: number,
  language: Languages
) => {
  const partitions = partition(size, text);

  const key = partitions
    .map((p) => {
      // Calcular a frequência dos caracteres:
      const freq = p.split('').reduce((ac, at) => {
        const n = ac.get(at) ?? 0;
        ac.set(at, n + 1);
        return ac;
      }, new Map<string, number>());

      // Verificar a letra mais frequente da língua:
      const maxLanguage = getMaxOccurrence(frequency[language]);
      // Verificar a letra mais frequente do texto:
      const max = getMaxOccurrence(freq);

      // console.log(
      //   `Caractere mais frequente na lingua ${language}: `,
      //   maxLanguage
      // );
      // console.log('max: ', max);

      // Calcular o deslocamento:
      const distance =
        // Index do max
        alphabet.indexOf(max[0]) -
        // Index do maxLanguage
        alphabet.indexOf(maxLanguage[0]);

      // console.log('distance: ', distance);
      // console.log('provavel: ', );

      console.log(
        'max:',
        max[0],
        ' maxLanguage: ',
        maxLanguage[0],
        ' distance:',
        distance
      );

      return alphabet[(alphabet.length + distance) % alphabet.length];
    })
    .join('');

  return key;
};

/**
 * Método para decifrar um texto cifrado com o algoritmo de Vigenère
 * @param text Mensagem cifrada
 * @param key chave utilizada
 * @returns texto decifrado
 */
export const decrypt = (text: string, key: string) => {
  return text
    .split('')
    .map((ch, index) => {
      const keyIndex = index % key.length;

      const atual = alphabet.indexOf(ch) - alphabet.indexOf(key[keyIndex]);
      const k = alphabet[(alphabet.length + atual) % alphabet.length];
      return k;
    })
    .join('');
};

export const encrypt = (text: string, key: string) => {
  return text
    .split('')
    .map((ch, index) => {
      const keyChar = key.charAt(index % key.length);
      const keyIndex = alphabet.indexOf(keyChar);
      const chIndex = alphabet.indexOf(ch);
      return alphabet[(keyIndex + chIndex) % alphabet.length];
    })
    .join('');
};
