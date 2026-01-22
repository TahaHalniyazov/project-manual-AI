export const useAppMenu = () => {
  const coreLinks = [
    { label: 'Home', to: '/' },
    { label: 'Data', to: '/data' },
    { label: 'Relations', to: '/relations' },
  ]

  const config = useRuntimeConfig()
  const layerLinks = config.public?.layerMenuLinks || []

  return {
    links: [...coreLinks, ...layerLinks],
  }
}
