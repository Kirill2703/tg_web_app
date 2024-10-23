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

    return (
        <div>
            <h2>Турнирная таблица</h2>
            <table>
                <thead>
                    <tr>
                        <th>Имя пользователя</th>
                        <th>Очки</th>
                        <th>Пройденные квизы</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
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
