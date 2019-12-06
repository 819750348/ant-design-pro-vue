import { axios } from '@/utils/request'
import Qs from 'qs'
export function getRecentlyView (parameter) {
  return axios({
    url: 'http://localhost:8006/giksp/log/log!getRecentlyViewKnowledges.action',
    method: 'post',
    data: Qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
