import { axios } from '@/utils/request'
import Qs from 'qs'

export function getWiki (parameter) {
  return axios({
    // url: 'http://localhost:8006/giksp/knowledge/fileupload!flashconvert_j.action',
    url: 'knowledge!showwiki.action',
    method: 'get',
    data: Qs.stringify(parameter),
    header: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
