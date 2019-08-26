import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtButton, AtNavBar, AtTabBar } from "taro-ui";
import GridLayout from "../layout/index";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  constructor(props) {
    super(props)
    this.status = {

    }
  }
  handleClick() {

  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtNavBar
          onClickRgIconSt={this.handleClick}
          onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.handleClick}
          color="#000"
          leftText="返回"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
        >
          <View>Taro UI</View>
        </AtNavBar>
        <AtAvatar
          circle
          text="Tao"
          image="https://jdc.jd.com/img/200"
          size="large"
        />
        <Text>Hello world!</Text>
        <GridLayout />
        <AtButton type="primary">按钮文案</AtButton>
        <AtTabBar
          backgroundColor="#ececec"
          color="#ea6bb8"
          tabList={[
            { title: "待办事项", iconType: "bullet-list", text: "new" },
            { title: "拍照", iconType: "camera" },
            { title: "文件夹", iconType: "folder", text: "100", max: "99" }
          ]}
         
        />
  
      </View>
    );
  }
}
