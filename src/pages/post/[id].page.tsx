import { TextField } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useAlert } from 'react-alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '~/components/Button/Main'
import { Image } from '~/components/Image'
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
  const alert = useAlert()

  const url = `/api/post/${post.id}`

  const onClickDelete = async () => {
    const res = await fetch(url, {
      method: 'DELETE',
    })

    if (!res.ok) alert.error(await res.text())
    await router.push('/')
    alert.info('削除しました')
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

    if (!res.ok) alert.error(await res.text())
    const json = await res.json()

    setValue('name', json.name)
    setValue('description', json.description)
    setValue('image', json.image)
    setValue('url', json.url)
    alert.success('更新しました')
  }

  return (
    <div className='my-10 grid grid-cols-6'>
      <form
        className='col-span-4 col-start-2 flex flex-col gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          alt={post.description}
          className='aspect-image w-full rounded p-0'
          src={post.image}
        />

        <TextField
          label='name'
          {...register('name', { required: true })}
          disabled={session?.user?.id !== post.userId}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label='description'
          {...register('description', { required: true })}
          disabled={session?.user?.id !== post.userId}
          error={!!errors.description}
          helperText={errors.description?.message}
          multiline
          rows={4}
        />
        <TextField
          label='image'
          {...register('image', { required: true })}
          disabled={session?.user?.id !== post.userId}
          error={!!errors.image}
          helperText={errors.image?.message}
        />
        <TextField
          label='url'
          {...register('url', { required: true })}
          disabled={session?.user?.id !== post.userId}
          error={!!errors.url}
          helperText={errors.url?.message}
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
