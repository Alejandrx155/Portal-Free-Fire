export type SupportLink = { label: string; note: string; href: string };

function parseAffiliateLinks(): SupportLink[] {
  const raw = process.env.NEXT_PUBLIC_AFFILIATE_LINKS ?? "";
  if (!raw) return [];
  try {
    const arr: unknown = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(
        (i): i is SupportLink =>
          !!i &&
          typeof i === "object" &&
          typeof (i as SupportLink).href === "string" &&
          typeof (i as SupportLink).label === "string"
      )
      .map((i) => ({
        label: i.label,
        note: typeof i.note === "string" ? i.note : "",
        href: i.href,
      }));
  } catch {
    return [];
  }
}

export const SUPPORT = {
  donationUrl: process.env.NEXT_PUBLIC_DONATION_URL ?? "",
  donationLabel: process.env.NEXT_PUBLIC_DONATION_LABEL ?? "Invitar un café",
  sponsorEmail: process.env.NEXT_PUBLIC_SPONSOR_EMAIL ?? "",
  affiliateLinks: parseAffiliateLinks(),
};

export const SUPPORT_ENABLED =
  SUPPORT.donationUrl.length > 0 ||
  SUPPORT.sponsorEmail.length > 0 ||
  SUPPORT.affiliateLinks.length > 0;