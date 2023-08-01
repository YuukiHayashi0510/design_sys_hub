import axios from 'axios'
import { JSDOM } from 'jsdom'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = object | string

function isValidUrlParameter(url: string | string[]): boolean {
  return !(url === undefined || url === null || Array.isArray(url))
}

function getUrlParameter(req: NextApiRequest): string | null {
  const { url } = req.query
  if (url && isValidUrlParameter(url)) {
    return <string>url
  }
  return null
}

export default async function getOgpInfo(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const url = getUrlParameter(req)
  if (!url) {
    res.status(400).send('error')
    return
  }

  try {
    const responce = await axios.get(<string>url)
    const data = responce.data
    const dom = new JSDOM(data)
    const meta = dom.window.document.querySelectorAll('head > meta')

    // metaからOGPを抽出し、JSON形式に変換する
    const ogp = Array.from(meta)
      .filter((element) => element.hasAttribute('property'))
      // TODO:preにany以外の型をつける
      .reduce((pre: any, ogp) => {
        const property = ogp.getAttribute('property')!.trim().replace('og:', '')
        const content = ogp.getAttribute('content')
        pre[property] = content
        return pre
      }, {})
    res.status(200).json(ogp)
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message)
  }
}
