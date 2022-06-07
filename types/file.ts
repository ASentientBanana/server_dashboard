

export type File = {
  path: string,
  name: string,
  type?: string,
  isLocal?: boolean,
  id?: number,
  userId?: string
}

export type QueryFile = {
  id: number,
  project_name: string,
  project_type: string,
  user_id: string,
  is_local: boolean,
  project_location: string,
}