import { API_KEY, API_ORIGIN } from '$env/static/private';
import { getData } from '$lib/server/getData.js';

export const actions = {
	default: async ({
		request
	}: {
		request: Request;
	}): Promise<{ short: string; processed: boolean; code: number }> => {
		const formData = await request.formData();
		const long = formData.get('longUrl');
		let short = formData.get('shortUrl') || formData.get('shortUrlPlaceholder');
		if (!short || short === 'Generating...') {
			short =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		}
		short = short.toString();
		if (short.length > 20) {
			return { short: short, processed: true, code: 413 };
		}
		const currentData = await getData();
		const shortExists = currentData.find((data) => data.short === short);
		if (shortExists) {
			return { short: short.toString(), processed: true, code: 409 };
		}
		await fetch(`${API_ORIGIN}/data`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_KEY}`,
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ long, short })
		});
		return { short: short, processed: true, code: 200 };
	}
};

export async function load() {
	const data = await getData();
	return {
		body: data
	};
}
