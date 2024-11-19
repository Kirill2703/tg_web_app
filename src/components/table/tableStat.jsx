import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../thunks/userThunk';
import LoadingScreen from '../loadingScreen/loadingScreen';

const TableStat = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (loading) {
        return <LoadingScreen />;
    }

     const sortedUsers = [...users].sort((a, b) => b.points - a.points);

    return (
        <div style={{margin: "0 20px"}}>
            <h2 className='header-table'>Table leaders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Points</th>
                        <th>Quizes</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.chatId}>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                            <td>{user.completedQuizzes.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableStat;
