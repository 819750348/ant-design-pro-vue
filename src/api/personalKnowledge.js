import { axios } from '@/utils/request'
import Qs from 'qs'
export function getPrivateTree (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/privilege-tree!listPrivilegeTreeNodes.action',
    // url: 'privilege-tree!listPrivilegeTreeNodes.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getPrivateList (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!ksearch.action',
    // url: 'knowledge!ksearch.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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

export function delectDetails (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!hideKnowledge.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
/**
 * 审批
 *
 * @Author 尘埃Friend
 * @date 2019-12-03
 */

export function createApprovalFlow (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/approval/approval!createApprovalFlowWithFirstNode.action',
    // url: 'approval!createApprovalFlowWithFirstNode.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
