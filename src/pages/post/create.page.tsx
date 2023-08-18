import { TextField, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CustomNextPage } from '~/types/next-page'

type Form = {
  name: string
  description: string
  image: string
  url: string
}

// TODO: OGP取得機能つける。OGPじゃない場合のみFormを出現させる
const Create: CustomNextPage = () => {
  // OGP取得モード: Default: True
  const [isOgpMode, setIsOgpMode] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>()

  const router = useRouter()

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await fetch('/api/post', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    await router.push('/')
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
        {isOgpMode ? (
          <>
            <></>
          </>
        ) : (
          <>
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
          </>
        )}
        <Button disabled={!isValid} type='submit'>
          投稿
        </Button>
      </form>
    </div>
  )
}

Create.requireAuth = true
export default Create
