import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { switchPostDataLoadingStatus } from '../../../app/slices/postSilce';

import { fetchPostsData } from '../../../app/api/fetchPostsData';

import Preloader from '../../common/Preloader/Preloader';

import './postPage.scss';

// /. imports

const PostPage: React.FC = () => {

    const {
        postData,
        isPostDataLoading,
        fetchPostsErrMsg,
        status
    } = useAppSelector(state => state.postSilce);

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchPostsData());
    }, []);

    useEffect(() => {
        if (status === 'loading') {
            setTimeout(() => {
                dispatch(switchPostDataLoadingStatus(true));
            }, 2300);
        } else {
            setTimeout(() => {
                dispatch(switchPostDataLoadingStatus(false));
            }, 2300);
        }
    }, [status]);

    return (
        <div className="post-page">
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
                                )
                            })
                        }
                        {
                            !isPostDataLoading && fetchPostsErrMsg && <span className="error-message">Error: {fetchPostsErrMsg}</span>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default PostPage;
