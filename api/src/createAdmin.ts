import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import prompt from 'prompt'

const orm = new PrismaClient()


// miguelhernandez
// aprendeConPlatzi
prompt.start()

prompt.get(
  [
    {
      name: 'name',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
    {
      name: 'password',
      // @ts-ignore outdated types
      hidden: true,
      replace: '*',
      required: true,
    },
  ],
  async function (err, result) {
    if (err) {
      console.warn('Huh. Something went wrong.')
      return
    }
    const name = result.name as string
    const hashedPassword = await hash(result.password as string, 10)

    const user = await orm.adminAPI.create({
      data: {
        name: name,
        password: hashedPassword,
      }
    })

    console.log(`User ${user.name} created with id ${user.id}\n`)
  }
)
