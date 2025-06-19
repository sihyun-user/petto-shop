import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: { persistSession: false }
})

function setProducts() {
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
      凍乾: (isCat) =>
        `鎖住營養與鮮味的凍乾零食，是${isCat ? '貓咪' : '狗狗'}訓練與獎勵的理想選擇。`,
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
    if (['主食', '零食'].includes(categoryName))
      return [
        'https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//food_1.jpg',
        'https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//food_3.jpg'
      ]
    if (categoryName === '玩具')
      return ['https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//toy.jpg']
    if (categoryName === '清潔洗護')
      return [
        'https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//wash_1.jpg',
        'https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//wash_2.jpg'
      ]
    return ['https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all//other.jpg']
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
        slug: name.replace(/\s+/g, '-'),
        category,
        subcategory,
        price,
        discount,
        description,
        specification: specs,
        images: imageKeyword,
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
}

function setArticles() {
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * 6) + 1
    return `https://pvpsjrejitbkulrngdiq.supabase.co/storage/v1/object/public/all/article_${randomIndex}.jpg`
  }

  const articles = [
    {
      title: '貓咪看起來很兇，其實只是怕生？新手飼主必知的行為解讀',
      image: getRandomImage(),
      content:
        '<article>\n  <h1>貓咪看起來很兇，其實只是怕生？新手飼主必知的行為解讀</h1>\n  <p>很多剛開始養貓的飼主常會擔心：「我家貓是不是不喜歡我？」尤其是那種一靠近就炸毛、瞪人，甚至低聲吼叫的反應，看起來超兇！但其實，這很可能只是 <strong>「怕生」的一種表現</strong>。</p>\n  <p>貓咪天生是警戒心很重的動物，尤其在還不熟悉環境或對人信任感不足時，會透過炸毛、哈氣、閃避來保護自己。這並不是討厭你，而是牠 <strong>需要更多時間去觀察你、信任你</strong>。</p>\n  <p>想拉近關係，你可以從以下幾點開始：</p>\n  <ul>\n    <li>每天固定時間餵食，建立安全感</li>\n    <li>用輕聲細語跟牠說話，讓牠習慣你的聲音</li>\n    <li>使用逗貓棒、零食讓牠主動靠近你</li>\n    <li>不要強迫觸碰或追著牠跑，給牠安全距離</li>\n  </ul>\n  <p>記住，貓咪的信任是慢慢累積的，一旦牠願意主動來蹭你、跟你撒嬌，那就表示你已經成功 <strong>「升級」成牠的家人</strong>了！</p>\n  <p>新手飼主一定要有耐心，不要因為貓咪一開始看起來兇就放棄與牠建立關係喔！</p>\n</article>',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '寵物玩具的重要性',
      image: getRandomImage(),
      content:
        '許多人可能會以為玩具只是寵物的娛樂工具，但其實，選對玩具能為毛孩帶來更多好處。首先，玩具可以刺激寵物的腦部發展與感官訓練，幫助牠們消耗過剩的精力，進而減少吠叫、咬家具等問題行為。對於長時間獨自在家的毛孩，玩具更是一種心理慰藉，有助降低分離焦慮。選購時建議挑選耐咬、安全、無毒材質製成的產品，特別是對愛啃咬的犬類來說，玩具的堅固度很重要。此外，互動型玩具能增進飼主與毛孩之間的感情，例如拉扯繩、丟接球等。對貓咪來說，逗貓棒與滾動球則可滿足其獵捕本能。請定期更換玩具或清潔，避免藏污納垢或破損誤食，確保毛孩的安全。總而言之，玩具不只是娛樂品，更是生活中的學習工具，為毛孩身心帶來正面影響。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '清潔與護理小技巧',
      image: getRandomImage(),
      content:
        '保持毛孩的清潔與衛生不僅能避免異味，更是預防疾病的重要環節。首先，耳朵的清潔建議每週一次，使用寵物專用的耳液滴入後用棉片輕輕擦拭，避免耳垢堆積導致感染。牙齒護理則是許多飼主容易忽略的部分，長期未清潔可能引發牙周病或口臭。建議每日或每週刷牙數次，搭配使用可咀嚼的潔牙零食或玩具輔助清潔。指甲也應定期修剪，以避免行走不便或抓傷人。若不確定長度，可請獸醫或美容師協助示範。毛髮方面，建議每日梳理一次，不僅能去除廢毛，也能提前發現皮膚問題，如紅疹、跳蚤或腫塊。洗澡則依季節與活動量決定頻率，通常 2~4 週一次最為合適，並搭配溫和不刺激的寵物洗劑。用心照顧清潔細節，不只能讓毛孩看起來可愛清爽，也能維持健康與舒適的生活品質。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },

    {
      title: '寵物健康檢查的重要性',
      image: getRandomImage(),
      content:
        '定期的健康檢查對寵物來說是不可忽視的預防措施。就像人類需要定期做健康檢查，毛孩也需要獸醫的專業評估，以確保身體狀況良好。透過檢查，能早期發現潛在疾病如心臟病、腫瘤或慢性病，避免問題惡化。一般建議每年安排一次基礎健檢，年長動物則可半年一次。檢查項目通常包含血液檢驗、糞便檢查、X 光、心電圖等，視毛孩年齡與狀況調整。雖然費用不低，但相較於疾病後的醫療支出，定期檢查更具經濟效益與保障。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '認識寵物過敏原與對策',
      image: getRandomImage(),
      content:
        '許多毛孩也會對食物或環境中的物質產生過敏反應，常見症狀包括抓癢、掉毛、皮膚紅疹或腸胃不適。最常見的過敏原有雞肉、乳製品、塵蟎、花粉及某些化學清潔劑。若懷疑寵物有過敏，應先紀錄可能引發過敏的環境與食物，並諮詢獸醫進行排除法診斷。有些情況可透過更換飼料、減少香精清潔用品的使用、使用防蟎床墊等方式改善。若為嚴重過敏，獸醫可能會建議服用抗組織胺或進行免疫療法。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '新手飼主必讀：貓咪入門照顧指南',
      image: getRandomImage(),
      content:
        '對於剛開始養貓的新手來說，建立正確的照顧觀念十分重要。首先，提供安全且安靜的生活空間，設置貓砂盆、抓抓板與躲藏處。飲食方面應選擇營養均衡的商用飼料，搭配乾濕糧混餵，有助水分攝取與牙齒健康。定期清潔貓砂、碗盤與飲水器也不可或缺。社交上要有耐心，讓貓咪自行接近你而非強迫接觸，建立信任關係。醫療方面，建議完成基礎疫苗與結紮手術，防止未來健康與行為問題。記得貓咪喜歡高處與窄小空間，可提供攀爬架與箱子作為遊戲與休息空間。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '狗狗行為訓練的五大原則',
      image: getRandomImage(),
      content:
        '良好的行為訓練能讓毛孩與飼主的生活更和諧。首先是「獎勵為主」，以零食或稱讚作為正向鼓勵，而非責罵與懲罰。第二是「一致性」，所有家庭成員必須給出相同的指令與標準。第三是「短時間、多次數」，每次訓練控制在 5～10 分鐘，效果最佳。第四是「選擇適當時機」，如在毛孩精神好或散步回家後進行訓練最有效。最後是「耐心」，每隻狗的學習速度不同，需給予時間。最重要的是以愛與耐心陪伴成長，不將訓練視為壓力或懲罰。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      title: '常見寵物誤食物品與急救處理',
      image: getRandomImage(),
      content:
        '不少毛孩因為好奇而誤食人類食物或異物，造成健康危機。常見危險品項包括巧克力、葡萄、洋蔥、大蒜、止痛藥、小玩具、線材等。若發現毛孩出現嘔吐、抽搐、昏迷、腹瀉或異常嗜睡等症狀，應立即就醫。初步急救可在獸醫指導下使用催吐劑，但切勿自行處理或耽誤時間。平時應將危險物品收好、用寵物專用的清潔劑，並教育家人勿餵食人類食物。事前預防與急救知識同樣重要，是守護毛孩生命安全的關鍵。',
      created_at: faker.date.recent({ days: 90 }).toISOString()
    }
  ]

  async function seedArticles() {
    const { error: deleteError } = await supabase.from('articles').delete().gte('id', 0)
    if (deleteError) {
      console.error('Error deleting existing data:', deleteError)
      return
    }

    const { error: insertError } = await supabase.from('articles').upsert(articles)
    if (insertError) {
      console.error('新增文章錯誤:', insertError)
    } else {
      console.log('文章資料新增成功')
    }
  }

  seedArticles().catch(console.error)
}

setProducts()
setArticles()
