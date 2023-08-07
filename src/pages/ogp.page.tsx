import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'
import { Pre } from '../types/ogp'

const OgpSample = () => {
  const [url, setUrl] = useState('')
  const router = useRouter()
  const [result, setResult] = useState<string>('')
  const [json, setJson] = useState({} as Pre)

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if (url.length === 0) return

    fetch(`${router.basePath}/api/ogp?url=${url}`)
      .then((res) => res.json())
      .then((json) => {
        setResult(JSON.stringify(json, null, '\t'))
        setJson(json)
      })
  }

  return (
    <div className='m-10 px-10'>
      <h1 className='text-xl'>OGP情報取得サンプル</h1>
      <form className='flex gap-2 my-10' onSubmit={onSubmit}>
        <input
          className='p-2 rounded'
          onChange={(e) => setUrl(e.target.value)}
          type='text'
          value={url}
        />
        <button className='bg-sky-700 p-2 rounded' type='submit'>
          送信
        </button>
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
