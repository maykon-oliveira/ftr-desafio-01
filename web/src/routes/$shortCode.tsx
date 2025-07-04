import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$shortCode')({
	loader(ctx) {
		const { shortCode } = ctx.params;
		if (!shortCode) {
			throw new Error('Short code is required');
		}
		return { shortCode };
	},
	component: RedirectingComponent,
})

function RedirectingComponent() {
	return <div>Hello "/redirect"!</div>
}
