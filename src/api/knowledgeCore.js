import { axios } from '@/utils/request'
import Qs from 'qs'
export function getProfessionalNavigation (parameter) {
  return axios({
    // url: 'http://localhost:8006/giksp/tree/privilege-tree!listPrivilegeTreeNodes.action',
    url: 'http://10.12.97.30:8006/giksp/tree/privilege-tree!listPrivilegeTreeNodes.action',
    // url: 'privilege-tree!listPrivilegeTreeNodes.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getNavigationDetail (parameter) {
  return axios({
    // url: 'http://10.12.97.30:8006/giksp/knowledge/knowledge!ksearch.action',
    url: 'http://localhost:8006/giksp/knowledge/knowledge!ksearch.action',
    // url: 'knowledge!ksearch.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getKnowledgeBase (parameter) {
  return axios({
    // url: 'http://localhost:8006/giksp/knowledge/ktype/ktype!listWikiKtypes.action',
    url: 'http://10.12.97.30:8006/giksp/knowledge/ktype/ktype!listWikiKtypes.action',
    // url: 'ktype!listWikiKtypes.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function getSearchList (parameter) {
  return axios({
    url: 'http://10.12.97.30:8006/giksp/knowledge/knowledge!listWikiSearchablePropertiesByKtype.action',
    // url: 'http://localhost:8006/giksp/knowledge/knowledge!listWikiSearchablePropertiesByKtype.action',
    // url: 'knowledge!listWikiSearchablePropertiesByKtype.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getKnowledgeBaseList (parameter) {
  return axios({
    url: 'http://10.12.97.30:8006/giksp/knowledge/knowledge!wikiSearch.action',
    // url: 'http://localhost:8006/giksp/knowledge/knowledge!wikiSearch.action',
    // url: 'knowledge!wikiSearch.action',
    method: 'post',
    // data: Qs.stringify(parameter, { arrayFormat: 'indices', allowDots: true }),
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getKnowledgeType (parameter) {
  return axios({
    // url: 'http://localhost:8006/giksp/knowledge/ktype/ktype!listKnowledgetype.action',
    url: 'http://10.12.97.30:8006/giksp/knowledge/ktype/ktype!listKnowledgetype.action',
    // url: 'ktype!listKnowledgetype.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
