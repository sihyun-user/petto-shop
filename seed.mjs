import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: { persistSession: false }
})

const petTypes = ['dog', 'cat']
const categories = [
  {
    name: '主食',
    subcategories: ['乾糧', '罐頭']
  },
  {
    name: '零食',
    subcategories: ['凍乾', '點心']
  },
  {
    name: '玩具',
    subcategories: ['逗貓棒', '狗咬膠', '毛絨玩具']
  },
  {
    name: '清潔洗護',
    subcategories: ['洗毛精', '除蚤液', '清耳液']
  },
  {
    name: '生活用品',
    subcategories: ['項圈', '牽繩', '貓砂盆', '便盆']
  },
  {
    name: '其他',
    subcategories: ['智能餵食器', '定位器', '自動飲水機', '外出繩']
  }
]

function generateProductFeature(name, category, subcategory) {
  return `${name}，為您的${subcategory}提供優質選擇。此產品屬於${category}分類，採用高品質材質，適合${
    name.includes('貓') ? '貓咪' : '狗狗'
  }日常使用。`
}

// 依照主分類回傳圖片關鍵字，做為動態圖片 URL 使用
function getImageKeywordByCategory(categoryName) {
  if (['主食', '零食'].includes(categoryName)) return 'food'
  if (categoryName === '玩具') return 'toy'
  if (categoryName === '清潔洗護') return 'wash'
  return 'pet'
}

async function seedProducts() {
  // 刪除現有產品資料
  const { error: deleteError } = await supabase.from('products').delete().gte('id', 0)

  if (deleteError) {
    console.error('Error deleting existing data:', deleteError)
    return
  }

  const products = []

  for (let i = 0; i < 100; i++) {
    const petType = faker.helpers.arrayElement(petTypes)
    const categoryObj = faker.helpers.arrayElement(categories)
    const category = categoryObj.name
    const subcategory = faker.helpers.arrayElement(categoryObj.subcategories)

    // 名稱組合：形容詞 + 狗/貓 + 子分類
    const name = `${faker.word.adjective()} ${petType === 'dog' ? '狗' : '貓'}${subcategory}`

    const price = faker.number.int({ min: 100, max: 1500 })
    const hasDiscount = faker.datatype.boolean()
    const discount = hasDiscount
      ? Math.floor(price * faker.number.float({ min: 0.5, max: 0.9, precision: 0.01 }))
      : null

    const description = generateProductFeature(name, category, subcategory)

    const imageKeyword = getImageKeywordByCategory(category)

    products.push({
      name,
      category,
      subcategory,
      price,
      discount,
      description,
      image: imageKeyword,
      pet_type: petType,
      stock: faker.number.int({ min: 0, max: 100 }),
      created_at: faker.date.recent({ days: 90 }).toISOString()
    })
  }

  const { error: insertError } = await supabase.from('products').upsert(products)

  if (insertError) {
    console.error('新增資料錯誤:', insertError)
  } else {
    console.log('產品資料新增成功')
  }
}

seedProducts().catch(console.error)
