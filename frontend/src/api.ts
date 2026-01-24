const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error('REACT_APP_API_URL is not defined');
}

export async function getBooks() {
  const res = await fetch(`${API_URL}/books`);

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.status}`);
  }

  return res.json();
}
