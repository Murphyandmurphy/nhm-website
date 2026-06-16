"use client";

type Item = { id: string; num: string; name: string };

/** AnchorNav — pill links that smooth-scroll to a service block on the page. */
export function AnchorNav({ items }: { items: Item[] }) {
  const jump = (id: string) => {
    const el = document.getElementById("svc-" + id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="anchornav" style={{ marginTop: "1.75rem" }}>
      {items.map((s) => (
        <button key={s.id} onClick={() => jump(s.id)}>
          {s.num} · {s.name}
        </button>
      ))}
    </div>
  );
}
