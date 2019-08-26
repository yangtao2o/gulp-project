import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import './index.scss';

export default class LoadMorePage extends Taro.Component {
  handleClick (type) {
    Taro.atMessage({
      'message': '消息通知',
      'type': type,
    })
  }
  render () {
    return (
      <View>
        <AtMessage />
        <AtButton onClick={this.handleClick.bind(this)}>
          普通消息
        </AtButton>
        <AtButton onClick={this.handleClick.bind(this, 'success')}>
          成功消息
        </AtButton>
        <AtButton onClick={this.handleClick.bind(this, 'error')}>
          错误消息
        </AtButton>
        <AtButton onClick={this.handleClick.bind(this, 'warning')}>
          警告消息
        </AtButton>
      </View>
    )
  }
}