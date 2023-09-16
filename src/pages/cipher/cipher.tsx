import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'simple-display';
import DownloadIcon from '../../assets/icons/downloadIcon';
import UploadIcon from '../../assets/icons/uploadIcon';
import Button from '../../components/button/button';
import InputText from '../../components/inputText/inputText';
import InputTextFile from '../../components/inputTextFile/inputTextFile';
import Title from '../../components/title/title';
import { generateFile } from '../../utils/file';
import { encrypt } from '../../algorithms/vigenere';
import { getNextKey } from '../../utils/keys';

export default function Cipher() {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<string>('');

  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col>
          <Title
            showBack
            onClickBack={() => {
              navigate('/');
            }}
          >
            Cifrar textos - Vigenère
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <b>1 - Importe o texto a ser cifrado:</b>
        </Col>
        <Col>
          <InputTextFile
            onChange={(str) => {
              setText(str);
            }}
            icon={<UploadIcon />}
          >
            Selecionar o arquivo
          </InputTextFile>
        </Col>
      </Row>
      <Row>
        <Col>
          <b>2 - Digite a chave:</b>
        </Col>
        <Col>
          <InputText
            placeholder='Chave'
            type='text'
            value={key}
            onChange={(evt) => setKey(evt.target.value ?? '')}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <b>3 - Baixe o texto cifrado:</b>
        </Col>
        <Col>
          <Button
            icon={<DownloadIcon />}
            onClick={() => {
              generateFile(
                encrypt(text.toLowerCase().trim(), key.toLowerCase().trim()),
                `cipher-${getNextKey()}-${key}.txt`
              );
            }}
            disabled={!text || !key}
          >
            Download
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
