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
