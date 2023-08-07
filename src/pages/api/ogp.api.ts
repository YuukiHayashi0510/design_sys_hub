import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Pre } from '../../types/ogp'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = object | string

function isValidUrlParameter(url: string | string[]): boolean {
  return !(url === undefined || url === null || Array.isArray(url))
}

function getUrlParameter(req: NextApiRequest): string | null {
  const { url } = req.query
  if (url && isValidUrlParameter(url)) return <string>url

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
    const response = await axios.get(url)
    const data = response.data
    const dom = new JSDOM(data)
    const meta = dom.window.document.querySelectorAll('head > meta')

    // metaからOGPを抽出し、JSON形式に変換する
    const ogp: Pre[] | object = Array.from(meta)
      .filter((element) => element.hasAttribute('property'))
      // TODO:preにany以外の型をつける
      .reduce((pre, ogp) => {
        const ogpPre = pre as Pre
        const property = ogp
          .getAttribute('property')!
          .trim()
          .replace('og:', '') as keyof Pre
        const content = ogp.getAttribute('content')
        if (content) ogpPre[property] = content

        return ogpPre
      }, {})
    res.status(200).json(ogp)
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message)
  }
}
