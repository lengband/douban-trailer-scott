import React, { Component } from 'react'
import { request } from '../../lib'
import Layout from '../../layouts/default'
import Content from './content'
import {
  Menu
} from 'antd'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      type: this.props.match.params.type,
      type: this.props.match.params.year,
      movies: []
    }
  }
  _renderContent = () => {
    const { movies } = this.state
    if (!movies || !movies.length) return null
    return (
      <Content movies={movies} />
    )
  }
  componentDidMount () {
    this._getAllMovies()
  }
  _selectItem = ({key}) => {
    this.setState({
      selectedKey: key
    })
  }
  _getAllMovies () {
    request(window.__LOADING__)({
      method: 'get',
      url: `api/v0/movies?type=${this.state.type || ''}&year=${this.state.year || ''}`
    }).then(movies => {
      this.setState({
        movies
      })
    }).catch(() => {
      this.setState({
        movies: []
      })
    })
  }
  render () {
    const { years, selectedKey } = this.state
    return (
      <Layout {...this.props}>
        <div className="flex-row full">
          <Menu
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            style={{ height: '100%', overflow: 'scroll', maxWidth: 230 }}
            onSelect={this._selectItem}
            className="align-self-start"
          >
            {
              years.map((e, i) => (
                <Menu.Item key={i}>
                  <a href={`/year/${e}`}>{e} 年上映</a>
                </Menu.Item>
              ))
            }
          </Menu>
          <div className="flex-1 scroll-y align-selt-start">
            {this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}