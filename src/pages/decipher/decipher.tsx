import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'simple-display';
import UploadIcon from '../../assets/icons/uploadIcon';
import Button from '../../components/button/button';
import InputTextFile from '../../components/inputTextFile/inputTextFile';
import Title from '../../components/title/title';
import Analisys from './steps/analisys';
import Knows from './steps/knows';

export default function Decipher() {
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');
  const [knows, setKnows] = useState<boolean>();

  useEffect(() => {
    setKnows(undefined);
  }, [text]);

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
            Decifrar - Vigenère
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <b>1 - Importe o texto a ser decifrado:</b>
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
          <b>2 - Você já sabe a chave?</b>
        </Col>
        <Col gap={1}>
          <Button
            onClick={() => {
              setKnows(true);
            }}
            disabled={!text || knows === true}
          >
            Sim
          </Button>
          <Button
            onClick={() => {
              setKnows(false);
            }}
            disabled={!text || knows === false}
          >
            Não
          </Button>
        </Col>
      </Row>
      {knows === true && <Knows text={text} />}
      {knows === false && <Analisys text={text} />}
    </Container>
  );
}
