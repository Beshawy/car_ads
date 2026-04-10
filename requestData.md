# Auth Module - Request Data Examples

هذا الملف يحتوي على نماذج البيانات المطلوبة (Payloads) لكل مسار (Endpoint) في نظام تسجيل الدخول. يمكنك استخدامها لاختبار الـ API عبر Postman أو من خلال الفرونت إند.

## 1. Register (إنشاء حساب جديد)
**المسار:** `POST /api/v1/auth/register`

**البيانات (Body - JSON):**
```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed88@example.com",
  "password": "Password123",
  "passwordConfirm": "Password123",
  "phone": "01012345678"
}
```
*(ملاحظة: رقم الهاتف `phone` اختياري)*

---

## 2. Login (تسجيل الدخول)
**المسار:** `POST /api/v1/auth/login`

**البيانات (Body - JSON):**
```json
{
  "email": "ahmed88@example.com",
  "password": "Password123"
}
```

---

## 3. Forgot Password (نسيت كلمة المرور)
**المسار:** `POST /api/v1/auth/forgot-password`

**البيانات (Body - JSON):**
```json
{
  "email": "ahmed88@example.com"
}
```

---

## 4. Verify Code (التحقق من الكود)
**المسار:** `POST /api/v1/auth/verify-code`

**البيانات (Body - JSON):**
```json
{
  "email": "ahmed88@example.com",
  "code": "123456"
}
```

---

## 5. Reset Password (إعادة تعيين كلمة المرور)
**المسار:** `POST /api/v1/auth/reset-password`

**البيانات (Body - JSON):**
```json
{
  "email": "ahmed88@example.com",
  "code": "123456",
  "newPassword": "NewPassword456",
  "passwordConfirm": "NewPassword456"
}
```


---

## 6. Logout (تسجيل الخروج)
**المسار:** `POST /api/v1/auth/logout`

**الترويسة (Headers):**
- يجب أن يتم إرسال التوكن لكي تعمل هذه الـ Endpoint.
```json
{
  "Authorization": "Bearer <YOUR_JWT_TOKEN_HERE>"
}
```
**البيانات (Body):** فارغ لا ترسل شيء.
