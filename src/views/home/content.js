import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {
  Card,
  Row,
  Col,
  Badge,
  Icon,
  Modal,
  Spin
} from 'antd'
import { Link } from 'react-router-dom'

const site = 'http://video.iblack7.com/'
const Meta = Card.Meta
moment.locale('zh-cn')

export default class Content extends Component {
  state = { visible: false }

  _handleClose = (e) => {
    if (this.player && this.player.pause) this.player.pause()
  }

  _handleOk = (e) => {
    this.setState({
      visible: false
    })
  }

  _handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  _showModal = (movie) => {
    this.setState({
      visible: true
    })
    const video = site + movie.videoKey
    const pic = site + movie.coverKey
    if (!this.player) {
      setTimeout(() => {
        this.player = new DPlayer({
          container: document.getElementsByClassName('videoModal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: movie.video,
            // url: video,
            pic: movie.poster,
            // pic,
            thumbnails:  movie.poster
          }
        })
      }, 500)
    } else {
      if (this.player.video.currentSrc !== video) {
        this.player.switchVideo({
          url: movie.video,
          // url: video,
          autoplay: true,
          pic: movie.poster,
          // pic,
          type: 'auto'
        })
      }
      this.player.play()
    }
  }

  _jumeToDetail = () => {
    const { url } = this.props
    url && window.open(url)
  }

  _renderContent = () => {
    const { movies } = this.props
    console.log(movies, 'movies')
    return (
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          {
            movies.map((it, i) => (
              <Col
                key={i}
                xl={{span: 6}}
                lg={{span: 8}}
                md={{span: 12}}
                sm={{span: 24}}
                style={{marginBottom: '8px'}}
              >
                <Card
                  bordered={false}
                  hoverable
                  style={{ width: '100%' }}
                  actions={[
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type="clock-circle" />
                      {moment(it.meta.createdAt).fromNow(true)}
                      前更新
                    </Badge>,
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type="clock-circle" />
                      {it.rate} 分
                  </Badge>
                  ]}
                  // cover={ <img src={site + it.posterKey + '?imageMongr2/thumbnail/x1680/crop/1080x1600'} /> }
                  cover={ <img style={{width: '100%', height: '400px'}} onClick={() => this._showModal(it)} src={it.poster} /> }
                >
                  <Meta
                    style={{height: '202px', overflow: 'hidden'}}
                    title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                    onClick={this._jumeToDetail}
                    description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal
          className='videoModal'
          footer={null}
          afterClose={this._handleClose}
          visible={this.state.visible}
          onCancel={this._handleCancel}
        >
          <Spin size="large" />
        </Modal>
      </div>
    )
  }

  render () {
    return (
      <div style={{ padding: 10 }}>
        {this._renderContent()}
      </div>
    )
  }
}