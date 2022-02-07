export class PostDto {
    title: string;
    text: string;
    who: string;
    userId: string;
}

export class RemovePostDto {
    userId: string;
    postId: string;
}
