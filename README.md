# เว็บดูหุ้นสหรัฐ (แนวรับ-แนวต้าน, ข่าว, งบ)

ใช้ฟรีทั้งหมด: Finnhub (ราคา/ข่าว/งบ) + Yahoo Finance (กราฟย้อนหลัง) + Vercel (โฮสต์)

## ติดตั้ง (ประมาณ 10 นาที)
1. สมัคร API key ฟรีที่ https://finnhub.io แล้วคัดลอก key
2. สมัคร https://github.com แล้วอัปโหลดโฟลเดอร์นี้ขึ้นเป็น repository
3. สมัคร https://vercel.com ด้วยบัญชี GitHub > Add New Project > เลือก repo นี้
4. ก่อนกด Deploy ไปที่ Environment Variables เพิ่ม
   - Name: FINNHUB_KEY
   - Value: key ที่คัดลอกมา
5. กด Deploy แล้วจะได้ลิงก์เว็บใช้ได้ทั้งคอมและมือถือ

## ทดสอบในเครื่อง
npm i -g vercel
cp .env.example .env   (แล้วใส่ key)
vercel dev

## ปรับแต่ง
- รายการหุ้นเริ่มต้น: DEFAULT_LIST ใน public/index.html
- ความถี่แคช: ตัวเลขวินาทีใน api/*.js (cache(res, 60))
- กราฟย้อนหลังใช้ Yahoo ซึ่งเป็น API ไม่เป็นทางการ ถ้าโดนบล็อกในอนาคต ให้เปลี่ยนแหล่งใน api/candles.js

ข้อมูลล่าช้าและไม่ใช่คำแนะนำการลงทุน
