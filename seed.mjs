import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: { persistSession: false }
})

const petTypes = ['狗', '貓']
const categories = [
  { name: '主食', subcategories: ['乾糧', '罐頭'] },
  { name: '零食', subcategories: ['凍乾', '點心'] },
  { name: '玩具', subcategories: ['逗貓棒', '狗咬膠', '毛絨玩具'] },
  { name: '清潔洗護', subcategories: ['洗毛精', '除蚤液', '清耳液'] },
  { name: '生活用品', subcategories: ['項圈', '牽繩', '貓砂盆', '便盆'] },
  { name: '其他', subcategories: ['智能餵食器', '定位器', '自動飲水機', '外出繩'] }
]

// 分類及子分類對應描述函式
const categoryFeatureMap = {
  主食: {
    乾糧: (isCat) =>
      `專為${isCat ? '貓咪' : '狗狗'}設計的營養乾糧，富含優質蛋白與均衡配方，讓毛孩健康每一天。`,
    罐頭: (isCat) =>
      `嚴選食材製成的${isCat ? '貓咪' : '狗狗'}罐頭，口感濕潤香濃，滿足味蕾同時補充水分與營養。`
  },
  零食: {
    凍乾: (isCat) => `鎖住營養與鮮味的凍乾零食，是${isCat ? '貓咪' : '狗狗'}訓練與獎勵的理想選擇。`,
    點心: (isCat) =>
      `香氣誘人的點心，為${isCat ? '貓咪' : '狗狗'}每日增添小確幸，補充能量與滿足口慾。`
  },
  玩具: {
    逗貓棒: () => '提升互動樂趣的逗貓棒，激發貓咪狩獵本能，讓每日玩耍更有趣。',
    狗咬膠: () => '耐咬設計的狗咬膠，有助潔牙與釋放壓力，是狗狗日常玩耍好夥伴。',
    毛絨玩具: () => '柔軟可愛的毛絨玩具，提供毛孩陪伴感與安全感，是居家必備玩具。'
  },
  清潔洗護: {
    洗毛精: () => '溫和潔淨的寵物洗毛精，守護毛髮與肌膚健康，讓毛孩保持清爽潔淨。',
    除蚤液: () => '有效驅蟲防蚤，保護毛孩遠離跳蚤與壁蝨，維護舒適生活品質。',
    清耳液: () => '溫和清潔耳道，減少異味與耳垢堆積，預防耳部問題。'
  },
  生活用品: {
    項圈: () => '結合舒適與美觀的項圈設計，是外出散步與日常配戴的理想選擇。',
    牽繩: () => '堅固耐用的牽繩，提供控制與自由間的平衡，讓散步更安心。',
    貓砂盆: () => '方便清理的貓砂盆設計，兼具實用與簡潔，提升清潔效率。',
    便盆: () => '引導毛孩如廁習慣的便盆設計，讓居家生活更整潔。'
  },
  其他: {
    智能餵食器: () => '結合智慧科技的餵食器，定時定量管理飲食，提升照護便利性。',
    定位器: () => '即時掌握毛孩位置的小型定位器，守護安全每一步。',
    自動飲水機: () => '流動式設計的飲水機，鼓勵毛孩多喝水，維持健康水分攝取。',
    外出繩: () => '輕便實用的外出繩，適合日常出門使用，陪伴毛孩探索世界。'
  }
}

function generateProductFeature(name, category, subcategory) {
  const isCat = name.includes('貓')
  const subMap = categoryFeatureMap[category]
  if (!subMap || !subMap[subcategory]) {
    return `${name}，為您的${subcategory}提供優質選擇。此產品屬於${category}分類，適合日常使用。`
  }
  // 只有主食、零食分貓狗，其他不分
  return ['主食', '零食'].includes(category)
    ? `${name}，${subMap[subcategory](isCat)}`
    : `${name}，${subMap[subcategory]()}`
}

function generateSpecs() {
  return {
    brand: faker.company.name(),
    model: `HL-${faker.number.int({ min: 1000, max: 9999 })}`,
    size: `${faker.number.int({ min: 5, max: 50 })}cm x ${faker.number.int({ min: 5, max: 50 })}cm x ${faker.number.int({ min: 5, max: 50 })}cm`,
    origin: faker.helpers.arrayElement(['台灣', '日本', '美國', '中國', '韓國'])
  }
}

function getImageKeywordByCategory(categoryName) {
  if (['主食', '零食'].includes(categoryName)) return 'food'
  if (categoryName === '玩具') return 'toy'
  if (categoryName === '清潔洗護') return 'wash'
  return 'pet'
}

async function seedProducts() {
  const { error: deleteError } = await supabase.from('products').delete().gte('id', 0)
  if (deleteError) {
    console.error('Error deleting existing data:', deleteError)
    return
  }

  const products = []

  for (let i = 0; i < 150; i++) {
    const categoryObj = faker.helpers.arrayElement(categories)
    const category = categoryObj.name
    const subcategory = faker.helpers.arrayElement(categoryObj.subcategories)

    const petType = ['主食', '零食'].includes(category)
      ? faker.helpers.arrayElement(petTypes)
      : null

    const name = ['主食', '零食'].includes(category)
      ? `${faker.word.adjective()} ${petType === '狗' ? '狗' : '貓'}${subcategory}`
      : `${faker.word.adjective()} ${subcategory}`

    const price = faker.number.int({ min: 300, max: 1500 })
    const hasDiscount = faker.datatype.boolean()
    const discount = hasDiscount
      ? Math.floor(price * faker.number.float({ min: 0.5, max: 0.9, precision: 0.01 }))
      : null

    const description = generateProductFeature(name, category, subcategory)
    const specs = generateSpecs()
    const imageKeyword = getImageKeywordByCategory(category)

    products.push({
      name,
      category,
      subcategory,
      price,
      discount,
      description,
      specification: specs,
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
