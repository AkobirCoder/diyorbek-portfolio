/**
 * JsonLd — strukturaviy ma'lumotni <script type="application/ld+json"> sifatida
 * chiqaradi. Server Component; bitta yoki bir nechta sxemani qabul qiladi.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // JSON.stringify xavfsiz — kontent bizning tokenlarimizdan iborat
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
