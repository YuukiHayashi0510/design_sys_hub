import { NextApiRequest } from 'next'

function isValidUrlParameter(url: string | string[]): boolean {
  return !(url === undefined || url === null || Array.isArray(url))
}

export function getUrlParameter(req: NextApiRequest): string | null {
  const { url } = req.query
  if (url && isValidUrlParameter(url)) return <string>url

  return null
}
