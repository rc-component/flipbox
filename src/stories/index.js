import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Flipbox from '../index';

const boxStyles = {
  width: 100,
  height: 100,
  lineHeight: '100px',
  textAlign: 'center'
}

storiesOf('Flipbox', module)
  .add('swipe it', () => {
    let Flipper = React.createClass({
      getInitialState: function () {
        return {
          visible: 'front'
        }
      },
      flip: function () {
        this.setState({
          visible: this.state.visible == 'front' ? 'back' : 'front'
        })
      },
      onShow: function (visible) {
        console.log(visible)
      },
      onShown: function (visible) {
        console.log(visible)
      },
      render: function () {
        return (
        <div>
          <button onClick={this.flip}>flip</button>
            <Flipbox onShow={this.onShow} onShown={this.onShown} visible={this.state.visible}>
              <div style={{...boxStyles, backgroundColor: 'lightgreen'}}>front</div>
              <div style={{...boxStyles, backgroundColor: 'deepskyblue', height: 50, lineHeight: '50px'}}>back</div>
            </Flipbox>
            <div>bottom</div>
        </div>
        )
      }
    })
    return React.createElement(Flipper)
  })
