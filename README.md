# Restaurant_list
一個使用 Node.js + Express 打造的餐廳美食網站，提供使用者可依照餐廳名稱與類別進行搜尋。

# 專案畫面
![image](https://github.com/chia0416/restaurant_list/blob/main/Home_Page.jpg)

![image](https://github.com/chia0416/restaurant_list/blob/main/Search_Page.jpg)

# Features - 產品功能
<ol>
<li>使用 Node.js + Express + Mongodb 打造的餐廳美食網站 </li>
<li>使用者可以點擊任一餐廳，查看更多餐廳資訊，如餐廳地址、電話與簡介  </li>
<li>使用者可以依照餐廳名稱或類別進行搜尋  </li>
<li>新增了"新增"、"修改"、"刪除"功能，並可將資訊傳至資料庫</li>
</ol>

# Installing - 專案安裝流程

<ol>
<li>確認是否已安裝Node.js</li>
<pre><code>在Terminal 輸入 node -v 指令</code></pre>

<li>如果沒出現版本符號，請先使用nvm 安裝Node.js</li>
<pre><code>請參考此網址 https://www.onejar99.com/nvm-install-for-windows/</code></pre>

<li>打開你的 terminal，Clone 此專案至本機電腦 </li>
<pre><code>https://github.com/chia0416/S3-W1-Movie-List.git </code></pre>

<li>開啟終端機(Terminal)，進入存放此專案的資料夾 </li>
<pre><code> cd restaurant_list </code></pre>

<li>安裝 npm 套件 </li>
<pre><code>在 Terminal 輸入 npm install 指令</code></pre>

<li>安裝 nodemon 套件 </li>
<pre><code>在 Terminal 輸入 npm install -g nodemon 指令</code></pre>

<li>啟動伺服器，執行 app.js 檔案 </li>
<pre><code>在 Terminal 輸入 nodemon app.js 或者 npm run dev 指令即可</code></pre>

<li>建立種子資料</li>
<pre><code>在 Terminal 輸入npm run seed 指令</code></pre>

<li>當 terminal 出現以下字樣，表示伺服器已啟動並成功連結 </li>
<pre><code> Express is running on http://localhost:3000 </code></pre>  
  
現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始尋找電影囉！


### Package-工具包
[Handlebars](https://www.npmjs.com/package/express-handlebars)-把檔案轉換成瀏覽器看得懂的 HTML 檔案才回傳到瀏覽器中的樣板引擎  
[Bootstrap](https://getbootstrap.com/docs/4.2/getting-started/download/)-前端框架  
[jQuery](https://getbootstrap.com/docs/4.2/getting-started/download/)-以 JavaScript 來編寫的函式庫　　　　
<br>[Popper.js](https://popper.js.org/)　　　　
<br>[nodemon](https://www.npmjs.com/package/nodemon)-自動重啟伺服器，省去開每次改完程式碼後的問題
