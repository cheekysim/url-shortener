import { API_KEY } from '$env/static/private';
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
		if (!short) {
			short =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		}
		short = short.toString();
		if (short.length > 20) {
			return { short: short, processed: true, code: 413 };
		}
		const currentData = await getData();
		const longExists = currentData.find((data) => data.long === long);
		const shortExists = currentData.find((data) => data.short === short);
		if (longExists) {
			return { short: longExists.short, processed: true, code: 304 };
		} else if (shortExists) {
			return { short: short.toString(), processed: true, code: 409 };
		}
		await fetch('http://localhost:4005/api/v1/data', {
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
