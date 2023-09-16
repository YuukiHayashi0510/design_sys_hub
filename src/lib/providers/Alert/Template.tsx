import Alert from '~/components/Alert'
import type { AlertTemplateProps } from 'react-alert'

export function Template({ message, options }: AlertTemplateProps) {
  const type = options.type ?? 'info'

  return <Alert type={type}>{message}</Alert>
}
