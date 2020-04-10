<template>
  <div>我是子组件，接收：{{msg}}</div>
</template>

<script>
export default {
  name: "child",
  props: ['msg'],
}
</script>