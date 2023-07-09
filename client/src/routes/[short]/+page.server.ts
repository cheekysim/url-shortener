import { redirect } from "@sveltejs/kit";
import { getData } from "$lib/getData";

export async function load({ params }: { params: { short: string } }): Promise<{ url: string }> {
	const data = await getData();
	data.forEach((url) => {
		if (url.short === params.short) {
			throw redirect(308, url.long);
		}
	});
	throw redirect(308, '/');
}