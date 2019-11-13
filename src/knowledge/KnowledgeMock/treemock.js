import Mock from 'mockjs2'
import { builder } from '@components/mock/util'

const treeData = (options) => {
  const treeType = options.treeType
  const operationName = options.operationName

  return builder({
    'treeType': treeType,
    'operationName': operationName
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

Mock.mock(/\/agiksp\/tree/, 'post', treeData)
