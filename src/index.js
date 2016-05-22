import React, { Component, PropTypes, Children } from 'react'
import ReactDom from 'react-dom'
import style from './style.css'
import cx from 'classnames'

function emptyFn() {}

export default class Flipbox extends Component {
  static defaultProps = {
    visible: 'front',
    onShow: emptyFn,
    onShown: emptyFn
  }
  static propTypes = {
    visible: PropTypes.oneOf(['front', 'back']),
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    children: function (props, propName) {
      let children = props[propName]
      if (!children || children.length !== 2) {
        throw new Error('Expect two children to work')
      }
      if (children[0].type !== 'div' || children[1].type !== 'div') {
        throw new Error('Expect two div children')
      }
    }
  }
  componentDidMount() {
    this.el = ReactDom.findDOMNode(this)
    this.onShown(this.props.visible)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  componentWillReceiveProps(props) {
    let visible = props.visible
    if (visible !== this.props.visible) {
      this.onShow(visible)
    }
    this.timer = setTimeout(()=> {
      if (this.props.visible === visible) {
        this.onShown(visible)
      }
    }, 350)
  }
  onShow(visible) {
    this.refs[0].style.display = 'block'
    this.refs[1].style.display = 'block'
    this.props.onShow(visible)
  }
  onShown(visible) {
    let current = visible === 'front' ? 0 : 1
    let back = 1^current
    this.refs[back].style.display = 'none'
    let curr = this.refs[current]
    let width = curr.clientWidth
    let height = curr.clientHeight
    let style = this.el.style
    style.width = width + 'px'
    style.height = height + 'px'
    this.props.onShown(visible)
  }
  render() {
    let props = this.props
    let clz = cx(style.flipbox, props.className, {
      [style.flipped]: props.visible === 'back'
    })
    return (
      <div className={clz} style={props.style}>
        <div className={style.wrapper}>
          {Children.map(props.children, (el, idx) => {
            return React.cloneElement(el, { ref: idx })
          })}
        </div>
      </div>
    )
  }
}
