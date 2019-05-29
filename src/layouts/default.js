import React, { Component } from 'react'
import { Menu, Spin } from 'antd'
import navRoutes from '../nav'

const qs = require('qs')

export default class LayoutDefault extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      tip: '再等一下下嘛'
    }
  }
  componentDidMount () {
    window.__LOADING__ = this.toggleLoading
    this._getMatchRoute()
  }
  componentWillUnmount () {
    window.__LOADING__ = null
  }
  
  matchRouteType = navRoutes[0].type
  
  _getMatchRoute () {
    const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    if (queryObj.type) {
      this.matchRouteType = queryObj.type
    }
  }
  menuSelect ({ key }) {
    this.matchRouteType = key
  }
  toggleLoading = (status = false, tip = "在等一下哦") => {
    this.setState({
      tip,
      loading: status
    })
  }
  pushType (type) {
    let { pathname, search } = this.props.location
    const searchObj = qs.parse(search, { ignoreQueryPrefix: true })
    searchObj.type = type
    if (type === '/') delete searchObj.type
    const searchStr = qs.stringify(searchObj)
    this.props.history.push(`${pathname}?${searchStr}`)
  }
  _getMenuContent = ({ type, name }) => (
    <a onClick={() => this.pushType(type)} style={{color: '#fff2e8'}}>
      {name}
    </a>
  )
  render () {
    const { children } = this.props
    const { loading, tip } = this.state
    return (
      <div className="flex-colum" style={{ width: '100%', height: '100%' }}>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{ fontSize: 13.5 }}
          onSelect={this.menuSelect.bind(this)}
          selectedKeys={[ this.matchRouteType ]}
        >
          <Menu.Item
            style={{
              marginLeft: 24,
              marginRight: 30,
              fontSize: 18,
              textAlign: 'center',
              color: '#fff !important',
              float: 'left'
            }}>
            <a href={'/'} className="hover-scale logo-text" style={{ color: '#ff2e8' }}>
              神奇预告片
            </a>
          </Menu.Item>
          {
            navRoutes.map((e) => (
              <Menu.Item key={e.type}>
                { this._getMenuContent({...e}) }
              </Menu.Item>
            ))
          }
        </Menu>
        <Spin
          spinning={ loading }
          tip={ tip }
          wrapperClassName="content-spin full"
        >
          { children }
        </Spin>
      </div>
    )
  }
}