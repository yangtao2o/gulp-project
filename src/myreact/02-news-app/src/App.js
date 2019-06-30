import React from 'react';
import { Row, Col } from 'antd';
import news from './assets/img/news.svg';
function App() {
  return (
    <div className="App">
      <Row>
        <Col span={2}></Col>
        <Col span={2}>
          <img src={ news } className="App-logo" alt="App logo" /><br />
        </Col>
        <Col span={2}>头条新闻</Col>
        <Col span={16}></Col>
        <Col span={2}></Col>
      </Row>
   
    </div>
  );
}

export default App;
