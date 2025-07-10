import ECPayPayment from 'ecpay_aio_nodejs'
import { getSupabase } from '@/utils/supabase'

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

    const { CheckMacValue, ...rawData } = body
    const generatedMac = payment.helpers.gen_chk_mac_value(rawData)

    if (CheckMacValue !== generatedMac) {
      return '0|ERR'
    }

    const tradeNo = body.MerchantTradeNo
    const rtnCode = Number(body.RtnCode)
    const status = rtnCode === 1 ? 1 : 0

    const supabase = getSupabase(event)
    const { error } = await supabase.from('orders').update({ status }).eq('trade_no', tradeNo)

    if (error) {
      return '0|ERR'
    }

    return '1|OK'
  } catch (err) {
    return '0|ERR'
  }
})
