# DSH Persian RTL

افزونه‌های فارسی برای [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness): نوشتار راست‌چین با رسم‌الخط درست، و رابط کاربری راست‌چین — مگر اینکه پرسش به انگلیسی باشد.

## دو بسته

| بسته | کار | ردیف |
|---|---|---|
| [`dsh-plugin-persian-rtl`](packages/dsh-plugin-persian-rtl) | سیاست نوشتار فارسی در سیستم‌پرامپت همهٔ عامل‌ها | `persian-rtl-writing` |
| [`dsh-plugin-persian-rtl-ui`](packages/dsh-plugin-persian-rtl-ui) | راست‌چین‌کردن متن فارسی در رابط وب | `persian-rtl-ui` |

بستهٔ اول به زبان پاسخ جهت می‌دهد: پرسش فارسی، پاسخ فارسی؛ پرسش انگلیسی، پاسخ انگلیسی. رسم‌الخط را هم کنترل می‌کند: ی و ک فارسی، نیم‌فاصله، فاصلهٔ کامل میان واژه‌ها، نقطه‌گذاری و ارقام فارسی. متن سیاست در [`policy.md`](packages/dsh-plugin-persian-rtl/policy.md) است و در هر درخواست از فایل خوانده می‌شود؛ پس ویرایش آن بدون راه‌اندازی مجدد اثر می‌گذارد.

بستهٔ دوم فقط ظاهر را درست می‌کند: هر بلوک فارسی را تشخیص می‌دهد، جهت واقعی‌اش را ست می‌کند و راست‌چین نشان می‌دهد؛ کد و ورودی‌ها LTR می‌مانند.

## نصب

از داخل DSH، با ابزار `plugin_manager`:

```text
plugin_manager install_bundle  target: dsh-plugin-persian-rtl
plugin_manager install_bundle  target: dsh-plugin-persian-rtl-ui
```

یا از مسیر محلی:

```text
plugin_manager install_bundle  target: <absolute path to packages/dsh-plugin-persian-rtl>
```

پس از انتشار در npm، کاربران می‌توانند فقط نام بسته را وارد کنند.

## ساختار مخزن

```text
packages/
  dsh-plugin-persian-rtl/      # پرامپت و رسم‌الخط
    lib/index.js
    policy.md
    cordis.patch.yml
  dsh-plugin-persian-rtl-ui/   # کلاینت وب
    lib/index.js
    lib/client.js
    cordis.patch.yml
```

## توسعه

هر بسته مستقل است و وابستگی ندارد. برای آزمودن تغییرات، پوشهٔ بسته را با `link:` در پروفایل نصب کنید؛ DSH با HMR تغییرات تنظیمات را زنده اعمال می‌کند و `policy.md` در هر درخواست دوباره خوانده می‌شود.

## مجوز

MIT — فایل [LICENSE](LICENSE).
