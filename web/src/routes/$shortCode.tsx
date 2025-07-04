import { findByShortCode } from '@/api/link-api';
import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';
import logoIcon from "@/assets/Logo_Icon.svg";

export const Route = createFileRoute('/$shortCode')({
	component: RedirectingComponent,
})

function RedirectingComponent() {
	const { shortCode } = Route.useParams()

	useEffect(() => {
		if (!shortCode) {
			return;
		}

		findByShortCode(shortCode)
			.then(({ data }) => {
				window.location.href = data.data.originalUrl;
			})

	}, [shortCode]);


	return <div className="h-dvh flex justify-center items-center p-5">
		<Card className='max-w-lg'>
			<CardContent className='flex justify-center flex-col items-center text-center gap-5'>
				<img src={logoIcon} className="h-24 mx-auto" alt="Not Found" />

				<p className='text-xl'>Redirecionando...</p>

				<p className='text-md text-gray-500'>O link será aberto automaticamente em alguns instantes. <br></br>
					Não foi redirecionado? <a className='text-blue' href="">Acesse aqui</a></p>
			</CardContent>
		</Card>
	</div>
}
