import Layout from '@/components/layout/CheckAuthLayout'
import { NewTestBackupProvider } from '@/hooks/useNewTestBackup'
import { ValidationProvider } from '@/hooks/useValidation'
import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NewTestBackupProvider>
      <ValidationProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ValidationProvider>
    </NewTestBackupProvider>
  )
}
