// src/components/AdminSkillButtons.tsx
import { Option } from 'fp-ts/Option';
import React from 'react';
import DeleteSkillButton from '../buttons/DeleteSkillButton';
import EditSkillButton from '../buttons/EditSkillButton';

interface AdminSkillButtonsProps {
    skillId: string;
    handleDelete: () => Promise<void>;
    loading: Option<boolean>;
    errorMessage: Option<string>;
    deleteResponseBody: any; // Adjust the type based on your actual response body structure
}

const a = 1;

const AdminSkillButtons: React.FC<AdminSkillButtonsProps> = ({ skillId, handleDelete, loading, errorMessage, deleteResponseBody }) => (
    <div className="flex space-x-4">
        <EditSkillButton skillId={skillId} />
        <DeleteSkillButton
            handleDelete={handleDelete}
            loading={loading}
            errorMessage={errorMessage}
            deleteResponseBody={deleteResponseBody}
        />
    </div>
);

export default AdminSkillButtons;
