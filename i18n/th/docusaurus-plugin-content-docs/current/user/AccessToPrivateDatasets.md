---
title: "Access to Private Datasets"
---
# เข้าถึงชุดข้อมูลส่วนตัวในERDDAP™

มากERDDAP™การติดตั้งยังไม่ได้เปิดใช้งานการตรวจสอบสิทธิ์ ดังนั้นจึงไม่ได้ให้วิธีใด ๆ สําหรับผู้ใช้ที่จะล็อกอิน และพวกเขาจะไม่มีข้อมูลส่วนตัวใด ๆ

บางERDDAP™การติดตั้งมีการเปิดใช้งานการตรวจสอบสิทธิ์ ตอนนี้ERDDAP™รองรับการตรวจสอบสิทธิ์ผ่านทางบัญชีผู้ใช้อีเมลแบบ Google แบบเก่าเท่านั้น ซึ่งรวมบัญชีผู้ใช้อีเมลด้วยNOAAและมหาวิทยาลัยหลายแห่ง ถ้าERDDAP™ได้มีการเปิดใช้งานการตรวจสอบสิทธิ์ ใครก็ตามที่มีบัญชีผู้ใช้อีเมลแบบ Google มาใช้ จะสามารถล็อกอินได้ แต่พวกเขาจะมีสิทธิ์ในการเข้าถึงชุดข้อมูลส่วนตัวที่ERDDAP™ผู้ดูแลระบบอนุมัติให้พวกเขาเข้าถึง

## คําสั่งปรับปรุง{#updated-instructions} 

ข้อมูล บาง อย่าง ข้าง ล่าง นี้ ล้า สมัย แล้ว. จนกว่าจะได้รับการปรับปรุงนี้คุณสามารถใช้[โพสต์บล็อกนี้](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)สําหรับขั้นตอนล่าสุดในการรับข้อมูลจากชุดข้อมูลส่วนตัวที่มีสคริปต์

## มนุษย์ กับ นก กระจอก เทศ{#humans-with-browsers} 

ผู้ใช้มนุษย์ERDDAP™สามารถล็อกอินได้ERDDAP™ในเว็บเบราว์เซอร์เพื่อให้เข้าถึงชุดข้อมูลส่วนตัว ที่พวกเขาได้รับอนุญาตให้เข้าถึงได้

เพื่อล็อกอิน:

1. คลิกบนปูมบันทึกในลิงก์ด้านบนซ้ายของใด ๆERDDAP™เว็บเพจ
ถ้าไม่มีบันทึกในลิงก์ERDDAP™การติดตั้งยังไม่มีการตรวจสอบสิทธิ์ และไม่มีชุดข้อมูลส่วนตัว
     
2. คลิกบนเครื่องหมายในปุ่มเพื่อลงนามในบัญชี Google ของคุณ
ข้อความของปุ่มควรจะเปลี่ยนไปเป็น "แก้ไข"
     
3. คลิกที่ปูมบันทึกERDDAPกระดุม
หน้าเว็บควรจะเปลี่ยนไปพูด คุณล็อคเป็น *คุณ อีเมล* .
ถ้าไม่ รอ 5 วินาที แล้วคลิกที่ปูมบันทึกERDDAPกระดุมอีกแล้ว
ใน กรณี ที่ ร้าย แรง คุณ อาจ ต้อง รอ และ พยายาม อีก สอง สาม ครั้ง.
     
4. อย่าใช้ปุ่มกลับของเบราว์เซอร์ ใช้ "ERDDAP"ลิงก์ที่ด้านบนของด้านบนแล้วใช้ลิงก์อื่นไปERDDAP™หน้าที่คุณสนใจ ถ้าหน้าเว็บที่มีแคชบอกว่าคุณไม่ได้ล็อคใน ให้เรียกหน้าเว็บใหม่อีกครั้ง
     

## สคริปต์{#scripts} 

\\[สิ่งนี้ถูกดัดแปลงเล็กน้อยจากข้อมูล ที่ลินน์ เดอวิท (Linne DeWitt) ให้ไว้ ผู้ซึ่งพยายามหาทางออกอย่างยากลําบาก ลินน์ ขอบคุณมาก&#33;
หากคุณมีการแก้ไขหรือเสนอแนะ โปรดส่งอีเมลไปยังระเบียน\\]

ยังเป็นไปได้ที่จะล็อกอินERDDAP™และเข้าถึงข้อมูลส่วนตัวผ่านทางสคริปต์ นี่คือตัวอย่างที่ใช้curl.

1. คําแนะนําเหล่านี้ถือว่า คุณกําลังใช้ที่อยู่ gmail ที่ไม่มีการเปิดการตรวจสอบสิทธิ์ 2 value หากที่อยู่หลักของ gmail ของคุณมีการเปิดการตรวจสอบสิทธิ์ 2 ที่ ให้พิจารณาสร้างที่อยู่ gmail อื่น ๆ ด้วยการตรวจสอบสิทธิ์ 2 access ปิด
     
2. เข้าสู่ระบบERDDAP™ใช้ที่อยู่ gmail ที่คุณต้องการใช้ในสคริปต์ของคุณ และยอมรับสิทธิ์ที่อนุญาตใด ๆ ที่ต้องการ จากนั้นให้ล็อกอินกลับออกทั้งหมด
     
3. เปิดเครื่องมือของนักพัฒนาเบราว์เซอร์ แล้วไปยังแท็บของเครือข่าย
     
4. คลิกบนERDDAP™"log in" Link แล้วปุ่ม "แก้ไขใน" และเลือกที่อยู่อีเมลที่เหมาะสมหากถูกถาม
     
5. หลังจากปุ่ม "แสดงใน" เปลี่ยนเป็น "แก้ไข" แท็บ เครือข่ายเครื่องมือของนักพัฒนา จะแสดงสองรายการที่มีลักษณะคล้ายต่อไปนี้ (ตัวอย่างจาก Firefox) .
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
ใช้เมนูคลิกขวาของเมาส์ในเมนู "copy as cURL" ทั้งระบบ และวางมันลงในเครื่องมือแก้ไขข้อความ
     
6. คลิกบน "ล็อกเข้าERDDAP"ปุ่มและ "copy เป็น CURL" ลิงก์ที่ดูเหมือน:
```
    login.html  
```
และวางที่สามนี้curlคําสั่งเข้าไปยังแฟ้มข้อความ
     
7. ในแฟ้มข้อความตอนนี้คุณมี 3 บรรทัดเช่นต่อไปนี้ ที่คุณได้ล็อกอินERDDAP™เซิร์ฟเวอร์ที่ ' * https://host.somewhere.com/erddap * '. อันแรกcurlคําสั่งได้รับโพรไฟล์ผู้ใช้ของคุณใน "login/ hit" และสร้าง "id/ token" ตัวที่สองใช้ id\\_toknown เพื่อบันทึกไปยัง Google, และตัวที่สามจะล็อกอินไปยังERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. บรรทัดที่อยู่ด้านบน 3 บรรทัด, เมื่อประมวลผลต่อเนื่องจากบรรทัดคําสั่ง จะบันทึกคุณไปยังERDDAP. ในการที่จะใช้ข้อความนี้ในสคริปต์ คุณต้องจับ id\\_tochen จากบรรทัดแรก, ป้อนข้อมูลไปยังบรรทัดที่สอง, และเขียนคุกกี้เพื่ออ่านต่อ ๆ ไป
     
9. เพื่อพัฒนาสคริปต์ ให้ประมวลผลสคริปต์ตัวแรก (' https://accounts.google.com )  curlบรรทัดที่แน่นอนตามที่มันถูกคัดลอกจากเครื่องมือนักพัฒนาและจับการตอบสนอง (คุณอาจได้curlความผิดพลาดเกี่ยวกับธง "--2.0" ก็แค่ลบ) . ใน pp มันดูเหมือนต่อไปนี้:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
ปูมบันทึกในกูเกิ้ลโดยประมวลผลบรรทัดที่สองโดยใช้ id\\ _tokey, การเอาพารามิเตอร์ "-H' kookie:'s" และแทนการบอกcurlเพื่อเขียนคุกกี้:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
เข้าสู่ระบบERDDAP™ลบตัวแปร "H'Cooky: someth" และใช้คุกกี้ที่เขียนก่อนหน้านี้:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
ตอนนี้คุณควรจะสามารถร้องขอข้อมูลจากเครื่องแม่ข่าย โดยใช้คุกกี้เดียวกันนี้:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
