import crypto from 'node:crypto'
import { defineEventHandler, readBody } from 'h3'
import { getSupabase } from '@/utils/supabase'

const genCheckMacValue = (
  data: Record<string, string>,
  hashKey: string,
  hashIV: string
): string => {
  const sorted = Object.keys(data)
    .filter((key) => key !== 'CheckMacValue')
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('&')

  const raw = `HashKey=${hashKey}&${sorted}&HashIV=${hashIV}`

  const urlEncoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, '+')
    .replace(/%21/g, '!')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2a/g, '*')

  return crypto.createHash('sha256').update(urlEncoded).digest('hex').toUpperCase()
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { MerchantID, HashKey, HashIV } = process.env

  if (!MerchantID || !HashKey || !HashIV) {
    return '0|ERR'
  }

  const generatedMac = genCheckMacValue(body, HashKey, HashIV)
  if (generatedMac !== body.CheckMacValue) {
    return '0|ERR'
  }

  const tradeNo = body.MerchantTradeNo
  const rtnCode = body.RtnCode
  const status = rtnCode === '1' ? 'paid' : 'failed'

  const supabase = getSupabase(event)

  const { data, error: selectError } = await supabase
    .from('orders')
    .select('id')
    .eq('trade_no', tradeNo)

  if (selectError) {
    return '0|ERR'
  }

  if (!data || data.length === 0) {
    return '0|ERR'
  }

  const { error: updateError } = await supabase
    .from('orders')
    .update({ status })
    .eq('trade_no', tradeNo)

  if (updateError) {
    return '0|ERR'
  }
  return '1|OK'
})
