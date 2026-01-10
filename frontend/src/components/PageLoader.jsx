import React from 'react'
import { LoaderIcon } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore.js';
const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="flex items-center justify-center min-h-screen" data-theme={theme}>
      <LoaderIcon className="animate-spin" size={48} />
    </div>
  )
}

export default PageLoader