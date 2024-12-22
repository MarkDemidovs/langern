interface PostProps {
    user: string;
    content: string;
    tags: string[];
}

export default function Post({ user, content, tags }: PostProps) {
    return (
        <div id="post">
            <div id="post-header">
            <h3 id="userTitle">{user}</h3>
                        
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            </div>
            <p id="content">{content}</p>
        </div>
    );
}