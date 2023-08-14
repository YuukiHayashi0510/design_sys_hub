import axios, { HttpStatusCode } from 'axios'
import { JSDOM } from 'jsdom'
import { ApiError } from 'next/dist/server/api-utils'
import validator from 'validator'
import { getUrlParameter } from './service'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Pre } from '~/types/ogp'

type Data = object | string

export default async function getOgpInfo(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>,
) {
  const url = getUrlParameter(req)

  if (!url || !validator.isURL(url))
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Url is invalid.',
    })

  try {
    const response = await axios.get(url)
    const data = response.data
    const dom = new JSDOM(data)
    const meta = dom.window.document.querySelectorAll('head > meta')

    // metaからOGPを抽出し、JSON形式に変換する
    const ogp: Pre[] | object = Array.from(meta)
      .filter((element) => element.hasAttribute('property'))
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
    res.status(HttpStatusCode.Ok).json(ogp)
  } catch (e) {
    if (e instanceof Error)
      res.status(HttpStatusCode.BadRequest).json({
        statusCode: HttpStatusCode.BadRequest,
        message: `${e.message}: ${e.cause}`,
      })
  }
}
