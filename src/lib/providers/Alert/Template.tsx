import Alert from '~/components/Alert'
import type { AlertTemplateProps } from 'react-alert'

export function Template({ message, options }: AlertTemplateProps) {
  return <Alert type={options.type}>{message}</Alert>
}
