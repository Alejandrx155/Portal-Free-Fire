const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
const DISABLED = process.env.NEXT_PUBLIC_ADSLOT_DISABLED === "1";

export function AdSlot({ label = "publicidad", className = "" }: { label?: string; className?: string }) {
  if (!CLIENT || DISABLED) return null;
  return (
    <div className={className} aria-label={label}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={CLIENT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}