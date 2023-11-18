import { redirect } from '@sveltejs/kit';
import { getData } from '$lib/server/getData';

export async function load({ params }: { params: { short: string } }): Promise<{ url: string }> {
	const data = await getData();
	const url = data.find((u) => u.short === params.short);
	if (url) {
		throw redirect(308, url.long);
	} else {
		throw redirect(308, '/');
	}
}
