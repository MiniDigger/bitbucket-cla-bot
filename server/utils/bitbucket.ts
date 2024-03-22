export async function postComment(comment: string, url: string) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BITBUCKET_TOKEN}`,
        },
        body: JSON.stringify({
            content: {
                raw: comment,
            },
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to post comment: ${await response.text()}`);
    }
}
