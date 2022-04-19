import { ReactNode } from 'react'

interface PageTitleProps {
  children: ReactNode
}
const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
      {children}
    </h1>
  )
}

export default PageTitle
