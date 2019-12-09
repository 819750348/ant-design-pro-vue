import { axios } from '@/utils/request'
import Qs from 'qs'
export function getProfessionalNavigation (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/tree/privilege-tree!listPrivilegeTreeNodes.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getNavigationDetail (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!ksearch.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getKnowledgeBase (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/ktype/ktype!listWikiKtypes.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getSearchList (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!listWikiSearchablePropertiesByKtype.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getKnowledgeBaseList (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!wikiSearch.action',
    method: 'post',
    data: Qs.stringify(parameter, { arrayFormat: 'indices', allowDots: true }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
