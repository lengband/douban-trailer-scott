import React, { Component } from 'react'
import { request } from '../../lib'
import Layout from '../../layouts/default'
import Content from './content'
import {
  Menu
} from 'antd'

const qs = require('qs')
const R = require('ramda')

export default class Home extends Component {
  constructor (props) {
    super(props)
    const { search } = this.props.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      type: query.type || '',
      year: query.year || '',
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
    this.props.history.listen(route => {
      const searchObj = qs.parse(route.search, { ignoreQueryPrefix: true })
      this.setState({
        type: searchObj.type || '',
        year: searchObj.year || ''
      }, () => {
        this._getAllMovies()
      })
    })
  }
  _selectItem = ({key}) => {
    this.setState({
      selectedKey: key
    })
  }
  _getAllMovies () {
    const query = {}
    if (this.state.type) query.type = this.state.type
    if (this.state.year) query.year = this.state.year
    const queryStr = qs.stringify(query, { addQueryPrefix: true })
    request(window.__LOADING__)({
      method: 'get',
      url: `api/v0/movies${queryStr}`
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
  pushYear (year) {
    let { pathname, search } = this.props.location
    const searchObj = qs.parse(search, { ignoreQueryPrefix: true })
    searchObj.year = year
    const searchStr = qs.stringify(searchObj)
    this.props.history.push(`${pathname}?${searchStr}`)
  }
  render () {
    const { years, year } = this.state
    return (
      <Layout {...this.props}>
        <div className="flex-row full">
          <Menu
            defaultSelectedKeys={[year]}
            mode="inline"
            style={{ height: '100%', overflow: 'scroll', maxWidth: 230 }}
            className="align-self-start"
          >
            {
              years.map(y => (
                <Menu.Item key={y}>
                  <a onClick={() => this.pushYear(y)}>{y} 年上映</a>
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