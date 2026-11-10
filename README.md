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

هر دو بسته با ابزار `plugin_manager` داخل DSH نصب می‌شوند.

### از npm

بعد از انتشار، کافی است نام بسته را بدهید:

```text
plugin_manager install_bundle  target: dsh-plugin-persian-rtl
plugin_manager install_bundle  target: dsh-plugin-persian-rtl-ui
```

### مستقیم از گیت‌هاب

بدون نیاز به npm، از همین مخزن نصب کنید. pnpm زیرپوشهٔ هر بسته را از روی `path:` برمی‌دارد:

```text
plugin_manager install_bundle  target: git+https://github.com/saeid600305-beep/dsh-persian-rtl.git#path:/packages/dsh-plugin-persian-rtl
plugin_manager install_bundle  target: git+https://github.com/saeid600305-beep/dsh-persian-rtl.git#path:/packages/dsh-plugin-persian-rtl-ui
```

برای نصب از گیت‌هاب، `git` باید روی `PATH` باشد. برای نسخهٔ قفل‌شده، کامیت را جای نام شاخه بگذارید.

### از مسیر محلی

```bash
git clone https://github.com/saeid600305-beep/dsh-persian-rtl.git
```

```text
plugin_manager install_bundle  target: <absolute path to packages/dsh-plugin-persian-rtl>
```

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

## انتشار در npm

نام هر دو بسته در npm آزاد است. برای انتشار:

```bash
npm login
cd packages/dsh-plugin-persian-rtl
npm publish --access public
cd ../dsh-plugin-persian-rtl-ui
npm publish --access public
```

پیش از انتشار می‌توانید محتوای بستهٔ نهایی را ببینید:

```bash
npm pack --dry-run
```

## توسعه

هر بسته مستقل است و وابستگی ندارد. برای آزمودن تغییرات، پوشهٔ بسته را با `link:` در پروفایل نصب کنید؛ DSH با HMR تغییرات تنظیمات را زنده اعمال می‌کند و `policy.md` در هر درخواست دوباره خوانده می‌شود.

## مجوز

MIT — فایل [LICENSE](LICENSE).
