import { Button, TextField } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UpdatePostBody } from '~/types/api/post'
import { findPostById } from '../api/post/service'

type PostProps = {
  id: string
  name: string
  description: string
  image: string
  url: string
}

function Detail({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostProps>({ defaultValues: post })

  const router = useRouter()

  const url = `/api/post/${post.id}`

  const onClickDelete = async () => {
    await fetch(url, {
      method: 'DELETE',
    })
    await router.push('/')
  }

  const onSubmit: SubmitHandler<PostProps> = async (data) => {
    const body: UpdatePostBody = {
      name: data.name,
      description: data.description,
      image: data.image,
      url: data.url,
    }

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const json = await res.json()

    setValue('name', json.name)
    setValue('description', json.description)
    setValue('image', json.image)
    setValue('url', json.url)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          更新
        </Button>
        <Button onClick={onClickDelete}>削除</Button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  post: PostProps
}> = async (context) => {
  const id = Array.isArray(context.params?.id)
    ? context.params?.id[0]
    : context.params?.id

  const res = await findPostById(id!)
  const post = JSON.parse(JSON.stringify(res))
  return { props: { post } }
}

export default Detail
