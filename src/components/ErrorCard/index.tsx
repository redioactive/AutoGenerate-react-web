import React from 'react';
import { Card } from 'antd';

interface ErrorCardProps {
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => (
  <Card
    style={{
      textAlign: 'center',
      marginTop: 50,
      color: 'red',
      fontWeight: 'bold',
    }}
    title="错误"
  >
    <p>{message}</p>
  </Card>
);

export default ErrorCard;
