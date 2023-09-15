import { useRouter } from 'next/router'

export const usePage = () => {
  const router = useRouter()
  const page = router.query.page
  if (typeof page !== 'string') return

  return parseInt(page, 10)
}
