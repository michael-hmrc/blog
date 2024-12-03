import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostConnector from '../../connectors/BlogPostConnector';
import { PostData } from '../../models/PostData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 20000;

const useFetchPost = (postId: string) => {

    const [post, setPost] = useState<PostData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);

            const { data, error } = await BlogPostConnector.getViaPostId(postId);

            if (error) {
                setError(error);
            } else if (data) {
                setPost(data);
            }

            setIsLoading(false);
        };

        fetchPost();
    }, [postId]);

    return { post, isLoading, error };
};

const useEditPost = (postId: string, onSuccess: (data: PostData) => void) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editPost = useCallback(async (updatedPost: PostData) => {
        if (updatedPost.title.trim() === '' || updatedPost.body.trim() === '') {
            alert('Title and content cannot be empty');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await BlogPostConnector.updatePostById(postId, updatedPost);
            if (error) {
                setError(error);
                alert(`[EditPostForm][axios.put] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
            } else if (data) {
                onSuccess(data);
                console.log('Post edited successfully:', data);
            }
        } catch (error) {
            console.error('Error when editing post:', error);
            alert(`[EditPostForm][axios.put] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
        } finally {
            setIsLoading(false);
        }
    }, [postId, onSuccess]);

    return { editPost, isLoading, error };
};

const EditPostForm: React.FC = () => {
    const { post_id } = useParams<{ post_id: string }>();
    const postIdDefaulted = post_id ?? 'default-post-id';

    const { post, isLoading: isFetching, error: fetchError } = useFetchPost(postIdDefaulted);
    const { editPost, isLoading: isEditing, error: editError } = useEditPost(postIdDefaulted, (data) => {
        console.log('Post updated:', data);
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.body);
        }
    }, [post]);

    const remainingTitleChars = MAX_TITLE_LENGTH - title.length;
    const remainingContentChars = MAX_CONTENT_LENGTH - content.length;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            editPost({ ...post, title, body: content });
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">
                        Title:
                        <input
                            id="edit-blog-post-text-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={MAX_TITLE_LENGTH}
                            disabled={isFetching || isEditing}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingTitleChars} characters remaining
                    </p>
                </div>
                <div className="mt-4 mb-4">
                    <label className="block mb-2">
                        Content:
                        <textarea
                            id="edit-blog-post-text-area"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 border border-gray-300 rounded p-2"
                            maxLength={MAX_CONTENT_LENGTH}
                            disabled={isFetching || isEditing}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingContentChars} characters remaining
                    </p>
                </div>
                <button
                    id="edit-blog-post"
                    type="submit"
                    disabled={isFetching || isEditing}
                    className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
                >
                    {isFetching || isEditing ? 'Updating...' : 'Update Post'}
                </button>
            </form>
            {(fetchError || editError) && <p className="text-red-500 mt-4">{fetchError || editError}</p>}
        </div>
    );
};

export default EditPostForm;
