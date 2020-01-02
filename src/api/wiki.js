import { axios } from '@/utils/request'

export function getWiki (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!showwiki.action',
    // url: 'knowledge!showwiki.action',
    method: 'get',
    params: parameter
  })
}
export function getRecommentKnowledge (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/knowledge/knowledge!listRcommentKnowledge.action',
    // url: 'knowledge!listRcommentKnowledge.action',
    method: 'get',
    params: parameter
  })
}
