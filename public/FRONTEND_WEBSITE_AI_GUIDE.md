# Website AI Frontend Guide

Bu doc `website_ai` widgetni frontenddan ulash uchun.

## Maqsad

- Website ichida anonymous chat widget ishlaydi
- history saqlanadi
- realtime yangilanadi
- AI javob beradi
- operator `CIMS` ichidan yozsa ham shu widgetga tushadi

## Channel

- backenddagi channel nomi: `website_ai`

## Session ishlashi

Frontend bir marta `session_id` oladi va `localStorage` ga saqlaydi.

- key: `cognilabs_website_ai_session_id`

Backend session bo'lmasa o'zi yaratadi.

## 1. Session ochish

### Request

`POST /cognilabsai/public/website/session`

Body:

```json
{}
```

yoki oldingi session bilan:

```json
{
  "session_id": "existing-session-id"
}
```

### Response

```json
{
  "session_id": "abc123...",
  "conversation": {
    "id": 2001,
    "channel": "website_ai",
    "chat_mode": "website_ai",
    "supports_ai": true,
    "client_display_name": "Website visitor"
  },
  "messages": []
}
```

Frontend flow:

1. page load bo'lsa `localStorage` dan `session_id` o'qing
2. bo'sh bo'lsa `{}` bilan session endpointga boring
3. `session_id` ni saqlang
4. `conversation.id` ni state ga qo'ying
5. `messages` ni chatga render qiling

## 2. History qayta olish

### Request

`GET /cognilabsai/public/website/messages?session_id=<session_id>`

### Response

`POST /website/session` bilan bir xil:

```json
{
  "session_id": "abc123...",
  "conversation": {...},
  "messages": [...]
}
```

Bu endpoint:

- refresh bo'lsa
- widget qayta ochilsa
- websocket reconnect bo'lganda

foydali.

## 3. Client message yuborish

### Request

`POST /cognilabsai/public/website/send-message`

```json
{
  "session_id": "abc123...",
  "text": "Assalomu alaykum"
}
```

### Response

```json
{
  "session_id": "abc123...",
  "conversation": {...},
  "messages": [...]
}
```

Amaliy tavsiya:

- send requestdan keyin response kutishingiz mumkin
- lekin UI realtime uchun websocketga tayansin
- optimistic render qilmoqchi bo'lsangiz ham bo'ladi

## 4. Realtime websocket

### URL

`wss://api.project.cims.cognilabs.org/cognilabsai/ws/website?session_id=<session_id>`

Bu websocket uchun `api_key` kerak emas.

### Eventlar

#### `message.created`

```json
{
  "type": "message.created",
  "conversation_id": 2001,
  "message": {
    "id": 9001,
    "conversation_id": 2001,
    "channel": "website_ai",
    "sender_type": "client",
    "text": "Salom",
    "created_at": "2026-05-16T12:00:00"
  }
}
```

#### `conversation.updated`

```json
{
  "type": "conversation.updated",
  "conversation": {
    "id": 2001,
    "channel": "website_ai",
    "chat_mode": "website_ai",
    "supports_ai": true,
    "last_message_preview": "Salom"
  }
}
```

#### `conversation.deleted`

```json
{
  "type": "conversation.deleted",
  "conversation_id": 2001
}
```

Frontend amaliy tavsiya:

1. session ochilgach websocketga ulang
2. `message.created` kelsa message listga append qiling
3. `conversation.updated` kelsa header/meta ni yangilang
4. socket uzilsa reconnect qiling
5. reconnectdan keyin `GET /public/website/messages` bilan sync qiling

## 5. Sender type lar

- `client`: website user yozgan
- `ai`: AI javobi
- `operator`: `CIMS` ichidan operator yozgan
- `system`: service xabarlari

Widgetda odatda:

- `client` o'ngda
- `ai`, `operator`, `system` chapda

## 6. Discount override

Faqat `website_ai` uchun:

- user chegirma/discount haqida so'rasa
- AI default javob beradi:

`Bu bo'yicha operatorlarimiz sizga to'liq ma'lumot beradi.`

Frontend tomonda alohida ish kerak emas.

## 7. Lead va CRM

Website chat AI lead olsa:

- lead `CRM` ga tushadi
- platform/source: `website_ai`

Frontend tomonda alohida action kerak emas.

## 8. Operator takeover

Operator `CIMS` ichidan shu chatga yozsa:

- `operator` message sifatida websocketga keladi
- widgetda oddiy incoming message sifatida ko'rsating

## 9. Follow-up

`website_ai` uchun follow-up ishlatilmaydi.

Frontend chat settingsda website channel uchun follow-up UI chiqarmang.

## 10. Tavsiya etilgan frontend flow

1. widget load
2. `localStorage` dan `session_id` o'qish
3. `POST /public/website/session`
4. `session_id` ni saqlash
5. websocketga ulanish
6. `messages` ni render qilish
7. user yozsa `POST /public/website/send-message`
8. realtime eventlar bilan UI yangilash

## 11. Minimal localStorage misol

```ts
const STORAGE_KEY = "cognilabs_website_ai_session_id";

function getStoredSessionId() {
  return localStorage.getItem(STORAGE_KEY);
}

function setStoredSessionId(sessionId: string) {
  localStorage.setItem(STORAGE_KEY, sessionId);
}
```

## 12. Muhim eslatmalar

- `website_ai` anonymous ishlaydi
- frontend session id ni yo'qotmasa history saqlanadi
- websocket ulanishi uchun shu session id ishlatiladi
- `CIMS` dagi operator javoblari ham shu chatda ko'rinadi
