import { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'simple-display';
import { FriedmanCalcSizes } from '../../../algorithms/friedman';
import Loader from '../../../assets/icons/loader';
import Button from '../../../components/button/button';
import SortHeaderButton from '../../../components/sortHeaderButton/sortHeaderButton';
import { coincidence } from '../../../utils/coincidence';
import { Languages } from '../../../utils/languages';
import DownloadIcon from '../../../assets/icons/downloadIcon';
import { generateFile } from '../../../utils/file';
import { decrypt } from '../../../algorithms/vigenere';
import { getNextKey } from '../../../utils/keys';

export default function Analisys({ text }: { text: string }) {
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [sizes, setSizes] = useState<FriedmanCalcSizes[]>();

  useEffect(() => {
    setSizes(undefined);
    setLoadingSizes(true);
    const worker = new Worker(new URL('./analisysWorker.ts', import.meta.url), {
      type: 'module',
    });

    worker.addEventListener('message', (event) => {
      setSizes(event.data);
      setLoadingSizes(false);
    });

    worker.postMessage(text);

    return () => {
      worker.terminate();
    };
  }, [text]);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [keyName, setKeyName] = useState<keyof FriedmanCalcSizes>('size');

  const [language, setLanguage] = useState<Languages>();

  const [loadingPK, setLoadingPK] = useState(false);
  const [PK, setPK] = useState<{ size: number; k: string }[]>();

  useEffect(() => {
    if (!language || !sizes || !text) {
      setPK(undefined);
      return;
    }
    setLoadingPK(true);

    const worker = new Worker(new URL('./keyWorker.ts', import.meta.url), {
      type: 'module',
    });

    worker.addEventListener('message', (event) => {
      setPK(event.data);
      setLoadingPK(false);
    });

    worker.postMessage({ text, language, sizes: sizes.map((s) => s.size) });

    return () => {
      worker.terminate();
    };
  }, [language, sizes, text]);

  return text ? (
    <Row>
      <Col>
        <b>3 - Índices de coincidencia conhecidos:</b>
      </Col>
      <Col>
        <table>
          <thead>
            <tr>
              <th>Língua</th>
              <th>Índice de coincidência</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(coincidence).map(([k, c]) => {
              return (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{c}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Col>
      <Col>
        <b>4 - Análise do tamanho da chave</b>
      </Col>
      <Col>
        {loadingSizes && <Loader />}
        {!loadingSizes && sizes && sizes.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>
                  <SortHeaderButton
                    keyName='size'
                    actual={{ keyName, order }}
                    onChange={(k, o) => {
                      setKeyName(k as keyof FriedmanCalcSizes);
                      setOrder(o);
                    }}
                  >
                    Tamanho da Chave
                  </SortHeaderButton>
                </th>
                <th>
                  <SortHeaderButton
                    keyName='average'
                    actual={{ keyName, order }}
                    onChange={(k, o) => {
                      setKeyName(k as keyof FriedmanCalcSizes);
                      setOrder(o);
                    }}
                  >
                    Média de valores da divisão
                  </SortHeaderButton>
                </th>
                <th>
                  <SortHeaderButton
                    keyName='english'
                    actual={{ keyName, order }}
                    onChange={(k, o) => {
                      setKeyName(k as keyof FriedmanCalcSizes);
                      setOrder(o);
                    }}
                  >
                    Distância para o Inglês
                  </SortHeaderButton>
                </th>
                <th>
                  <SortHeaderButton
                    keyName='portuguese'
                    actual={{ keyName, order }}
                    onChange={(k, o) => {
                      setKeyName(k as keyof FriedmanCalcSizes);
                      setOrder(o);
                    }}
                  >
                    Distância para o Português
                  </SortHeaderButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...sizes]
                .sort((a, b) => {
                  const f = order === 'asc' ? a : b;
                  const s = order === 'asc' ? b : a;

                  if (
                    typeof f[keyName] === 'number' &&
                    typeof s[keyName] === 'number'
                  ) {
                    return (f[keyName] as number) - (s[keyName] as number);
                  }

                  return String(f[keyName]).localeCompare(String(s[keyName]));
                })
                .map((s) => {
                  return (
                    <tr key={s.size}>
                      <td>{s.size}</td>
                      <td>{s.average}</td>
                      <td>{s.english}</td>
                      <td>{s.portuguese}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </Col>
      {!loadingSizes && sizes && (
        <Fragment>
          <Col>
            <b>5 - Selecione a linguagem do texto:</b>
          </Col>
          <Col gap={1}>
            {Object.values(Languages).map((l) => {
              return (
                <Button
                  disabled={!sizes || !sizes.length || language === l}
                  onClick={() => {
                    setLanguage(l);
                  }}
                >
                  {l}
                </Button>
              );
            })}
          </Col>
          <Col>
            <small>
              <b>
                Acreditamos que o tamanho seja:{' '}
                {
                  [...sizes].sort((a, b) => {
                    const f = a[language!] ?? 0;
                    const s = b[language!] ?? 0;

                    return f - s;
                  })[0].size
                }
              </b>
            </small>
          </Col>
        </Fragment>
      )}
      {loadingPK && <Loader />}
      {!loadingPK && !!language && (
        <Fragment>
          <Col>
            <b>6 - Escolha a chave e faça o download do arquivo decifrado:</b>
          </Col>
          <Col>
            <table>
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Provável Chave</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {PK?.map((probableKey) => {
                  return (
                    <tr key={probableKey.size}>
                      <td>{probableKey.size}</td>
                      <td>{probableKey.k}</td>
                      <td>
                        <Button
                          icon={<DownloadIcon />}
                          onClick={() => {
                            generateFile(
                              decrypt(
                                text.toLowerCase().trim(),
                                probableKey.k.toLowerCase().trim()
                              ),
                              `decipher-${getNextKey()}-${probableKey.k
                                .toLowerCase()
                                .trim()}.txt`
                            );
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Fragment>
      )}
    </Row>
  ) : (
    <Fragment />
  );
}
