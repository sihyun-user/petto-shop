export const usePageSeo = (
  seo: {
    title?: string
    description?: string
    ogImage?: string
    ogUrl?: string
  } = {}
) => {
  const siteName = '寵物商城 Petto Shop | 精選狗狗保健食品、生食與日常用品，陪伴毛孩健康快樂每一天'
  const defaultImage = 'https://fakeimg.pl/250x100/'

  const fullTitle = seo.title ? `${seo.title} | ${siteName}` : siteName
  const fullDescription =
    seo.description ??
    'Petto Shop 寵物商城，精選國內外優質寵物食品與保健品牌。無論是狗狗白內障預防、關節保養、皮膚營養、骨骼強化、口腔護理、腸胃調理或眼耳健康，Petto Shop 都有多樣化的保健食品可供選擇。歡迎瀏覽 Petto Shop，掌握最新優惠，讓你的毛孩享受全方位的健康呵護。'

  useSeoMeta({
    title: fullTitle,
    description: fullDescription,
    ogTitle: fullTitle,
    ogDescription: fullDescription,
    ogImage: seo.ogImage ?? defaultImage,
    ogUrl: seo.ogUrl ?? 'https://Petto-Shop.com',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: fullDescription,
    twitterImage: seo.ogImage ?? defaultImage
  })

  useHead({
    title: fullTitle
  })
}
