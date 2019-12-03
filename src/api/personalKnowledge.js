import { axios } from '@/utils/request'
import Qs from 'qs'
export function getPrivateTree (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/privilege-tree!listPrivilegeTreeNodes.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getPrivateList (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge!ksearch.action',
    method: 'post',
    data: parameter
  })
}

export function addTreeNodeMethod (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/tree!save.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function updateTreeNodeMethod (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/tree!update.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function deleteTreeNodeMethod (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/tree!delete.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}