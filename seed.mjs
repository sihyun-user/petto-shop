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
      name: '貓咪看起來很兇，其實只是怕生？新手飼主必知的行為解讀',
      image: getRandomImage(),
      description:
        '很多剛開始養貓的飼主常會擔心：「我家貓是不是不喜歡我？」尤其是那種一靠近就炸毛、瞪人，甚至低聲吼叫的反應，看起來超兇！但其實這很可能只是「怕生」的一種表現。',
      content: `<h1>貓咪看起來很兇，其實只是怕生？新手飼主必知的行為解讀</h1><br>
        <p>很多剛開始養貓的飼主常會擔心：「我家貓是不是不喜歡我？」尤其是那種一靠近就炸毛、瞪人，甚至低聲吼叫的反應，看起來超兇！但其實，這很可能只是 <strong>「怕生」的一種表現</strong>。貓咪並不是像狗那樣天生親人，牠們需要時間觀察陌生人是否有威脅，這是牠們的本能。</p><br>
        <p>貓咪天生是警戒心很重的動物，尤其在還不熟悉環境或對人信任感不足時，會透過炸毛、哈氣、閃避來保護自己。這些行為常讓新手飼主誤以為貓咪討厭人，但實際上，牠只是還沒準備好信任你。每隻貓的個性不同，有的適應很快，有的可能需要好幾個星期甚至更久。</p><br>
        <p>想拉近關係，你可以從以下幾點開始：</p><br>
        <ul>
          <li>每天固定時間餵食，建立安全感。規律的作息會讓貓咪知道你是可以依賴的對象，這對牠來說非常重要。</li>
          <li>用輕聲細語跟牠說話，讓牠習慣你的聲音。不要突然大聲講話或製造噪音，以免讓牠感到威脅。</li>
          <li>使用逗貓棒、零食讓牠主動靠近你。互動式的遊戲不只可以消耗貓咪精力，還能讓牠逐漸打開心房。</li>
          <li>不要強迫觸碰或追著牠跑，給牠安全距離。尊重牠的空間，反而會讓牠更快主動親近你。</li>
        </ul><br>
        <p>記住，貓咪的信任是慢慢累積的，一旦牠願意主動來蹭你、跟你撒嬌，那就表示你已經成功 <strong>「升級」成牠的家人</strong>了！這是一種來自貓咪的高度肯定，是所有飼主都會感到感動的時刻。</p><br>
        <p>新手飼主一定要有耐心，不要因為貓咪一開始看起來兇就放棄與牠建立關係喔！照顧貓咪是一段充滿挑戰但也很有成就感的旅程，只要用心陪伴，總有一天你會發現牠也在默默信任你、依賴你。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '怕生還是兇？教你判斷貓咪行為背後的真正原因',
      image: getRandomImage(),
      description:
        '許多飼主看到貓咪哈氣、出爪，常常會下意識認為「我家貓脾氣很差」，但事實上，貓咪的攻擊行為通常有背後的原因。了解這些行為背後的動機，能幫助你更好地照顧牠們。',
      content: `<h1>怕生還是兇？教你判斷貓咪行為背後的真正原因</h1><br>
        <p>許多飼主看到貓咪哈氣、出爪，常常會下意識認為「我家貓脾氣很差」，但事實上，貓咪的攻擊行為通常有背後的原因，理解行為背後的動機是關鍵。</p><br>
        <p><strong>怕生型</strong>的貓咪會表現出緊張、逃跑、躲藏、不願被觸碰；牠們的攻擊多為防禦性，通常在退無可退的時候才會出爪或咬人。這類貓咪常常因為過去不愉快的經驗或環境改變導致焦慮。</p><br>
        <p><strong>攻擊型</strong>的貓咪可能天生性格較強勢，或曾經遭受傷害，對刺激反應過度，也可能是因為環境壓力、健康問題引發情緒不穩定。這種情況較需要行為訓練與獸醫協助。</p><br>
        <p>你可以觀察以下行為來區分：</p><br>
        <ul>
          <li>怕生貓會一直找地方躲藏，不主動攻擊，只有靠太近時才會警告。</li>
          <li>攻擊性貓咪則可能會主動撲咬，有時沒有明顯觸發點。</li>
          <li>怕生貓通常會逐漸適應環境；攻擊型貓咪則可能需要長期訓練或行為矯正。</li>
        </ul><br>
        <p>了解這些差異後，飼主可以有針對性地幫助貓咪緩解不安，譬如營造安靜環境、建立信任關係，或尋求專業幫助。</p><br>
        <p>最重要的是要有耐心，給予貓咪時間和空間，慢慢引導牠走出情緒陰影，建立穩定的生活環境。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '五個新手養狗常犯的錯誤，你中幾個？',
      image: getRandomImage(),
      description:
        '狗狗雖然是人類最好的朋友，但新手飼主若沒有正確的養育觀念，可能會不小心傷害牠的身心健康。以下是五個常見的錯誤，你中幾個？',
      content: `<h1>五個新手養狗常犯的錯誤，你中幾個？</h1><br>
        <p>狗狗是人類最忠誠的朋友，但許多新手飼主因為缺乏相關知識，容易在日常照護中犯錯，這些錯誤可能會影響狗狗的健康與行為。</p><br>
        <ul>
          <li>常把狗狗關籠一整天，導致牠們感到孤單和焦慮，甚至出現過度吠叫或破壞行為。</li>
          <li>用人的飲食習慣餵食狗狗，忽略了狗狗特有的營養需求，容易造成營養不均衡或中毒風險。</li>
          <li>社會化訓練做得太晚，讓狗狗容易害怕陌生人或其他動物，造成恐懼與攻擊行為。</li>
          <li>缺乏規律運動，狗狗精力無處釋放，容易造成肥胖及行為問題。</li>
          <li>遇到壞習慣只用責罵處理，卻沒有教導正確行為，反而可能增加狗狗的恐懼與混亂。</li>
        </ul><br>
        <p>作為新手飼主，建議從了解狗狗基本需求開始，提供充足的運動與社會化訓練，用正向獎勵取代懲罰，讓狗狗能健康快樂成長。</p><br>
        <p>寵物飼養是一條學習與成長的路，別怕犯錯，重要的是願意改變並給予狗狗最好的照顧。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '貓咪生病了嗎？5個常見症狀你一定要注意',
      image: getRandomImage(),
      description:
        '貓咪不像狗狗會大聲表達不舒服，飼主需要細心觀察牠們的行為與身體變化。以下5個症狀是常見的警訊：食慾突然下降或拒絕進食、持續嘔吐或拉肚子、精神不佳、不願意活動、鼻子或眼睛有分泌物、呼吸急促或喘氣。',
      content: `<h1>貓咪生病了嗎？5個常見症狀你一定要注意</h1><br>
        <p>貓咪不像狗狗會大聲表達不舒服，牠們通常較為隱忍，身體出現異常時，飼主必須特別留意。以下是五個常見的警訊，千萬不要輕忽：</p><br>
        <ul>
          <li>食慾突然下降或拒絕進食，可能是身體不適或口腔問題。</li>
          <li>持續嘔吐或拉肚子，容易導致脫水，需盡速就醫。</li>
          <li>精神不佳，愛躲藏或不願意與人互動。</li>
          <li>鼻子或眼睛有異常分泌物，可能感染或過敏。</li>
          <li>呼吸急促、喘氣，代表呼吸系統可能有問題。</li>
        </ul><br>
        <p>發現以上症狀，務必盡快帶貓咪去看獸醫，早期治療能大幅提高康復機會。平時也可定期檢查，維持貓咪健康。</p><br>
        <p>健康的貓咪才是快樂的貓咪，飼主應該成為牠們最堅強的後盾。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '新手必看！教你如何訓練狗狗在家定點大小便',
      image: getRandomImage(),
      description:
        '很多新手狗主會因為狗狗大小便問題煩惱，透過正確方法訓練，可以讓家裡更乾淨，也讓狗狗生活更舒適。',
      content: `<h1>新手必看！教你如何訓練狗狗在家定點大小便</h1><br>
        <p>新手養狗的朋友，大小便訓練是非常重要的一環，這不僅關係到家裡的整潔，也影響狗狗的生活品質。正確的訓練方法可以幫助狗狗快速學會定點大小便。</p><br>
        <p>以下是詳細步驟與建議：</p><br>
        <ul>
          <li>選擇一個固定且容易清理的尿墊或區域，並且保持環境乾淨。</li>
          <li>每天固定帶狗狗到指定地點，特別是在飯後、睡醒後，這段時間狗狗較容易有排便需求。</li>
          <li>當狗狗在正確地方大小便時，立即給予口頭讚美和零食獎勵，讓牠明白這是好行為。</li>
          <li>如果狗狗在錯誤地點排便，不要用打罵方式懲罰，避免造成恐懼，可以用溫和方式引導牠到正確位置。</li>
          <li>保持耐心與一致性，訓練可能需要數週時間，持續堅持是成功關鍵。</li>
        </ul><br>
        <p>此外，適當的運動與遊戲也有助於促進狗狗排便規律。透過與狗狗建立良好溝通與信任，大小便訓練一定能順利完成。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '室內貓也能活力充沛！5個簡單方法讓貓咪更健康',
      image: getRandomImage(),
      description:
        '很多室內貓因為缺乏活動，容易變胖或無聊。以下幾個方法可以幫助你的貓咪保持身心健康：每天固定時間與貓咪玩逗貓棒遊戲、提供貓抓板與攀爬架、定期更換玩具、餵食多樣化、讓貓咪曬曬陽光。',
      content: `<h1>室內貓也能活力充沛！5個簡單方法讓貓咪更健康</h1><br>
        <p>很多室內貓因為活動量不足，容易變胖、無聊，甚至出現行為問題。身為飼主，應該提供多元刺激，讓貓咪身心健康。</p><br>
        <p>以下五個方法幫助你讓室內貓活力充沛：</p><br>
        <ul>
          <li>每天固定時間與貓咪玩逗貓棒遊戲，刺激狩獵本能，消耗精力。</li>
          <li>提供多層貓抓板與攀爬架，讓貓咪爬高跳躍，保持肌肉強健。</li>
          <li>定期更換玩具，避免貓咪感到無聊與單調。</li>
          <li>餵食多樣化且均衡的食物，避免肥胖與營養不良。</li>
          <li>讓貓咪曬曬陽光，促進維他命D的合成，增強免疫力。</li>
        </ul><br>
        <p>透過這些簡單又有效的方式，即使是完全室內生活的貓咪，也能保持活力與健康，陪伴你更長久。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },
    {
      name: '如何判斷你的貓咪是否感到壓力？常見徵兆與紓解方法',
      image: getRandomImage(),
      description:
        '貓咪是非常敏感的動物，生活中很多細微變化都可能讓牠們感到壓力。了解壓力徵兆，並採取適當的紓解方法，能幫助貓咪維持身心健康。',
      content: `<h1>如何判斷你的貓咪是否感到壓力？常見徵兆與紓解方法</h1><br>
        <p>貓咪對環境變化非常敏感，壓力過大可能會引發健康問題或行為改變。飼主若能及時察覺，能有效幫助貓咪舒緩不適。</p><br>
        <p>常見的壓力徵兆包括：</p><br>
        <ul>
          <li>過度理毛或舔毛，導致毛髮稀疏甚至皮膚受損。</li>
          <li>食慾減退或暴飲暴食。</li>
          <li>排泄習慣改變，可能在家中亂尿尿或便便。</li>
          <li>行為退縮，變得不願意與人互動，常躲藏。</li>
          <li>過度吼叫或攻擊性增加。</li>
        </ul><br>
        <p>當發現貓咪有上述症狀時，飼主可以嘗試以下紓解方法：</p><br>
        <ul>
          <li>提供安靜舒適的環境，避免過度嘈雜或人員頻繁出入。</li>
          <li>使用費洛蒙擴散器，幫助貓咪放鬆情緒。</li>
          <li>每天固定時間與貓咪互動，建立安全感。</li>
          <li>避免突然搬家或改變飼養環境，減少壓力來源。</li>
          <li>適當提供爬架與玩具，滿足天性與消耗能量。</li>
        </ul><br>
        <p>如果症狀持續或惡化，建議帶貓咪看獸醫或寵物行為專家，尋求專業協助。飼主的耐心與細心，是幫助貓咪減輕壓力的關鍵。</p>`,
      created_at: faker.date.recent({ days: 90 }).toISOString()
    },

    {
      name: '帶狗狗出門散步的5大好處及注意事項',
      image: getRandomImage(),
      description:
        '散步不只是運動，更是增進你與狗狗感情的重要時刻。本文分享帶狗狗散步的好處，以及外出時該注意的事項，讓你們的戶外時光更加愉快安全。',
      content: `<h1>帶狗狗出門散步的5大好處及注意事項</h1><br>
        <p>散步是狗狗最喜歡的活動之一，不僅能促進健康，還能增進你和牠之間的感情。但散步時也有不少細節需要注意，避免意外發生。</p><br>
        <h2>散步的五大好處：</h2><br>
        <ul>
          <li><strong>促進身體健康：</strong>規律運動有助維持理想體重，減少心臟病、關節炎等疾病風險。</li>
          <li><strong>刺激心理健康：</strong>散步能讓狗狗接觸不同環境和氣味，減少無聊與焦慮。</li>
          <li><strong>改善社交能力：</strong>與其他狗狗或人接觸，幫助提升社會化技巧。</li>
          <li><strong>加強主奴關係：</strong>共同散步是飼主與狗狗互動的好時機，能建立信任與默契。</li>
          <li><strong>預防行為問題：</strong>消耗過多精力，減少破壞家具或吠叫等不良行為發生。</li>
        </ul><br>
        <h2>散步時的注意事項：</h2><br>
        <ul>
          <li>選擇安全的路線，避開車流量大或有危險物品的地方。</li>
          <li>務必使用牽繩，避免狗狗突然衝出或追逐小動物。</li>
          <li>根據天氣調整散步時間，避免炎熱或寒冷造成身體不適。</li>
          <li>攜帶水壺與便袋，保持狗狗水分補充與環境清潔。</li>
          <li>觀察狗狗反應，若出現疲倦或焦躁，適時結束散步回家休息。</li>
        </ul><br>
        <p>透過安全且規律的散步，不僅讓狗狗健康快樂，也能讓你們的生活更加豐富與有趣。快穿上鞋子，帶著愛犬一起享受戶外吧！</p>`,
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
