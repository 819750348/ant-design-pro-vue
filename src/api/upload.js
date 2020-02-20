import { axios } from '@/utils/request'
import Qs from 'qs'
export function getFlashconvert (parameter) {
  return axios({
    // url: 'http://10.12.97.30:8006/giksp/knowledge/fileupload!flashconvert_j.action',
    url: 'http://localhost:8006/giksp/knowledge/fileupload!flashconvert_j.action',
    // url: 'fileupload!flashconvert_j.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getKType (parameter) {
  return axios({
    // url: 'http://10.12.97.30:8006/giksp/knowledge/ktype/ktype!listAllktypeWithoutPageAndQuestionAndArticle.action',
    url: 'http://localhost:8006/giksp/knowledge/ktype/ktype!listAllktypeWithoutPageAndQuestionAndArticle.action',
    // url: 'ktype!listAllktypeWithoutPageAndQuestionAndArticle.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function selectKType (parameter) {
  return axios({
    // url: 'http://10.12.97.30:8006/giksp/knowledge/ktype/ktype!listKtypeProperty.action',
    url: 'http://localhost:8006/giksp/knowledge/ktype/ktype!listKtypeProperty.action',
    // url: 'ktype!listKtypeProperty.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function catagorytree (parameter) {
  return axios({
    // url: 'privilege-tree!listTreeRoots.action',
    // url: 'http://10.12.97.30:8006/giksp/tree/privilege-tree!listTreeRoots.action',
    url: 'http://localhost:8006/giksp/tree/privilege-tree!listTreeRoots.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function changeCatagorytree (parameter) {
  return axios({
    // url: 'tree!listSubNode.action',
    url: 'http://localhost:8006/giksp/tree/tree!listSubNode.action',
    // url: 'http://10.12.97.30:8006/giksp/tree/tree!listSubNode.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function catagorytreeOK (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!simplesave.action',
    // url: 'http://10.12.97.30:8006/giksp/knowledge/knowledge!simplesave.action',
    method: 'post',
    // data: parameter
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
