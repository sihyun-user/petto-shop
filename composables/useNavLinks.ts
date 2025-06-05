export const useNavLinks = () => [
  { label: '首頁', to: '/' },
  {
    label: '商品分類',
    children: [
      { label: '貓貓系列', to: '/products?pet_type=cat' },
      { label: '狗狗系列', to: '/products?pet_type=dog' },
      { label: '清潔洗護', to: 'products?category=清潔洗護' },
      { label: '玩具', to: 'products?category=玩具' },
      { label: '生活用品', to: 'products?category=生活用品' },
      { label: '其他', to: 'products?category=其他' }
    ]
  },
  { label: '寵物專欄', to: '/' },
  { label: '關於我們', to: '/about' },
  { label: '聯絡我們', to: '/contact' }
]
