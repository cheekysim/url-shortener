import { API_TOKEN } from "$env/static/private";

export const actions = {
  create: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    console.log(formData)
    const long = formData.get('longUrl');
    const short = formData.get('shortUrl') || formData.get('shortUrlPlaceholder');
    console.log(long, short);
    await fetch('http://localhost:3005/api/v1/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ long, short }),
        });
        return {short, success: true};
      },

}

export async function load() {
  const req = await fetch('http://localhost:3005/api/v1/data', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await req.json();
  return {
    body: data,
  }
}