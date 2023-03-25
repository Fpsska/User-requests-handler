import React, { useState, useEffect } from 'react';

import Preloader from 'components/ui/Preloader/Preloader';

import { useAppSelector } from 'app/hooks';

import './postPage.scss';

// /. imports

const PostPage: React.FC = () => {
    const { postData, isPostDataLoading, fetchPostsErrMsg } = useAppSelector(
        state => state.postSlice
    );

    const [isError, setErrorStatus] = useState<boolean>(false);

    // /. hooks

    useEffect(() => {
        if (!isPostDataLoading && fetchPostsErrMsg) {
            setErrorStatus(true);
        } else {
            setErrorStatus(false);
        }
    }, [isPostDataLoading, fetchPostsErrMsg]);

    // /. effects

    return (
        <section className="post-page">
            <div className="post-page__wrapper">
                {isPostDataLoading ? (
                    <div
                        className="post-page__preloader"
                        data-testid="preloader"
                    >
                        <Preloader />
                    </div>
                ) : isError ? (
                    <span
                        className="error-message"
                        data-tesid="error"
                    >
                        Error: {fetchPostsErrMsg}
                    </span>
                ) : (
                    <div
                        className="posts"
                        data-tesid="posts-container"
                    >
                        {postData.map(item => {
                            return (
                                <ul
                                    className="post"
                                    key={item.id}
                                    data-tesid="posts-list"
                                >
                                    <li className="post__information">
                                        User ID: <span>{item.userId}</span>
                                    </li>
                                    <li className="post__information">
                                        Title: <span>{item.title}</span>
                                    </li>
                                    <li className="post__information">
                                        Body: <span>{item.body}</span>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PostPage;
