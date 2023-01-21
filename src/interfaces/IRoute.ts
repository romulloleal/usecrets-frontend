export interface IRoute {
  path: string
  element: React.FC
  isPrivate?: boolean
  redirectWhenLogged?: boolean
  permissions?: string[]
}
