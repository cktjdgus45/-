import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PostCard from '../../pages/home/post/PostCard';

// 모의 post 데이터 생성, 실제 IPost 타입을 따라야 함
const mockPost = {
  id: 1,
  text: 'This is a post text',
  createdAt: '2021-01-01T00:00:00Z',
  name: 'John Doe',
  url: 'http://example.com/profile/johndoe',
  fileUrl: 'http://example.com/post/image.jpg',
  userId: 1,
  username: 'cktjdgus45',
  comments: [
    {
      id: 1,
      createdAt: '2021-01-01T00:00:00Z',
      name: '차성현',
      text: 'c1',
      url: 'http://example.com/profile/차성현',
      username: 'cktjdgus97',
    },
    {
      id: 2,
      createdAt: '2021-01-01T00:00:00Z',
      name: '포포',
      text: 'c2',
      url: 'http://example.com/profile/포포',
      username: 'popo97',
    },
  ],
};

// 테스트를 위한 mock store 생성
const mockStore = configureStore({
  reducer: {
    post: () => ({ posts: [mockPost] }), // post reducer의 초기 상태 설정
  },
});
const renderPostCard = () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <PostCard
          // @ts-ignore
          post={mockPost}
        />
      </MemoryRouter>
    </Provider>
  );
};
let mockUsePostCard;
describe('<PostCard />', () => {
  beforeEach(() => {
    mockUsePostCard = {
      comments: [
        {
          id: 1,
          createdAt: '2021-01-01T00:00:00Z',
          name: '차성현',
          text: 'c1',
          url: 'http://example.com/profile/차성현',
          username: 'cktjdgus97',
        },
        {
          id: 2,
          createdAt: '2021-01-01T00:00:00Z',
          name: '포포',
          text: 'c2',
          url: 'http://example.com/profile/포포',
          username: 'popo97',
        },
      ],
      isOpenCommentBox: false,
      setIsOpenCommentBox: jest.fn(),
      goProfilePage: jest.fn(),
      handleOpenCommentContainerBox: jest.fn(),
    };
    jest.spyOn(require('../../hooks/components/post/usePostCard'), 'default').mockReturnValue(mockUsePostCard);

  })
  //render PostAuthorProfile
  it('should call goProfilePage when author profile is clicked', () => {
    renderPostCard();
    // screen.debug(); console.log(DOM);
    fireEvent.click(screen.getByText(mockPost.name, { selector: '.cursor-pointer' }));
    expect(mockUsePostCard.goProfilePage).toHaveBeenCalled();
  });

  //render PostCardImage
  it('image element should have src set to post.fileUrl', () => {
    // @ts-ignore
    renderPostCard();
    const images = screen.getAllByRole('img');
    // post 이미지(fileUrl)를 찾는다. url x.
    // @ts-ignore
    const postImage = images.find(img => img.getAttribute('src') === mockPost.fileUrl);
    expect(postImage).toHaveAttribute('src', mockPost.fileUrl);
  });
  //render PostContent
  it('renders post content correctly', () => {
    renderPostCard();
    expect(screen.getByText(mockPost.text)).toBeInTheDocument();
    const authorNames = screen.getAllByText(mockPost.name);
    authorNames.forEach(nameElement => {
      expect(nameElement).toBeInTheDocument();
    });
  });

  //ConditionalRenderer - not render case
  it('does not render CommentInfo when comments is an empty array', () => {
    mockUsePostCard['comments'] = [];
    jest.spyOn(require('../../hooks/components/post/usePostCard'), 'default').mockReturnValue(mockUsePostCard);
    renderPostCard();
    const commentInfo = screen.queryByText(/댓글 \d+/i); //댓글 n개
    expect(commentInfo).not.toBeInTheDocument();
  });

  //ConditionalRenderer - render case
  it('renders CommentInfo when comments is not an empty array', () => {

    renderPostCard();
    const commentInfo = screen.getByText(/댓글 \d+/i);
    expect(commentInfo).toBeInTheDocument();
  });

  //render CommentForm
  it('renders CommentForm correctly', () => {
    renderPostCard();
    const commentFormInput = screen.getByPlaceholderText('댓글 추가...');
    expect(commentFormInput).toBeInTheDocument();
  });
  //ConditionalRenderer - not render case
  it('renders CommentContainerBox when isOpenCommentBox is true', () => {
    mockUsePostCard['isOpenCommentBox'] = true;
    jest.spyOn(require('../../hooks/components/post/usePostCard'), 'default').mockReturnValue(mockUsePostCard);
    renderPostCard();
    const commentContainerBox = screen.getByTestId('comment-container-box');
    expect(commentContainerBox).toBeInTheDocument();
  });
  //ConditionalRenderer - not render case
  it('does not render CommentContainerBox when isOpenCommentBox is false', () => {
    renderPostCard();
    const commentContainerBox = screen.queryByTestId('comment-container-box');
    expect(commentContainerBox).not.toBeInTheDocument();
  });
});

