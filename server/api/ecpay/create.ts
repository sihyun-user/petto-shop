import ECPayPayment from 'ecpay_aio_nodejs'
import { format } from 'date-fns'
import { getSupabase } from '@/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { amount, description, userId, name, address, phone, email } = body
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

    // 生成訂單編號
    const MerchantTradeNo = `nwv${format(new Date(), 'yyyyMMddHHmmssSSS')}`

    if (!userId) {
      return {
        success: false,
        message: '使用者未登入，請先登入後再試'
      }
    }

    const supabase = getSupabase(event)
    const { error: insertError } = await supabase.from('orders').insert([
      {
        trade_no: MerchantTradeNo,
        status: 0,
        payment_method: 'Credit',
        user_id: userId,
        amount,
        name,
        address,
        phone,
        email
      }
    ])

    if (insertError) {
      return {
        success: false,
        message: '建立訂單失敗，請稍後再試'
      }
    }

    // 建立綠界付款參數
    const config = useRuntimeConfig()
    const baseUrl = config.public.returnUrl

    const param = {
      MerchantID,
      MerchantTradeNo,
      MerchantTradeDate: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      PaymentType: 'aio',
      TotalAmount: amount.toString(),
      TradeDesc: description,
      ItemName: '測試商品',
      ChoosePayment: 'Credit',
      ReturnURL: `${baseUrl}/api/ecpay/return`,
      ClientBackURL: `${baseUrl}/checkout/order-result?no=${MerchantTradeNo}`,
      EncryptType: 1
    }

    const html = create.payment_client.aio_check_out_all(param)

    return {
      success: true,
      formHtml: html
    }
  } catch (error) {
    return {
      success: false,
      message: '產生付款表單失敗，請稍後再試。'
    }
  }
})
