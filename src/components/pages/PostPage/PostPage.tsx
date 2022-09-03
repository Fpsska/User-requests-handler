import React from 'react';

import { useAppSelector } from '../../../app/hooks';

import Preloader from '../../common/Preloader/Preloader';

import './postPage.scss';

// /. imports

const PostPage: React.FC = () => {

    const {
        postData,
        isPostDataLoading,
        fetchPostsErrMsg
    } = useAppSelector(state => state.postSilce);

    return (
        <section className="post-page">
            <div className="post-page__wrapper">
                {isPostDataLoading
                    ? <div className="post-page__preloader"><Preloader /></div>
                    : <div className="posts">
                        {
                            postData.map(item => {
                                return (
                                    <ul className="post" key={item.id}>
                                        <li className="post__information">User ID: <span>{item.userId}</span></li>
                                        <li className="post__information">Title: <span>{item.title}</span></li>
                                        <li className="post__information">Body: <span>{item.body}</span></li>
                                    </ul>
                                );
                            })
                        }
                        {
                            !isPostDataLoading && fetchPostsErrMsg && <span className="error-message">Error: {fetchPostsErrMsg}</span>
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default PostPage;
