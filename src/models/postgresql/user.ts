import { pool } from "../../db/postgresql"
import type { NewUser } from "../../types/user"
import bcrypt from "bcrypt"

export class UserModel {
  getAllUsers = async () => {
    const client = await pool.connect()
    try {
      const { rows } = await client.query('SELECT * FROM users')
      return rows
    } catch (error) {
      await client.query('ROLLBACK')
      if (error instanceof Error) {
        throw new Error(`Server Error: ${error.message}`)
      }
    } finally {
      client.release()
    }
  }

  getUserById = async ({ userId }: { userId: string }) => {
    const client = await pool.connect()
    try {
      const queryText = 'SELECT id, name, email, user_role, created_at FROM users WHERE id = $1'
      const queryValue = [userId]
      const { rows } = await client.query(queryText, queryValue)

      if (!rows[0]) {
        throw new Error(`User with id ${userId} does not exist`)
      }

      return rows[0]

    } catch (error) {
      await client.query('ROLLBACK')
      if (error instanceof Error) {
        throw new Error(`Server Error: ${error.message}`)
      }
    } finally {
      client.release()
    }
  }

  registerNewUser = async ({ newUser }: { newUser: NewUser }) => {
    const {
      name,
      email,
      password,
      userRole
    } = newUser

    const client = await pool.connect()

    try {
      // verify if already exists
      const { rows } = await client.query('SELECT email FROM users WHERE email = $1', [email])

      if (rows.length > 0) {
        throw new Error('Email in use')
      }

      // encrypt the password
      const hashPassword = await bcrypt.hash(password, 13)

      // register user
      await client.query('BEGIN')

      const queryText = 'INSERT INTO users (name, email, password, user_role) VALUES ($1, $2, $3, $4)'
      const queryValues = [name, email, hashPassword, userRole]

      const result = await client.query(queryText, queryValues)

      await client.query('COMMIT')
      
      return result

    } catch (error) {
      await client.query('ROLLBACK')
      if (error instanceof Error) {
        throw new Error(`Server Error: ${error.message}`)
      }
    } finally {
      client.release()
    }
    
  }
}