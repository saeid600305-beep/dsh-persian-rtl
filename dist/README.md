# دانلود نسخهٔ ۱٫۰٫۰

بسته‌های آمادهٔ نصب برای DeepSeek Harness. هر فایل یک بستهٔ کامل است و با `plugin_manager` نصب می‌شود.

| فایل | بسته | کار |
|---|---|---|
| [`dsh-plugin-persian-rtl-1.0.0.tgz`](dsh-plugin-persian-rtl-1.0.0.tgz) | `dsh-plugin-persian-rtl` | سیاست نوشتار فارسی در پرامپت |
| [`dsh-plugin-persian-rtl-ui-1.0.0.tgz`](dsh-plugin-persian-rtl-ui-1.0.0.tgz) | `dsh-plugin-persian-rtl-ui` | راست‌چین‌کردن متن فارسی در رابط وب |

## نصب از فایل دانلودشده

فایل را دانلود کنید و مسیرش را به DSH بدهید:

```text
plugin_manager install_bundle  target: <absolute path to dsh-plugin-persian-rtl-1.0.0.tgz>
```

## نصب مستقیم از همین مخزن

بدون دانلود دستی، همان فایل را از این آدرس نصب کنید:

```text
plugin_manager install_bundle  target: https://github.com/saeid600305-beep/dsh-persian-rtl/raw/main/dist/dsh-plugin-persian-rtl-1.0.0.tgz
plugin_manager install_bundle  target: https://github.com/saeid600305-beep/dsh-persian-rtl/raw/main/dist/dsh-plugin-persian-rtl-ui-1.0.0.tgz
```

## نصب از سورس

اگر می‌خواهید کد را ببینید یا تغییر بدهید، از داخل مخزن نصب کنید:

```text
plugin_manager install_bundle  target: git+https://github.com/saeid600305-beep/dsh-persian-rtl.git#v1.0.0&path:/packages/dsh-plugin-persian-rtl
```

## بررسی سلامت فایل‌ها

```text
eb71c54872032e0e4c549fd852cb6b03fa5216c5b130e953fcd21734e4c2e2b6  dsh-plugin-persian-rtl-1.0.0.tgz
cf0fd2b1eb81f94a2ebe429e3af2ce2c62a9c609b93b4f11bef233c3ff7cd06a  dsh-plugin-persian-rtl-ui-1.0.0.tgz
```
