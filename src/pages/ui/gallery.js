import React from 'react';
import {Card, Row, Col, Modal} from 'antd';
import './ui.less';

export default class PageGallery extends React.Component {
    state = {
        visible: false
    }

    openGallery = (imgSrc) => {
        this.setState({
            currentImg: imgSrc,
            visible: true
        })
    }

    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png']
        ];
        const imgList = imgs.map((list) => list.map((item, index) => {
            return (
                <div style={{marginBottom: 10}} key={index}>
                    <Card cover={<img src={'/gallery/' + item} alt="" onClick={() => this.openGallery(item)}/>}>
                        <Card.Meta title="React Admin" description="卡片详情"/>
                    </Card>
                </div>
            )
        }));
        return (
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={6}>{imgList[0]}</Col>
                    <Col md={6}>{imgList[1]}</Col>
                    <Col md={6}>{imgList[2]}</Col>
                    <Col md={6}>{imgList[3]}</Col>
                </Row>
                <Modal visible={this.state.visible}
                       title="图片画廊"
                       footer={null}
                       onCancel={() => this.setState({visible: false})}>
                    <img src={'/gallery/' + this.state.currentImg} alt="" style={{width: '100%'}}/>
                </Modal>
            </div>
        )
    }
}