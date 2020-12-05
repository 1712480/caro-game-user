import React, { useEffect } from "react";

import { Container } from 'reactstrap';

export default function Home() {
  const test = [];

  useEffect(() => {
    console.log(test);
  }, [])

  return (
    <Container>Home page</Container>
  )
}
