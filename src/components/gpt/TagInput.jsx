import React, { useState, useRef } from 'react';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const addTag = () => {
        if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
        inputRef.current.focus();
    };

    const handleDelete = (indexToDelete) => {
        setTags(tags.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div>
            <div className="mr-10 ml-10 flex items-center border-b border-gray-300 mb-4">
                <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="무엇을 넣으시겠어요? ↲"
                    className="font-score appearance-none bg-transparent border-none w-full text-gray-700 py-4 px-2 leading-tight focus:outline-none"
                />
                <button
                    className="bg-white hover:cursor-pointer hover:text-red-500 text-lg text-black font-bold py-2 px-4 rounded-full flex items-center"
                    onClick={addTag}
                >
                    +
                </button>
            </div>
            <div className="flex flex-col items-center mb-8 w-full">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded-full px-3 py-2 mt-2 text-sm font-semibold text-gray-700 my-1 flex items-center justify-between w-auto"
                    >
                        <span className="flex-1">{tag}</span>
                        <button
                            onClick={() => handleDelete(index)}
                            className="text-gray-500 focus:outline-none focus:text-gray-600 ml-4"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagInput;