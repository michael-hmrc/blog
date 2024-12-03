import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkillsConnector from '../../../connectors/SkillsConnector';
import { SkillData } from '../../../models/SkillData';

const EditSkillPage: React.FC = () => {

    const [sqlId, setSqlId] = useState(0);
    const [sqlSkillId, setSqlSkillId] = useState('');
    const [skillName, setSkillName] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState<Date>(new Date);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const maxSkillNameLength = 100;
    const maxSkillIdLength = 50;
    const maxContentLength = 400;

    const { skill_id } = useParams<{ skill_id: string }>();
    console.log(`${skill_id}`)
    const skillIdDefaulted = skill_id ?? 'default-skill-id';

    useEffect(() => {

        const fetchPost = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            const { data, error } = await SkillsConnector.getViaSkillId(skillIdDefaulted);

            if (error) {
                setErrorMessage(error);
            } else if (data) {
                // Preset the form fields with the fetched post data
                setSqlId(data.id);
                setSqlSkillId(data.skill_id);
                setSkillName(data.skill_name);
                setContent(data.body);
                setCreatedAt(data.created_at);
            }

            setIsLoading(false);
        };

        fetchPost(); // Call the async function when the component mounts
    }, [sqlSkillId]);

    const editPost = async () => {

        try {
            const updatedSkill:
                SkillData = {
                id: sqlId, // Use the current postId
                skill_id: sqlSkillId, // Use the updated post_id from state
                skill_name: skillName, // Use the updated skillName from state
                body: content, // Use the updated content from state
                created_at: createdAt,
                updated_at: new Date
            };

            const { data, error } = await SkillsConnector.updateSkillById(sqlSkillId, updatedSkill);
            if (error) {
                setErrorMessage(error);
                alert(`[EditSkillForm][editPost] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
            } else {
                console.log('Post edited successfully:', data);
            }
        } catch (error) {
            console.error('Error when editing post:', error);
            alert(`[EditSkillForm][editPost] Failed to update the blog post. Please try again. ${API_BASE_URL}/blog/post/update`);
        } finally {
            setIsLoading(false);
        }
    };

    const remainingSkillNameChars = maxSkillNameLength - skillName.length;
    const remainingSkillIdChars = maxSkillIdLength - sqlSkillId.length;
    const remainingContentChars = maxContentLength - content.length;

    return (
        <div className="p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    editPost();
                }}
            >
                <div className="mb-4">
                    <label className="block mb-2">
                        Skill Name:
                        <input
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxSkillNameLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingSkillNameChars} characters remaining
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">
                        Skill Id:
                        <input
                            type="text"
                            value={sqlSkillId}
                            onChange={(e) => setSqlSkillId(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxSkillIdLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingSkillIdChars} characters remaining
                    </p>
                </div>

                <div className="mt-4 mb-4">
                    <label className="block mb-2">
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 border border-gray-300 rounded p-2"
                            maxLength={maxContentLength}
                            disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingContentChars} characters remaining
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
                >
                    {isLoading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default EditSkillPage;
