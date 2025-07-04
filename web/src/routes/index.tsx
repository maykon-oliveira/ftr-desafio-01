import { LinkForm } from '@/components/link-form'
import { LinkList } from '@/components/link-list'
import { createFileRoute } from '@tanstack/react-router'

import logo from "@/assets/Logo.svg";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex flex-col items-center gap-5 justify-center w-full max-[]:">
        <div className='flex justify-center md:justify-start w-full'>
          <img src={logo} className='h-8' />
        </div>

        <div className="flex flex-col md:flex-row gap-5 w-full">
          <LinkForm />

          <LinkList />
        </div>
      </div>
    </div>
  )
}