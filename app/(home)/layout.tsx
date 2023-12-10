import Nav from '@/components/Nav'

const tabs = [
    { href: '/', label: 'Mongo' },
    { href: '/postgres', label: 'Postgres' },
  ]
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
          <Nav tabs={tabs} />
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </section>
    )
  }
  