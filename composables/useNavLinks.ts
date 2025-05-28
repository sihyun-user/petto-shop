export const useNavLinks = () => [
  { label: '首頁', to: '/' },
  {
    label: '所有商品',
    children: [
      { label: '主食', to: '/products' },
      { label: '零食', to: '/products' },
      { label: '毛孩用品', to: '/products' },
      { label: '玩具', to: '/products' }
    ]
  },
  { label: '寵物專欄', to: '/' },
  { label: '關於我們', to: '/' },
  { label: '聯絡我們', to: '/' }
]
