import { Button, TextField } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UpdatePostBody } from '~/types/api/post'
import { CustomNextPage } from '~/types/next-page'
import { findPostById } from '../api/post/service'

type PostProps = {
  id: string
  name: string
  description: string
  image: string
  url: string
  userId: string
}

const Detail: CustomNextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostProps>({ defaultValues: post })

  const { data: session } = useSession()
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
    <div className='my-10 grid grid-cols-6'>
      <form
        className='col-span-4 col-start-2 flex flex-col gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label='url'
          {...register('url', { required: true })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
        <TextField
          label='name'
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label='description'
          {...register('description', { required: true })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          label='image'
          {...register('image', { required: true })}
          error={!!errors.image}
          helperText={errors.image?.message}
        />

        {session!.user!.id === post.userId ? (
          <>
            <Button disabled={!isValid} type='submit'>
              更新
            </Button>
            <Button onClick={onClickDelete}>削除</Button>
          </>
        ) : null}
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

Detail.requireAuth = true
export default Detail
