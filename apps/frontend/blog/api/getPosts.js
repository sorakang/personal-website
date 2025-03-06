export default async function getPosts() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
    console.log('resp', response)
    const res = await response.json()
    console.log('res', res)
    return res;
  } catch (e) {
    console.error(e);
  }
}
