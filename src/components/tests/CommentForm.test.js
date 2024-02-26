import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentForm from '../community/comment/CommentForm.tsx';
import PostService from '../../service/post.ts';

jest.mock('../../service/post.ts');

let mockUsePostComment;
let mockUseText;

const setup = () => {
    const utils = render(<CommentForm postId={1} />);
    const input = utils.getByPlaceholderText('댓글 추가...');
    const button = utils.getByText('댓글');
    return {
        input,
        button,
        ...utils,
    };
};

describe('<CommentForm />', () => {
    beforeEach(() => {
        let text = '';
        mockUsePostComment = {
            handlePostComment: jest.fn(),
            loading: false,
        };
        mockUseText = {
            text: 'Test comment',
            setText: jest.fn().mockImplementation((newText) => {
                text = newText;
            }),
            handleTextChange: jest.fn(),
            handleTextAreaChange: jest.fn().mockImplementation((event) => {
                const textareaText = event.target.value;
                if (textareaText.length <= 155) {
                    mockUseText.setText(textareaText);
                }
            }),
        };

        jest.spyOn(require('../../hooks/usePostComment'), 'default').mockReturnValue(mockUsePostComment);
        jest.spyOn(require('../../hooks/useText'), 'default').mockReturnValue(mockUseText);
    });

    it('renders correctly', () => {
        const { getByPlaceholderText } = setup();
        expect(getByPlaceholderText('댓글 추가...')).toBeInTheDocument();
    });

    it('calls handlePostComment when comment button is clicked', async () => {
        const { button } = setup();
        // 댓글 버튼이 활성화되어 있는지 확인합니다.
        expect(button).not.toBeDisabled();
        fireEvent.click(button);
        // handlePostComment 함수가 호출되는 것을 기다립니다.
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalledWith('Test comment', 1);
        });
    });

    it('clears the text field after posting a comment', async () => {
        const { input, button } = setup();
        fireEvent.change(input, { target: { value: 'Test comment' } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalledWith('Test comment', 1);
        });
        expect(mockUseText.setText).toHaveBeenCalledWith('');
    });

    it('updates the text field when typing', async () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'Test comment2' } });
        expect(mockUseText.handleTextAreaChange).toHaveBeenCalled();
        expect(mockUseText.setText).toHaveBeenCalledWith('Test comment2');
    });
});
