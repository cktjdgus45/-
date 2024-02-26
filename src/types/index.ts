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

export type INewUser = {
    id: string;
    password: string;
    name: string;
    username: string;
    email: string;
    url: string;
    token: string;
};


export type IAuthHandler = {
    login: (username: any, password: any) => Promise<void>;
    logout: () => Promise<void>;
    signUp: (username: any, password: any, passwordCheck: any, name: any, email: any, url: any) => Promise<void>
    user: IAuthorizedUser | undefined;
    error: {
        error: string;
        onError: (error: any) => void;
    }
    update: (username: string, file: File | undefined, existUrl: string) => Promise<void>;
}

export type IAuthorizedUser = {
    token: string;
    user: IUser;
}

export type IUser = {
    name: string;
    url: string;
    username: string;
}

export type IPost = {
    id: number;
    text: string;
    createdAt: string;
    userId: number;
    username: string;
    name: string;
    url: string;
    fileUrl: string;
    comments: IComment[];
}


export type IComment = {
    id: number;
    createdAt: string;
    name: string;
    text: string;
    url: string;
    username: string;
}
