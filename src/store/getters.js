const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  DEFAULT_PAGE_SIZE: state => state.table.DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUM: state => state.table.DEFAULT_PAGE_NUM
}
export default getters
