import type { MDXComponents } from 'mdx/types'
import { Code } from 'bright'

Code.theme = 'github-dark'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    h1: (props) => <h1
    style={{
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: 'bold',
    }}
    {...props} />,
    h2: (props) => <h2
    style={{
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    }}
    {...props} />,
    a: (props) => <a 
    style={{
      color: '#58a6ff',
      textDecoration: 'underline',
      fontWeight: 'bold',
    }} {...props} />,
    em: (props) => <em style={{
      background: '#343942',
      padding: '0 0.25rem',
      borderRadius: '0.25rem',
      fontStyle: 'normal',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    }} {...props} />,
  }
}