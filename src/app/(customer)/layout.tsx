import Header from "@/components/Header"

export default function CustomerLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode,
}>) {
  return (
    <>
      <Header />
      <main className="min-h-[35vh] sm:min-h-[65vh]">
        {children}
        {modal}
      </main>
    </>
  )
}
