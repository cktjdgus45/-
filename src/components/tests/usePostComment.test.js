import * as redux from "react-redux";
import { waitFor, renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import usePostComment from '../../hooks/components/post/comment/usePostComment';
import { addComment } from '../../store/features/post';
import { usePostService } from '../../context/PostServiceContext';
import { useDispatch } from 'react-redux';


// Mocking react-redux and PostServiceContext modules
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../context/PostServiceContext.tsx', () => ({
  usePostService: () => ({
    postComment: jest.fn(),
  }),
}));

describe('usePostComment', () => {
  let mockDispatchFn, useDispatchSpy, mockPostService, consoleErrorSpy;

  beforeEach(() => {
    useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    mockPostService = require('../../context/PostServiceContext.tsx').usePostService();
    // Mock console.error
    consoleErrorSpy = jest.spyOn(console, 'error');
  });
  // afterEach(() => {
  //   useDispatchSpy.mockClear();
  // })
  it('should handle posting a comment', async () => {

    const { result } = renderHook(() => usePostComment());
    const mockComment = 'Test comment';
    const mockPostId = 1;
    mockPostService.postComment.mockResolvedValue(['comment1', 'comment2']);
    await waitFor(() => expect(result.current).toMatchObject({ handlePostComment: expect.any(Function), loading: false }));
    //await 처리시 loading 은 false가 됨. 처리안할시 true상태. *
    act(() => {
      result.current.handlePostComment(mockComment, mockPostId);
    });
    expect(result.current.loading).toBe(true);
    mockPostService.postComment.mockResolvedValue(['comment1', 'comment2']);
    await act(async () => {
      await result.current.handlePostComment(mockComment, mockPostId);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
