import {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    checkUserService,
    checkWebSocketConnection,
    checkOrderService, checkRouteService
} from '../services/connectionService';
import CircularProgress from '@mui/material/CircularProgress';

interface ConnectionRow {
    label: string;
    protocol: string;
    connected: boolean;
}

export default function Settings() {

    const [statuses, setStatuses] = useState<ConnectionRow[]>([
        {label: 'Фронт → user-service', protocol: 'REST', connected: false},
        {label: 'Фронт → order-service', protocol: 'REST', connected: false},
        {label: 'Фронт → route-service', protocol: 'REST', connected: false},
        {label: 'notification-service → Фронт', protocol: 'WebSocket', connected: false},
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        setIsLoading(true);

        try {
            console.log('Обновление статусов...');
            const restToUser = await checkUserService();
            const restToOrder = await checkOrderService();
            const restToRoute = await checkRouteService();
            const wsFromNotif = await checkWebSocketConnection();

            setStatuses(prev =>
                prev.map(row => {
                    if (row.label === 'Фронт → user-service') return {...row, connected: restToUser};
                    if (row.label === 'Фронт → order-service') return {...row, connected: restToOrder};
                    if (row.label === 'Фронт → route-service') return {...row, connected: restToRoute};
                    if (row.label === 'notification-service → Фронт') return {...row, connected: wsFromNotif};
                    return row;
                })
            );
            console.log('Обновление статусов завершено');
        } catch (error) {
            console.error('Ошибка при обновлении статусов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const groupedStatuses: { title: string; items: ConnectionRow[] }[] = [
        {
            title: 'Взаимодействие сервисов',
            items: statuses.slice(0, 4)
        }
    ];

    return (
        <Box sx={{mt: 4}}>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h5">Статус соединений</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    {isLoading && <CircularProgress size={20}/>}
                    <IconButton onClick={handleRefresh} color="primary" disabled={isLoading}>
                        <RefreshIcon/>
                    </IconButton>
                </Box>
            </Box>

            <Paper variant="outlined" sx={{p: 2}}>
                <Box sx={{overflowX: 'auto'}}>
                    {groupedStatuses.map((group, index) => (
                        <Box key={index} sx={{mb: 4}}>
                            <Typography variant="h6" gutterBottom>
                                {group.title}
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{width: '35%'}}><strong>Сервис</strong></TableCell>
                                        {/*<TableCell sx={{width: '20%'}}><strong>Протокол</strong></TableCell>*/}
                                        <TableCell sx={{width: '10%', pl: 2}}
                                                   align="center"><strong>Индикация</strong></TableCell>
                                        <TableCell sx={{width: '35%'}}><strong>Статус</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {group.items.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell sx={{width: '35%'}}>{row.label}</TableCell>
                                            {/*<TableCell sx={{width: '20%'}}>{row.protocol}</TableCell>*/}
                                            <TableCell align="center" sx={{pl: 2, width: '10%'}}>
                                                <CircleIcon
                                                    sx={{fontSize: 14, color: row.connected ? 'green' : 'red'}}/>
                                            </TableCell>
                                            <TableCell sx={{width: '35%'}}>
                                                {row.connected ? 'Соединение установлено' : 'Нет соединения'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}