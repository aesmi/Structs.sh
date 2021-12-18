/** @jsxImportSource @emotion/react */
import React from 'react';
import { TagList } from './TagList';

interface TagSelectorProps {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    allowDuplicates?: boolean;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, setSelectedTags }) => {
    return (
        <TagList
            tags={selectedTags}
            handleDelete={(tag: string) => {
                const filteredArr: string[] = selectedTags.filter((filterTag) => {
                    return filterTag !== tag;
                });
                setSelectedTags(filteredArr);
            }}
        />
    );
};

export default TagSelector;