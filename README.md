# DB project

## **題目**
### Wu4Shan

## **範例影片**
<iframe width="560" height="315" src="https://www.youtube.com/embed/R_VLtVZxPIA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## **題目說明**
線上購物網站是一種透過互聯網平台提供商品和服務的商業模式。現在有許多知名的線上購物網站，以下是其中一些常見的網站:

- Amazon：全球最大的電子商務公司之一，提供各種商品和服務，包括書籍、電子產品、服裝、美妝、食品等等。
- eBay：全球知名的網路拍賣平台，提供各種二手商品和全新商品，包括時裝、體育用品、玩具等等。

這些購物網站平台，背後有龐大的資料，很適合拿來做資料庫系統管理的練習，所以我們決定做出類似的線上購物網站。

## **需求分析**

1. 買家在輸入帳號、密碼、地址、姓氏、名字後可註冊會員，註冊成功後可輸入帳號、密碼登入會員。
2. 每件商品和類別都有自己的編號、名稱，並記錄商品的顏色、尺寸、價格、圖片。
3. 願望清單內會有商品編號、名稱，並記錄商品的顏色、尺寸。
4. 購物車會有自己的編號與總金額，並有各項商品編號、名稱，同時記錄商品的顏色、尺寸、數量、價格。
5. 歷史紀錄會有購買過的商品編號、名稱，並記錄商品的顏色、尺寸，以及購買的日期。
6. 願望清單的尺寸與顏色都可調整。
7. 願望清單與購物車皆可刪除特定商品。
8. 願望清單、購物車和歷史紀錄的內容一定要是商品品項。
9. 買家可將商品加入願望清單，再由願望清單加到購物車，也可直接新增商品進購物車，結帳後成為歷史紀錄。

### **系統功能分析**
顧客可以在網站上瀏覽各種商品，在有登入的狀態下，能將自己喜歡的商品加入願望清單或購物車中，在願望清單中可調整尺寸與顏色，也可將當中特定商品加到購物車，願望清單與購物車皆可刪除特定商品。最後在購物車點選結帳之後，這些商品將會被列入歷史購買清單。根據上述說明，我們將會有以下的模組功能：
 
顧客資訊、商品內容、願望清單、購物車、歷史紀錄，瀏覽商品時可根據類別篩選
→ 資料庫模組
查詢商品與商品詳細資訊
→ （用到資料庫查詢指令）
將商品加入或移出願望清單，並於當中調整顏色或尺寸 
→ （用到資料庫新增、查詢、修改、刪除）
將商品加入或移出購物車，並於結帳後加入歷史紀錄
→ （用到資料庫新增、查詢、刪除）

### **資料需求分析**
根據上述系統功能分析後，可以了解一個購物網站運作中，最重要的資料便是商品資料 ，因此我們預計使用知名購物網站上的公開資料作為我們 Wu4Shan 購物網的商品資料。

以下是我們使用到的工具:

|功能需求|使用工具|
|----|----|
|網頁前端|React|
|網頁後端|Express|
|資料庫|MySQL|

## **Docker 相關操作**

- Easy if you got docker

```sh
docker-compose up -d    # 在背景開啟專案
docker-compose down     # 關掉專案
docker ps               # 目前正在跑的docker程式, id從這邊拿 CONTAINER ID
docker logs ${id} -f    # 看log (-f是持續看 沒有的話看一次)
```

- Install package
```sh
docker exec -it ${id} sh    # 進去docker container裡面
npm install ${package}      # install your package
```

## **MySQL Docker Container**
> volumn at db_data
- use phpmyadmin for easy accessing `localhost:8181`
- or use your sql service to access: `localhost:3300`
