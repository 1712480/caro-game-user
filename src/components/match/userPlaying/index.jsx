import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import styles from './styles.module.scss';

const UserPlaying = () => (
  <div style={{ margin: 5, width: 200 }}>
    <Card className={styles.cardUser}>
      <CardImg style={{ width: '120px' }} src="https://lh3.googleusercontent.com/proxy/XXNjOB2tRSco23hmjmhRttw2pc2KJObqXxFLCNfcOWbIgBZwTC6l0uynUd5nT8IdJauy69u0tQXE3ewa4_VrpVVrM_iItIc58fWUx10pBQ" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
        <CardText>haha</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  </div>
);

export default UserPlaying;
