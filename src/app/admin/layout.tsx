import AdminHeader from "@/components/AdminHeader"

export default function CustomerLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode,
}>) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-[35vh] sm:min-h-[65vh]">
        {children}
        {modal}
      </main>
    </>
  )
}
