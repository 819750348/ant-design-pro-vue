import { axios } from '@/utils/request'
export function getProfessionalNavigation (parameter) {
  return axios({
    url: '/giksp/knowledge/ktype/ktype!listKnowledgetype.action',
    method: 'post',
    data: parameter
  })
}
export function getNavigationDetail (parameter) {
  return axios({
    url: '/giksp/knowledge/knowledge!ksearch.action',
    method: 'post',
    data: parameter
  })
}
export function getKnowledgeBase (parameter) {
  return axios({
    url: '/giksp/knowledge/ktype/ktype!listWikiKtypes.action',
    method: 'post',
    data: parameter
  })
}
export function getSearchList (parameter) {
  return axios({
    url: '/giksp/knowledge/knowledge!listWikiSearchablePropertiesByKtype.action',
    method: 'post',
    data: parameter
  })
}

export function getKnowledgeBaseList (parameter) {
  return axios({
    url: '/giksp/knowledge/knowledge!wikiSearch.action',
    method: 'post',
    data: parameter
  })
}
