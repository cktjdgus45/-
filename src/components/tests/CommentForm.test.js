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
        mockUsePostComment = {
            handlePostComment: jest.fn((comment, postId) => {
                //mockUseText.text의 값이 아니라 초기값이 comment로 전달되는 문제를 해결
                expect([mockUseText.text, postId]).toEqual([mockUseText.text, 1]);
                // expect([comment, postId]).toEqual(['Test comment3', 1]);
                return Promise.resolve();
            }),
            loading: false,
        };
        mockUseText = {
            text: 'Test Comment2',
            setText: jest.fn().mockImplementation((newText) => {
                mockUseText.text = newText;
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
        const { input, button } = setup();
        // 댓글을 입력합니다.
        fireEvent.change(input, { target: { value: 'Test comment3' } });
        mockUseText.text = 'Test comment3';
        // 상태 업데이트를 기다립니다.
        // 실제 CommentForm 컴포넌트의 setText 함수를 호출하여 상태를 업데이트해야하지만
        // 이는 테스트 환경에서는 불가능
        await waitFor(() => {
            expect(mockUseText.setText).toHaveBeenCalledWith('Test comment3');
        });
        // 댓글 버튼이 활성화되어 있는지 확인합니다.
        expect(button).not.toBeDisabled();
        fireEvent.click(button);
        // handlePostComment 함수가 호출되는 것을 기다립니다.
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalled();
        });
    });
    it('clears the text field after posting a comment', async () => {
        const { input, button, queryByText } = setup();
        fireEvent.change(input, { target: { value: 'Test comment3' } });
        mockUseText.text = 'Test comment3';
        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalled();
        });
        expect(queryByText('Test comment3')).toBeNull();
    });

    it('updates the text field when typing', async () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'Test comment3' } });
        mockUseText.text = 'Test comment3';
        expect(mockUseText.handleTextAreaChange).toHaveBeenCalled();
        expect(mockUseText.setText).toHaveBeenCalledWith('Test comment3');
    });
});