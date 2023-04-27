import { LoadingOverlay } from '@mantine/core'
import { ContactUs, Features, Footer, HeroWithBackground } from '../../components'
import { getIsFoodsLoading } from '../../store/food/foodSelectors'
import { useAppSelector } from '../../store/hooks'
import { getIsUserLoading } from '../../store/user/userSelectors'
import { useEffect } from 'react'

export const Home = () => {
  const isUserLoading = useAppSelector(getIsUserLoading)
  const isFoodLoading = useAppSelector(getIsFoodsLoading)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <HeroWithBackground />
      <Features />
      <ContactUs />
      <Footer />
      <LoadingOverlay visible={isUserLoading || isFoodLoading} overlayBlur={1} loaderProps={{ size: 'xl' }} />
    </div>
  )
}
