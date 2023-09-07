import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import isURL from 'validator/lib/isURL'
import { Pre } from '~/types/api/ogp'
import { CustomNextPage } from '~/types/next-page'

type Form = {
  name: string
  description: string
  image: string
  url: string
}

const Create: CustomNextPage = () => {
  const [isOgpMode, setIsOgpMode] = useState(true)
  const [ogp, setOgp] = useState<Pre>()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>()

  const router = useRouter()

  const onChangeSwitch = () => setIsOgpMode((prev) => !prev)

  const onClickFetchOgp = async () => {
    setIsLoading(true)

    await fetch(`${router.basePath}/api/ogp?url=${watch('url')}`)
      .then((res) => res.json())
      .then((json: Pre) => {
        setOgp(json)
        setValue('name', json.title ?? '')
        setValue('description', json.description ?? '')
        setValue('image', json.image ?? '')
      })
      .catch((e) => {
        alert('OGPを取得できませんでした')
        // eslint-disable-next-line no-console
        console.error(e)
      })

    setIsLoading(false)
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) await router.push('/')
    else alert(res.statusText)
  }

  return (
    <div className='my-10 grid grid-cols-6'>
      <form
        className='col-span-4 col-start-2 flex flex-col gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControlLabel
          checked={isOgpMode}
          control={<Switch />}
          label='URLから情報を取得して投稿'
          onChange={onChangeSwitch}
          required
        />
        <TextField
          label='url'
          {...register('url', {
            required: true,
            validate: (value) => isURL(value),
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
        {isOgpMode && (
          <>
            <Button
              disabled={!isURL(watch('url') ?? '')}
              onClick={onClickFetchOgp}
              variant='contained'
            >
              取得
            </Button>
            {ogp && (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={ogp.description!} className='p-10' src={ogp.image!} />
            )}
            {isLoading && <CircularProgress />}
          </>
        )}
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
        <Button disabled={!isValid} type='submit'>
          投稿
        </Button>
      </form>
    </div>
  )
}

Create.requireAuth = true
export default Create
