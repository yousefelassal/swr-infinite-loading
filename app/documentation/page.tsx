import Code from '@/components/Code.mdx'
import CodePostgres from '@/components/CodePostgres.mdx'

export default function page() {
  return (
    <div className="flex p-4 flex-col gap-4">
      <Code />
      <CodePostgres />
    </div>
  )
}
