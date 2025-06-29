---
sidebar_position: 7
---
# 'displayinfo' และ 'displaytribution' ป้ายกํากับ

## คําอธิบาย
คุณสมบัตินี้ให้คุณได้แสดงคุณลักษณะต่าง ๆ ของสิ่งที่คุณเลือกบนหน้าข้อมูล ในแถว 'ข้อมูล'

## วิธี สอน
ป้ายกํากับเหล่านี้สามารถใช้ได้กับ `ตัววิเคราะห์ ' เท่านั้น เพื่อให้สามารถและใช้มัน ทําตามขั้นตอนเหล่านี้

1.  **เปิดใช้งานพาร์เซอร์ SACX** .
เพิ่มบรรทัดต่อไปนี้ไปยังแฟ้ม 'Setup.xml' ของคุณ:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **เพิ่มป้ายกํากับใน '% 1'datasets.xml'** .
ในกลุ่มdatasets.xmlแฟ้ม
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **พฤติกรรมปริยาย** .
   - หากป้ายเหล่านี้ไม่ถูกเพิ่มหรือปล่อยว่างไว้ใน `datasets.xmlแฟ้ม, ค่าปริยายจะถูกปรับใช้ดังต่อไปนี้:
     - 'displayinfo': หม่อมชั้น หม่อมเจ้า '
     - 'display attribution': 'summary, licent '

4.  **ความมั่นคง** .
จํานวนของค่าที่แยกเป็นเครื่องหมายจุลภาคในทั้ง `displayfo' และ 'displaytribution' แท็กต้องเท่ากัน

## วิธี ที่ มัน ดําเนิน งาน
- แอตทริบิวต์&lt;'addAttributesแสดงสําหรับแต่ละชุดข้อมูล
- ค่าที่สัมพันธ์กันในแท็ก 'displayinfo' จะถูกแสดงเป็นป้ายชื่อในแถว 'ข้อมูล' ของ UI
- เมื่อผู้ใช้ยกป้ายที่แสดงอยู่ จะปรากฏทูลทิป เพื่อแสดงค่าของแอททริบิวต์ทั่วไป

## ตัวอย่าง
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### ตัวอย่างชุดข้อมูลแอททริบิวต์ทั่วไป:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### พฤติกรรมของ UI:
- คําว่า "Display1' และ 'Display2' จะถูกแสดงในแถว 'ข้อมูล' ในยูไอ
- เมื่อเคลื่อนเมาส์มาอยู่เหนือหน้าต่างต่าง ๆ จะแสดงลักษณะเฉพาะ:
  - 'Display1': เครื่องมือแสดง_ this is at1_
  - 'Desplay2': เครื่องมือแสดง_ this is at2_

## บันทึกย่อ
- แน่ใจว่าชื่อแอตทริบิวต์ที่ระบุไว้ในป้าย 'displaytridge' ตรงกับคุณสมบัติทั่วไปที่กําหนดไว้ในชุดข้อมูล
- คุณสมบัติที่ไม่ถูกต้องหรือสูญหาย จะเป็นการบันทึกข้อความผิดพลาด

โดยทําตามขั้นตอนเหล่านี้ คุณสามารถกําหนดแถว 'ข้อมูล' ในหน้าข้อมูล เพื่อแสดงคุณลักษณะที่เกี่ยวข้องทั่วโลกด้วยทูลทิปที่สอดคล้องกัน
