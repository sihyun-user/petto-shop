<template>
  <div>
    <LayoutBannerBreadcrumb title="購物須知" :links="[{ label: '購物須知' }]" />
    <section class="container py-[40px]">
      <main class="mx-auto max-w-3xl rounded border border-colorGray bg-colorGrayLight p-4">
        <article class="prose prose-sm max-w-none">
          <h2>購物須知</h2>
          <p>
            歡迎來到本網站選購各式寵物用品與周邊商品，以下為購物流程與相關注意事項，請您在訂購前詳閱以保障您的權益。
          </p>

          <h3>一、購物流程</h3>
          <ol>
            <li>瀏覽商品 → 加入購物車</li>
            <li>前往結帳 → 登入會員或填寫收件資料</li>
            <li>選擇付款方式 → 完成付款</li>
            <li>訂單成立 → 出貨通知 → 配送到府</li>
          </ol>

          <h3>二、付款方式</h3>
          <ul>
            <li>信用卡（支援 Visa / MasterCard / JCB）</li>
          </ul>

          <h3>三、配送說明</h3>
          <ul>
            <li>配送方式：宅配（黑貓 / 新竹貨運）或超商取貨</li>
            <li>配送時間：約 1-3 個工作天（不含假日及特殊節日）</li>
            <li>滿 NT$999 免運，未達酌收運費 NT$80</li>
            <li>目前僅配送至台灣本島，離島暫不提供服務</li>
          </ul>

          <h3>四、發票與收據</h3>
          <ul>
            <li>本網站開立電子發票，將寄至您註冊信箱。</li>
            <li>若需三聯式發票或統編，請於結帳時填寫完整公司抬頭與統一編號。</li>
          </ul>

          <h3>五、退換貨須知</h3>
          <ul>
            <li>依《消費者保護法》規定，消費者享有商品到貨起 7 日內的鑑賞期（非試用期）。</li>
            <li>退貨商品需為全新未使用狀態，並保持完整包裝。</li>
            <li>以下情況恕不受理退換貨：商品已使用、因個人因素損壞、食品類或客製化商品。</li>
            <li>請透過客服聯絡我們申請退貨，並提供訂單編號與商品照片。</li>
          </ul>

          <h3>六、客服資訊</h3>
          <p>若您對商品、訂單或退貨流程有任何疑問，歡迎透過以下方式與我們聯繫：</p>
          <ul>
            <li>Email：petto@gmail.com</li>
            <li>LINE 官方帳號：@pettoshop</li>
            <li>客服時間：週一至週五 10:00–18:00（國定假日除外）</li>
          </ul>
        </article>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
usePageSeo({
  title: '購物須知'
})
</script>
