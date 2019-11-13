import api from './treeApi'
import { axios } from '@/utils/request'

export function getPrivateTree () {
  return axios({
    url: api.privateTree,
    method: 'post'
  })
}
export function getEditorTree (parameter) {
  return axios({
    url: api.editor,
    method: 'post',
    data: parameter
  })
}
