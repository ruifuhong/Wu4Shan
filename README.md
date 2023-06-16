# DB project

## **題目**
---
### Wu4Shan

## **題目說明**
---
線上購物網站是一種透過互聯網平台提供商品和服務的商業模式。現在有許多知名的 線上購物網站，以下是其中一些常見的網站:

- Amazon:全球最大的電子商務公司之一，提供各種商品和服務，包括書籍、電子 產品、服裝、美妝、食品等等。
- eBay:全球知名的網路拍賣平台，提供各種二手商品和全新商品，包括時裝、體 育用品、玩具等等。

這些購物網站平台，背後有龐大的資料，很適合拿來做資料庫系統管理的練習，所以我 們決定做出類似的線上購物網站。



## **需求分析**
---
1. 買家和賣家都要輸入帳號、密碼以登入會員，登入後再填寫自己的姓名、地址， 系統會顯示成為會員的時間。
2. 每個商品和類別都有自己的編號、名稱，並記錄商品的顏色、尺寸、數量、價格。
3. 購物車內會有商品編號、名稱，並記錄商品的顏色、尺寸。
4. 訂單會有自己的訂單編號，訂單內會有商品編號、名稱，並記錄商品的顏色、尺寸、數量、價格，以及選擇的支付方法。
5. 歷史紀錄會有購買過的商品編號、名稱，並記錄商品的顏色、尺寸、數量，以及購買的日期。
6. 購物網的每個商品都會被分類，且購物車和訂單的內容也會被分類。
7. 購物車和訂單的內容一定要是商品品項。
8. 買家可增加商品進購物車，確認後可形成訂單，付款後會成為歷史紀錄。
9. 賣家提供商品，並收訂單的錢。

### **系統功能分析**
---
顧客可以在網站上瀏覽各式各樣的商品，能將自己喜歡的商品加入購物車中，最後要結 帳時，能從購物車裡挑選真正要購買的商品 根據上述，我們將會有以下的模組功能:
- 顧客資訊、商品內容、購物車商品、訂單資訊 -> 資料庫模組
- 查詢商品 -> (用到資料庫查詢指令)
- 將商品加入或剔除購物車 -> (用到資料庫新增、修改、刪除)


### **資料需求分析**
---
根據上述系統功能分析後，可以了解一個購物網站運作中，最重要的資料便是商品資料 ，因此我們預計使用知名購物網站上的公開資料作為我們 Wu4Shan 購物網的商品資料。

以下是我們使用到的工具:

|功能需求|使用工具|
|----|----|
|網頁前端語言|HTML CSS JavaScript|
|網頁後端語言|Node.js|
|資料庫|MySQL|
|部署環境|Docker|