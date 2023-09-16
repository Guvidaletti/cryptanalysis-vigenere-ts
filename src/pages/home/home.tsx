import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'simple-display';
import BigBlockButton from '../../components/bigBlockButton/bigBlockButton';
import LockIcon from '../../assets/icons/lockIcon';
import UnlockIcon from '../../assets/icons/unlockIcon';
import Title from '../../components/title/title';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col>
          <Title>Criptoanálise - Vigenère</Title>
        </Col>
        <Col sm={6}>
          <BigBlockButton
            icon={<LockIcon />}
            onClick={() => navigate('/cipher')}
          >
            Cifrar
          </BigBlockButton>
        </Col>
        <Col sm={6}>
          <BigBlockButton
            icon={<UnlockIcon />}
            onClick={() => navigate('/decipher')}
          >
            Decifrar
          </BigBlockButton>
        </Col>
      </Row>
    </Container>
  );
}
