export interface Ipost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface IpostSilce {
    fetchPostsStatus: string;
    fetchPostsErrMsg: string | null;
    isPostDataLoading: boolean;
    postData: Ipost[];
}
