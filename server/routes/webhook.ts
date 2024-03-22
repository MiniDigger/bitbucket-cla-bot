export default eventHandler(async (event) => {
    const body = await readBody(event);

    const eventType = getRequestHeader(event, "X-Event-Key");
    switch (eventType) {
        case "pullrequest:created":
            return await handlePRCreation(body);
        case "pullrequest:comment_created":
            return await handlePRComment(body);
        default:
            throw createError({
                status: 400,
                message: "Invalid event",
            });
    }
});

function getAuthor(body: Record<string, any>) {
    if (body?.repository?.full_name !== process.env.BITBUCKET_REPO) throw createError({
        status: 400,
        message: "Invalid repo " + body?.repository?.full_name,
    });

    const author = body?.pullrequest?.author?.nickname;
    if (!author) throw createError({
        status: 400,
        message: "No author found",
    });

    return author;
}

async function handlePRCreation(body: Record<string, any>) {
    const author = getAuthor(body);

    const commentEndpoint = body?.pullrequest?.links?.comments?.href;
    if (await hasAcceptedCla(author)) {
        await postComment("CLA verified", commentEndpoint);
    } else {
        await postComment("Please accept the CLA before submitting a PR. Once you signed, run !cla to confirm.", commentEndpoint);
    }

    return "OK";
}

async function handlePRComment(body: Record<string, any>) {
    const author = getAuthor(body);
    const comment = body?.comment?.content?.raw;

    if (comment === "!cla") {
        const commentEndpoint = body?.pullrequest?.links?.comments?.href;
        if (await hasAcceptedCla(author)) {
            await postComment("CLA verified", commentEndpoint);
        } else {
            await postComment("CLA verification failed, please try again, then run !cla to confirm.", commentEndpoint);
        }
    }

    return "OK";
}
