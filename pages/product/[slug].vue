<template>
  <section v-if="product" class="container min-h-screen py-[40px]">
    <div class="mb-[60px] flex flex-col gap-5 md:flex-row md:gap-12">
      <div class="flex flex-shrink-0 flex-col">
        <div class="h-[400px] w-[400px] overflow-hidden">
          <ZoomImg
            :src="imageZoom"
            zoom-type="drag"
            :zoom-scale="3"
            :step="1"
            trigger="hover"
            class="h-full w-[500px] object-cover"
          />
        </div>

        <div class="mt-2 flex gap-1">
          <template v-for="(image, index) in product.images" :key="index">
            <div
              class="cursor-pointer border border-colorGray bg-white p-1"
              @click="imageZoom = image"
            >
              <NuxtImg
                :src="image"
                width="66"
                height="66"
                class="h-[66px] w-[66px] object-cover"
                alt="product image"
              />
            </div>
          </template>
        </div>
      </div>
      <div>
        <div class="space-y-2">
          <h2 class="text-colorBlack">{{ product.name }}</h2>
          <p class="text-colorGrayDark">
            分類：{{ product.category }}{{ product.subcategory ? `/${product.subcategory}` : '' }}
          </p>
          <div
            v-if="product.discount"
            class="flex items-center gap-2 text-2xl font-bold text-colorBlack"
          >
            <span class="text-colorRed">${{ product.discount }}</span>
            <span class="text-base text-colorGrayDark line-through">${{ product.price }}</span>
          </div>
          <div v-else class="flex items-center gap-2 text-2xl font-bold text-colorBlack">
            ${{ product.price }}
          </div>
        </div>
        <p class="mt-4 min-h-[150px] border-y border-colorGray py-2">
          {{ product.description || '這個產品沒有描述。' }}
        </p>
        <div class="mt-8 flex flex-wrap justify-between gap-8">
          <div class="flex items-center gap-4">
            <p class="text-colorBlack">購買數量</p>
            <UiUpdateQuantity v-model="quantity" />
          </div>
          <div>
            <UiBaseButton text="加入購物車" @click="addToCart(product)" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <ul class="flex">
        <li
          v-for="tab in ['introduction', 'specification']"
          :key="tab"
          :class="[
            'cursor-pointer px-6 py-4',
            activeTab === tab
              ? 'border-x border-t-[4px] border-x-colorGray border-t-colorPrimary bg-colorGrayLight'
              : 'border-b border-colorGray bg-white'
          ]"
          @click="activeTab = tab"
        >
          {{ tab === 'introduction' ? '產品介紹' : '商品規格' }}
        </li>
      </ul>
      <div
        class="-mt-[1px] min-h-[150px] border border-colorGray bg-colorGrayLight p-4 text-colorBlack"
      >
        <div v-if="activeTab === 'introduction'">
          {{ product?.description || '這個產品沒有介紹。' }}
        </div>
        <div v-else class="flex flex-col gap-2">
          <p>產品品牌: {{ specification?.brand }}</p>
          <p>產品型號: {{ specification?.model }}</p>
          <p>產品尺寸: {{ specification?.size }}</p>
          <p>產品產地: {{ specification?.origin }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ZoomImg } from 'vue3-zoomer'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types'

const supabase = useSupabaseClient()
const route = useRoute()
const productSlug = route.params.slug as string | undefined

const quantity = ref(0)
const imageZoom = ref<string | undefined>(undefined)
const activeTab = ref<'introduction' | 'specification'>('introduction')
const specification = ref<Record<string, any>>({})

const { data: product } = await useAsyncData<Product | null>('product', async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', productSlug as string)
    .maybeSingle()

  if (error || !data) return null

  usePageSeo({
    title: (data as Product).name,
    description: (data as Product).description,
    image: (data as Product).images?.[0]
  })

  return data
})

watch(
  product,
  (newProduct) => {
    if (newProduct) {
      if (newProduct.images) {
        imageZoom.value = newProduct.images[0]
      }

      if (newProduct.category) {
        try {
          specification.value = JSON.parse(newProduct.specification)
        } catch (e) {
          specification.value = {}
        }
      }
    }
  },
  { immediate: true }
)
const cartStore = useCartStore()
const { addProductSuccess } = useAppToast()

const addToCart = (product: Product) => {
  if (quantity.value > 0) {
    cartStore.addItem({
      id: product.id,
      quantity: quantity.value
    })
    addProductSuccess(product.name)
  }
}
</script>
