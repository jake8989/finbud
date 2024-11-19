import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="dim">
      <html>
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  );
}
