import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreatePostData } from '~/types/api/post'
import { CustomNextPage } from '~/types/next-page'

type Inputs = Omit<CreatePostData, 'userId'>

const Create: CustomNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>()

  const { data: session } = useSession()
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const body: CreatePostData = {
        ...data,
        userId: session!.user!.id,
      }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('url', { required: true })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
        <TextField
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register('description', { required: true })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          {...register('image', { required: true })}
          error={!!errors.image}
          helperText={errors.image?.message}
        />

        <Button disabled={!isValid} type='submit'>
          作成
        </Button>
      </form>
    </div>
  )
}

Create.requireAuth = true
export default Create
