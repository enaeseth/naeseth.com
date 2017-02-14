import {initialize, pageview} from 'react-ga'

initialize('UA-54647503-1')

export function onRouteUpdate(state) {
  pageview(state.pathname)
}
