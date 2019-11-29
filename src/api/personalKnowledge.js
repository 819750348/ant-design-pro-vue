import { axios } from '@/utils/request'
export function getPrivateTree (parameter) {
  return axios({
    url: 'privilege-tree!listPrivilegeTreeNodes.action',
    method: 'post',
    params: parameter
  })
}

export function getPrivateList (parameter) {
  return axios({
    url: 'knowledge!ksearch.action',
    method: 'post',
    params: parameter
  })
}
