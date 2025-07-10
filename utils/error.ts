const errorMessages: Record<string, string> = {
  user_already_exists: '此電子信箱已註冊',
  invalid_credentials: '電子信箱或密碼錯誤'
}

export const getErrorMessage = (error: { code?: string; message?: string }) => {
  if (error.code && errorMessages[error.code]) {
    return errorMessages[error.code]
  }

  return error.message || '發生未知錯誤，請稍後再試'
}
