export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUser = {
    id: string;
    password: string;
    name: string;
    username: string;
    email: string;
    url: string;
    token: string;
};
export type INewUser = {
    id: string;
    password: string;
    name: string;
    username: string;
    email: string;
    url: string;
    token: string;
};

// export type INewUser = {
//     name: string;
//     email: string;
//     username: string;
//     password: string;
// };

export type IAuthHandler = {
    login: (username: any, password: any) => Promise<void>;
    logout: () => Promise<void>;
    signUp: (username: any, password: any, name: any, email: any, url: any) => Promise<void>;
    user: IAuthorizedUser | undefined;
}

export type IAuthorizedUser = {
    token: string;
    username: string;
}