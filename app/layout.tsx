import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Themecontext";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "EduCMS — Content Studio",
  description: "Teaching content management for all your subjects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          /* =====================================================
             GLOBAL CSS VARIABLES — dark & light
          ===================================================== */

          :root,
          [data-theme="dark"] {
            --bg:          #07070E;
            --bg2:         #0E0E1B;
            --surface:     #111120;
            --surface2:    #16162A;
            --border:      #1E1E32;
            --border2:     #252540;
            --text:        #EEEEF5;
            --text2:       #A0A0C0;
            --muted:       #555570;
            --accent:      #7C6AF7;
            --accent2:     #F76AC8;
            --accent3:     #6AF7C8;
            --nav-bg:      rgba(7,7,14,0.0);
            --nav-scroll:  rgba(7,7,14,0.88);
            --shadow-sm:   0 2px 12px rgba(0,0,0,0.4);
            --shadow-md:   0 8px 32px rgba(0,0,0,0.5);
            --shadow-lg:   0 24px 64px rgba(0,0,0,0.6);
          }

          [data-theme="light"] {
            --bg:          #F4F4FB;
            --bg2:         #FFFFFF;
            --surface:     #FFFFFF;
            --surface2:    #F0F0F8;
            --border:      #E2E2EE;
            --border2:     #D0D0E4;
            --text:        #13132A;
            --text2:       #4A4A70;
            --muted:       #9090B0;
            --accent:      #5B47F5;
            --accent2:     #E040A8;
            --accent3:     #00B896;
            --nav-bg:      rgba(244,244,251,0.0);
            --nav-scroll:  rgba(244,244,251,0.92);
            --shadow-sm:   0 2px 12px rgba(80,80,140,0.08);
            --shadow-md:   0 8px 32px rgba(80,80,140,0.12);
            --shadow-lg:   0 24px 64px rgba(80,80,140,0.15);
          }

          /* =====================================================
             RESET & BASE
          ===================================================== */

          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            transition: background 0.35s ease, color 0.35s ease;
          }

          a { color: inherit; }

          ::selection {
            background: var(--accent);
            color: #fff;
          }

          /* =====================================================
             SCROLLBAR
          ===================================================== */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--bg); }
          ::-webkit-scrollbar-thumb {
            background: var(--border2);
            border-radius: 100px;
          }
          ::-webkit-scrollbar-thumb:hover { background: var(--muted); }

          /* =====================================================
             MAIN CONTENT OFFSET
          ===================================================== */
          main {
            padding-top: 68px;
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}