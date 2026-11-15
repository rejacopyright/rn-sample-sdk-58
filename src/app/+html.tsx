import '../unistyles'
import { useServerDocumentContext } from 'expo-router/html'
import { type PropsWithChildren } from 'react'
import { useServerUnistyles } from 'react-native-unistyles/server'

// Rendered after the page, so it collects the styles the page rendered
const UnistylesStyles = () => <>{useServerUnistyles({ includeRNWStyles: false })}</>

export default function Root({ children }: PropsWithChildren) {
  const { htmlAttributes, bodyAttributes, headNodes, bodyNodes } = useServerDocumentContext()

  return (
    <html {...htmlAttributes} className='light'>
      <head>{headNodes}</head>
      <body {...bodyAttributes}>
        {children}
        <UnistylesStyles />
        {bodyNodes}
      </body>
    </html>
  )
}
