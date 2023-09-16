import { useState } from 'react';
import { Col, Row } from 'simple-display';
import InputText from '../../../components/inputText/inputText';
import Button from '../../../components/button/button';
import DownloadIcon from '../../../assets/icons/downloadIcon';
import { generateFile } from '../../../utils/file';
import { decrypt } from '../../../algorithms/vigenere';
import { getNextKey } from '../../../utils/keys';

export default function Knows({ text }: { text: string }) {
  const [key, setKey] = useState<string>('');
  return (
    <Row>
      <Col>
        <b>3 - Digite a Chave</b>
      </Col>
      <Col>
        <InputText
          placeholder='Chave'
          type='text'
          value={key}
          onChange={(evt) => setKey(evt.target.value ?? '')}
        />
      </Col>
      <Col>
        <b>4 - Baixe o texto decifrado:</b>
      </Col>
      <Col>
        <Button
          icon={<DownloadIcon />}
          onClick={() => {
            generateFile(
              decrypt(text.toLowerCase().trim(), key.toLowerCase().trim()),
              `decipher-${getNextKey()}-${key}.txt`
            );
          }}
          disabled={!text || !key}
        >
          Download
        </Button>
      </Col>
    </Row>
  );
}
