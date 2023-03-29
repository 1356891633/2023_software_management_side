<template>
  <div>
    <el-button @click="handleClick">Click me</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked')
    }
  }
}
</script>
