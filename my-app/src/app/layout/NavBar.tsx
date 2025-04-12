import { List, Badge, AppBar, Typography, Toolbar, IconButton, ListItem, Box } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]
const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    ml: 2,
    typography: 'h6',
    '&.active': {
        color: 'yellow'
    }
}

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}
export default function NavBar({darkMode, toggleDarkMode}: Props) {
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: darkMode ? '#121212' : '#1976d2', alignitems: 'center' }}>
                <Box display='flex' alignItems='center'>
                <Typography component={NavLink} sx={navStyles} to='/' variant='h6'>Aduwe</Typography>
                <IconButton onClick={toggleDarkMode}>
                    {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                </IconButton>
                </Box>
                
                <List sx={{ display: 'flex', ml: 'auto' }}>
                    {midLinks.map(({title, path}) => (
                   <ListItem
                   component={NavLink}
                   to={path}
                   key={path}
                     sx= {navStyles}
             > 
                    {title.toUpperCase()}
                   </ListItem>             
                ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton size="large" sx={{color: 'inherit', ml: 1}}>
                    <Badge badgeContent={4} color="secondary" />
                        <ShoppingCart />
                </IconButton>
                </Box>
            
                 <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({title, path}) => (
                   <ListItem
                   component={NavLink}
                   to={path}
                   key={path}
                     sx={navStyles}
             > 
                    {title.toUpperCase()}
                   </ListItem>             
                ))}
                </List>
            </Toolbar>
        </AppBar>
    );
}