import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username } = await request.json();
  console.log(username);

  try {
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const twitterResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,profile_image_url`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`, // Secure token
        },
      }
    );

    if (twitterResponse.status === 429) {
      const rateLimitReset = twitterResponse.headers.get('x-rate-limit-reset');
      const resetTime = rateLimitReset ? parseInt(rateLimitReset, 10) * 1000 : Date.now() + 60000; // default 1 min
      const retryAfter = new Date(resetTime).toISOString();

      return NextResponse.json({
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: retryAfter,
      }, { status: 429 });
    }

    if (!twitterResponse.ok) {
      throw new Error('Failed to fetch Twitter user');
    }

    const data = await twitterResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Twitter user:", error);
    return NextResponse.json({ error: "Error fetching Twitter user" }, { status: 500 });
  }
}
