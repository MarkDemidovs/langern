interface PostProps {
    user: string;
    content: string;
    tags: string[];
}

export default function Post({ user, content, tags }: PostProps) {
    return (
        <div>
            <h3>{user}</h3>
            <p>{content}</p>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </div>
    );
}