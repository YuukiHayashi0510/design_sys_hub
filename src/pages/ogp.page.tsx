import { useRouter } from 'next/router'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import validator from 'validator'
import Button from '~/components/Button/Main'
import { Image } from '~/components/Image'
import { CustomNextPage } from '~/types/next-page'
import { Pre } from '../types/api/ogp'

const OgpSample: CustomNextPage = () => {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<string>('')
  const [json, setJson] = useState({} as Pre)
  const router = useRouter()

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value)
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if (url.length === 0 || !validator.isURL(url)) {
      alert('Is Not URL')
      return
    }

    fetch(`${router.basePath}/api/ogp?url=${url}`)
      .then((res) => res.json())
      .then((json) => {
        setResult(JSON.stringify(json, null, '\t'))
        setJson(json)
      })
      .catch((e) => {
        alert('OGPを取得できませんでした')
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  return (
    <div className='m-10 px-10'>
      <h1 className='text-xl'>OGP情報取得サンプル</h1>
      <form className='my-10 flex gap-2' onSubmit={onSubmit}>
        <input
          className='rounded p-2'
          onChange={onChangeUrl}
          type='text'
          value={url}
        />
        <Button className='rounded p-2' type='submit' variant='contained'>
          送信
        </Button>
      </form>
      {json && (
        <>
          <Image alt={json.description ?? ''} src={json.image ?? ''} />
          <div className='whitespace-pre-wrap break-words rounded border p-2'>
            {result}
          </div>
        </>
      )}
    </div>
  )
}

OgpSample.requireAuth = true
export default OgpSample
