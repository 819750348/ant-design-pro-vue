<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <personalTree></personalTree>
      </a-col>
      <a-col :span="18">
        <personalList></personalList>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import personalTree from './personalTree'
import personalList from './personalList'
export default {
  name: 'Personal',
  components: {
    personalTree,
    personalList
  }
}
</script>

<style scoped>

</style>
