import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["en-US", "pt-BR", "es"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the path already includes a locale, continue
  if (SUPPORTED.some((l) => pathname.startsWith(`/${l}`))) {
    return NextResponse.next();
  }

  // Simple prefered language from cookie or Accept-Language
  const cookieLocale = req.cookies.get("locale")?.value;
  if (cookieLocale && SUPPORTED.includes(cookieLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const header = req.headers.get("accept-language") || "";
  const preferred = header.split(",")[0] || "en-US";
  const locale = SUPPORTED.includes(preferred) ? preferred : "en-US";
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
