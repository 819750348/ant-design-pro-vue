<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <shareTree></shareTree>
      </a-col>
      <a-col :span="18">
        <shareList></shareList>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import shareTree from './shareTree'
import shareList from './shareList'

export default {
  name: 'Share',
  components: {
    shareTree,
    shareList
  }
}
</script>

<style scoped>

</style>
