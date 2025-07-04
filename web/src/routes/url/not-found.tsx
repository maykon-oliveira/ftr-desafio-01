import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import notFoundImage from "@/assets/404.svg";

export const Route = createFileRoute('/url/not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-dvh flex justify-center items-center p-5">
      <Card className='max-w-lg'>
        <CardContent className='flex justify-center flex-col items-center text-center gap-5'>
          <img src={notFoundImage} className="h-24 mx-auto" alt="Not Found" />

          <p className='text-xl'>Link não encontrado</p>

          <p className='text-md text-gray-500'>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="">brev.ly.</a></p>
        </CardContent>
      </Card>
    </div>
  )
}
