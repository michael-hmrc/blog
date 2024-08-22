import { none, Option, some } from 'fp-ts/Option';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { DeleteResponseBody } from '../models/DeleteResponseBody';
import { PostData } from '../models/PostData';
import BlogPostPage from '../views/blog/BlogPostPage';


const useBlogPost = () => {

    const { id } = useParams<{ id: string }>();
    const postId = id ?? 'default-post-id';

    const [post, setPost] = useState<Option<PostData>>(none);
    const [loading, setLoading] = useState<Option<boolean>>(some(true));
    const [errorMessage, setErrorMessage] = useState<Option<string>>(none);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(some(true));
            setErrorMessage(none);
            setPost(none);

            const { data, error } = await BlogPostConnector.getViaPostId(postId);

            if (error) {
                setErrorMessage(some(error));
            } else if (data) {
                setPost(some(data));
            }

            setLoading(some(false));
        };

        fetchPost(); // Call the async function
    }, [postId]);

    return { post, loading, errorMessage };
};


const BlogPostController: React.FC = () => {

    const { post, loading, errorMessage } = useBlogPost();

    return (
        <BlogPostPage post={post} loading={loading} errorMessage={errorMessage} />
    );
};

export default BlogPostController;
