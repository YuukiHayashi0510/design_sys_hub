import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import validator from 'validator'
import { Pre } from '../types/ogp'

const OgpSample = () => {
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
      <form className='flex gap-2 my-10' onSubmit={onSubmit}>
        <input
          className='p-2 rounded'
          onChange={onChangeUrl}
          type='text'
          value={url}
        />
        <Button className='p-2 rounded' type='submit' variant='contained'>
          送信
        </Button>
      </form>
      {json && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={json.description} className='p-10' src={json.image} />
          <div className='border rounded p-2 break-words whitespace-pre-wrap'>
            {result}
          </div>
        </>
      )}
    </div>
  )
}

export default OgpSample
