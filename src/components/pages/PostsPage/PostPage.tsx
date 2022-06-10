import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import './postPage.scss';

// /. imports

const PostPage: React.FC = () => {

    const { postData } = useAppSelector(state => state.postSilce);

    const dispatch = useAppDispatch();

    return (
        <div className="post-page">
            <div className="post-page__wrapper">
                <div className="posts">
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
                </div>
            </div>
        </div>
    );
};

export default PostPage;
