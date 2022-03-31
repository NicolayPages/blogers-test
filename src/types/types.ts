
export type UsersType = {
   id: number
   name: string
   company: CompanyType
}
type CompanyType = {
   name: string
}
export type PostsType = {
   userId: number
   id: number
   title: string
   body: string
}



