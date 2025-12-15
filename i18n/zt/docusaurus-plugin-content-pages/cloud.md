---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ 和云

## 云是什么

最簡單的定義不是本地伺服器 。 這很廣泛,可以指很多不同的設置。 例如, 它可以是數據中心內的专用實體伺服器, 虛擬私人伺服器, 共享伺服器, 無伺服器, 或是其他東西 。

### 云

許多組織都想搬到云端 其中最重要的一個是它提供的灵活性,

這就不需要保持數據中心/伺服器室了 。 也讓計算資源符合您的目前需要 。 和云一樣 也代表著很多不同的事情 能夠放大你的資源 這可能意味著付出更多 (或以下) 無伺服器資源 。 可能是指從共享伺服器移到私人伺服器. 這可能意味著升級到更大的專用實體伺服器.

## 罐 ERDDAP™ 在云中跑?

是的

 ERDDAP™ 設計在Tomcat體內, 有社區支持在多克跑步,有 [正式 Docker 支援很快就到](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

意思是 ERDDAP™ 設計的時刻, 它不是無伺服器的, 而且要讓它無伺服器非常難, 或是不可能 。

### 罐 ERDDAP™ 比例?

放大 ERDDAP™ 比起使用更多無伺服器資源, 我們有一些很好的文件 [如何放大 ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . 方便大小 ERDDAP™ 我們對此很感興趣。

### 是什麼阻止了自動放大?

 ERDDAP™ 正在做很多事情,包括保持數據集的更新、通知訂閱者對數據集的變更、儲存資料、處理使用者要求等等。 夠大了 ERDDAP™ 伺服器 [海岸觀察](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 這表示它一直在做一些事情 持續使用實際上對無伺服器選項來說是極貴的情況 (你做無伺服器的計算會付出很高的代價 所以主要的優點是 你只是偶爾打電話) . 此外,努力移動所有 ERDDAP™ 管理者需要更複雜的設定。

### 罐 ERDDAP™ 使用云存储器?

是的

 ERDDAP™ 支持云存储 (包括 AWS S3) 支持 (例如非AWS S3) 高度优先 ERDDAP™ 发展路线图。 ERDDAP™ 也能夠從許多網路服務中提取資料。 我建議你透過我們 [數據集類型文件](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
