// @ts-ignore
import ECPayPayment from 'ecpay_aio_nodejs'
import { format } from 'date-fns'
import { getSupabase } from '@/services/supabase'
import { useUserStore } from '@/store/user'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { amount, description } = body
    const { MerchantID, HashKey, HashIV } = process.env

    if (!MerchantID || !HashKey || !HashIV) {
      throw new Error('缺少綠界必要參數')
    }

    const options = {
      OperationMode: 'Test',
      MercProfile: { MerchantID, HashKey, HashIV },
      IgnorePayment: [],
      IsProjectContractor: false
    }

    const create = new ECPayPayment(options)

    const MerchantTradeNo = `nwv${format(new Date(), 'yyyyMMddHHmmssSSS')}`

    // 先寫入資料庫：UNPAID 狀態
    const userStore = useUserStore()
    const userId = userStore.user?.id

    if (!userId) {
      return {
        success: false,
        message: '使用者未登入，請先登入後再試'
      }
    }

    const supabase = getSupabase()
    const { error: insertError } = await supabase.from('orders').insert([
      {
        trade_no: MerchantTradeNo,
        amount,
        status: 'UNPAID',
        payment_method: 'Credit',
        paid_at: null,
        user_id: userId
      }
    ])

    if (insertError) {
      console.log('insertError', insertError)
      return {
        success: false,
        message: '建立訂單失敗，請稍後再試'
      }
    }

    // 建立綠界付款參數
    const param = {
      MerchantID,
      MerchantTradeNo,
      MerchantTradeDate: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      PaymentType: 'aio',
      TotalAmount: amount.toString(),
      TradeDesc: description,
      ItemName: '測試商品',
      ChoosePayment: 'Credit',
      ReturnURL: 'http://localhost:8080/api/ecpay/return',
      ClientBackURL: 'http://localhost:8080/checkout/order-success',
      EncryptType: 1
    }

    const html = create.payment_client.aio_check_out_all(param)

    return {
      success: true,
      formHtml: html
    }
  } catch (error) {
    console.error('產生付款表單失敗:', error)
    return {
      success: false,
      message: '產生付款表單失敗，請稍後再試。'
    }
  }
})
