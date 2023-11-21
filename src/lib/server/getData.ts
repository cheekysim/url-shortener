import { API_KEY } from '$env/static/private';

export async function getData(): Promise<Data[]> {
	const response = await fetch('http://localhost:4006/api/data', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_KEY}`
		}
	});
	const data = await response.json();
	return data;
}

export interface Data {
	_id: string;
	long: string;
	short: string;
}
