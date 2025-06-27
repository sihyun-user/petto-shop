import ECPayPayment from 'ecpay_aio_nodejs'
import { getSupabase } from '@/services/supabase'

export default defineEventHandler(async (event) => {
  const { MerchantID, HashKey, HashIV } = process.env

  const payment = new ECPayPayment({
    OperationMode: 'Test',
    MercProfile: { MerchantID, HashKey, HashIV },
    IgnorePayment: [],
    IsProjectContractor: false
  })

  try {
    const body = await readBody(event)

    // 驗證綠界回傳資料合法性
    const isValid = payment.payment_client.check_mac_value(body)
    if (!isValid) {
      return '0|ERR'
    }

    const tradeNo = body.MerchantTradeNo
    const rtnCode = body.RtnCode // 1 表示付款成功

    const status = rtnCode === '1' ? 'PAID' : 'FAILED'

    const supabase = getSupabase()
    const { error } = await supabase
      .from('orders')
      .update({
        status,
        paid_at: new Date()
      })
      .eq('trade_no', tradeNo)

    if (error) {
      return '0|ERR'
    }

    // 綠界要求這裡回傳「純文字」
    return '1|OK'
  } catch (err) {
    return '0|ERR'
  }
})
