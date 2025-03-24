export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  userRole: string,
  createdAt: string,
}

export type NewUser = Omit<User, 'id' | 'createdAt'>