import React, { useState, useRef, useEffect } from 'react';
import './LoadingDots.css';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!loading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [loading]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => addTag(inputValue.trim()), 500);
        }
    };

    const addTag = (newTag) => {
        if (!tags.includes(newTag)) {
            setTags(prevTags => [...prevTags, newTag]);
        }
        setInputValue('');
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleDelete = (index) => {
        setTags(tags.filter((_, idx) => idx !== index));
    };

    const handleButtonClick = () => {
        if (inputValue.trim()) {
            setLoading(true);
            setTimeout(() => addTag(inputValue.trim()), 500);
        }
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
                    className="appearance-none bg-transparent border-none w-full text-gray-700 py-4 px-2 leading-tight focus:outline-none"
                    disabled={loading}
                />
                <button
                    className="bg-white hover:cursor-pointer hover:text-red-500 text-lg text-black font-bold py-2 px-4 rounded-full flex items-center"
                    onClick={handleButtonClick}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="loading-dots">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : '+'}
                </button>
            </div>
            <div className="flex flex-col items-center mb-8">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-gray-200 rounded-full px-3 py-2 my-2 text-sm font-semibold text-gray-700 flex items-center">
                        <span>{tag}</span>
                        <button
                            onClick={() => handleDelete(index)}
                            className="ml-2 text-gray-500 focus:outline-none focus:text-gray-600"
                            disabled={loading}
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
