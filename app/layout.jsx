import './globals.css';
export default function RootLayout({children,}) {
  return (
    <html lang="it">
      <body className={""}>
        {children}
    </body>
    </html>
  );
}