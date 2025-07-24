import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Typography from '@mui/material/Typography';
import Settings from "./pages/Settings.tsx"
import socket from './api/socket';
import { useEffect } from 'react';

function App() {

    useEffect(() => {
        socket.on('connect', () => {
            console.log('✅ WebSocket подключён');
        });

        socket.on('disconnect', () => {
            console.log('❌ WebSocket отключён');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/admin" element={<Typography>Админка</Typography>} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;