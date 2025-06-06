export const useNavLinks = () => [
  { label: '首頁', to: '/' },
  {
    label: '商品分類',
    to: '/products',
    children: [
      { label: '貓貓系列', to: '/products/貓貓系列' },
      { label: '狗狗系列', to: '/products/狗狗系列' },
      { label: '清潔洗護', to: '/products/清潔洗護' },
      { label: '玩具', to: '/products/玩具' },
      { label: '生活用品', to: '/products/生活用品' },
      { label: '其他', to: '/products/其他' }
    ]
  },
  { label: '寵物專欄', to: '/' },
  { label: '關於我們', to: '/about' },
  { label: '聯絡我們', to: '/contact' }
]
