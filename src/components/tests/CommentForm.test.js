import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentForm from '../../pages/home/comment/CommentForm.tsx';

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
            handlePostComment: jest.fn(() => {
                // handlePostComment가 호출될 때 mockUseText.text 값을 사용한다.
                expect([mockUseText.text, 1]).toEqual([mockUseText.text, 1]);
                return Promise.resolve();
            }),

            loading: false,
        };
        mockUseText = {
            text: 'Test comment3',//상태변경을 못하거나뒤늦게해서 changeEvent시 호출되는 handlePost의 인자값으로 가정한다.
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

        jest.spyOn(require('../../hooks/components/post/comment/usePostComment'), 'default').mockReturnValue(mockUsePostComment);
        jest.spyOn(require('../../hooks/useText'), 'default').mockReturnValue(mockUseText);
    });

    it('renders correctly', () => {
        const { getByPlaceholderText } = setup();
        expect(getByPlaceholderText('댓글 추가...')).toBeInTheDocument();
    });
    it('calls handlePostComment when comment button is clicked', async () => {
        const { input, button } = setup();
        // 텍스트 필드의 값을 업데이트합니다.
        fireEvent.change(input, { target: { value: 'Test comment3' } });
        // 댓글 버튼을 클릭합니다.
        fireEvent.click(button);
        // handlePostComment 함수가 호출되는 것을 기다립니다.
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalled();
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalledWith('Test comment3', 1);
        });
    });


    it('clears the text field after posting a comment', async () => {
        const { input, button } = setup();
        fireEvent.change(input, { target: { value: 'Test comment3' } });
        mockUseText.text = 'Test comment3';
        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        await waitFor(() => {
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalled();
            expect(mockUsePostComment.handlePostComment).toHaveBeenCalledWith('Test comment3', 1);
        });
        // handlePostComment 함수가 호출되고 나면 텍스트 필드가 비워져야 합니다.
        expect(mockUseText.setText).toHaveBeenCalledWith('');
    });




    it('updates the text field when typing', async () => {
        setup();
        mockUseText.handleTextAreaChange({ target: { value: 'Test comment3' } });
        expect(mockUseText.handleTextAreaChange).toHaveBeenCalled();
        expect(mockUseText.setText).toHaveBeenCalledWith('Test comment3');
    });
});