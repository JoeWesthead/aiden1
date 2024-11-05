import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Avatar,
  Menu,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Palette, 
  Settings, 
  Brain, 
  Bot,
  Wrench,
  Inbox,
  BarChart2,
  FileText,
  Puzzle,
  CreditCard,
  User,
  LogOut,
  UserPlus,
  MoreVertical,
  Power,
  Moon,
  Sun,
  Users,
  Scroll,
  Workflow,
  Database,
  Tags,
  MessageSquare,
  FormInput
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { configOptions } from '../config/settingsConfig';

const DRAWER_WIDTH = 280;

const configItems = [
  { icon: Brain, text: 'Resources', path: '/knowledge' },
  { icon: Bot, text: 'Robots', path: '/ai-settings' },

  // { icon: Workflow, text: 'Scenarios', path: '/scenarios' },
  // { icon: Database, text: 'Sources', path: '/sources' },
  // { icon: Tags, text: 'Tags', path: '/tags' },
  // { icon: MessageSquare, text: 'Stock Phrases', path: '/stock-phrases' },
  // { icon: FormInput, text: 'Fields', path: '/fields' },
];

const menuItems = [
  { icon: Palette, text: 'Appearance', path: '/chat-appearance' },
  { icon: Scroll, text: 'Ground Rules', path: '/chat-settings', tooltip: 'Previously "Before and After"' },
  { icon: Wrench, text: 'Tools', path: '/human-settings' },
  { icon: Puzzle, text: 'Integrations', path: '/integrations' },
  { icon: Users, text: 'Team', path: '/team' },
    { icon: Power, text: 'Deploy', path: '/configuration' },
  { icon: CreditCard, text: 'Billing', path: '/billing' },
];

const managementItems = [
  { icon: Inbox, text: 'Open Inbox', path: '/inbox' },
  { icon: BarChart2, text: 'Reporting', path: '/reporting' },
  { icon: FileText, text: 'Transcripts', path: '/transcripts' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPreset, setCurrentPreset } = useConfig();
  const { mode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSelected = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <svg
          viewBox="0 0 1047.9 531"
          style={{ width: 120, height: 60 }}
          fill="currentColor"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M153.6,340.5c-23.7,2-45.9-1.6-66.7-11c-20.8-9.6-37.9-23.7-51.2-42.2c-13.1-18.9-20.8-40.7-22.9-65.6s1.8-47.6,11.6-68.2c10.1-20.8,24.5-37.6,43.4-50.2s40.3-20.1,63.9-22.1c23.9-2,46.1,1.6,66.7,11c20.8,9.3,37.7,23.4,50.9,42.3c13.1,18.7,20.8,40.4,22.9,65.3s-1.8,47.7-11.6,68.5c-9.8,20.6-24.1,37.4-43.1,50.2C198.6,331.1,177.3,338.5,153.6,340.5z M148.1,275.2c17.9-1.5,31.6-8.6,40.9-21.1c9.6-12.7,13.4-28.7,11.8-48.4c-1.7-20.1-8.3-35.4-19.7-46c-11.3-10.9-25.9-15.6-43.8-14.1c-18.1,1.5-31.9,8.6-41.2,21.1C86.8,179,83,195.3,84.7,215.3c1.7,19.8,8.2,35.2,19.4,46C115.2,272.2,130,276.7,148.1,275.2z"/>
        </svg>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <List dense>
          <ListItem disablePadding>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>AI Preset</InputLabel>
              <Select
                value={currentPreset}
                label="Configuration"
                onChange={(e) => setCurrentPreset(e.target.value as typeof configOptions[number])}
              >
                {configOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <List dense>
            {configItems.map((item) => {
              const Icon = item.icon;
              const selected = isSelected(item.path);
              return (
                <ListItem key={item.text} disablePadding>
                  <Tooltip title={item.tooltip || ''} placement="right">
                    <ListItemButton 
                      onClick={() => navigate(item.path)}
                      selected={selected}
                      sx={{ 
                        borderRadius: 1,
                        mb: 0.5,
                        pl: 4,
                      }}
                    >
                      <ListItemIcon>
                        <Icon size={20} />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Account Settings
        </Typography>
        <List dense>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const selected = isSelected(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={item.tooltip || ''} placement="right">
                  <ListItemButton 
                    onClick={() => navigate(item.path)}
                    selected={selected}
                    sx={{ 
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Chat Management Tools
        </Typography>
        <List dense>
          {managementItems.map((item) => {
            const Icon = item.icon;
            const selected = isSelected(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={item.tooltip || ''} placement="right">
                  <ListItemButton 
                    onClick={() => navigate(item.path)}
                    selected={selected}
                    sx={{ 
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      <Box>
        <ListItem
          secondaryAction={
            <IconButton edge="end" onClick={handleMenuOpen}>
              <MoreVertical size={20} />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              sx={{ width: 32, height: 32 }}
            />
          </ListItemIcon>
          <ListItemText 
            primary="Riley Carter"
            secondary="riley@email.com"
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItem>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <UserPlus size={20} />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={() => {
          toggleTheme();
          handleMenuClose();
        }}>
          <ListItemIcon>
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </ListItemIcon>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Drawer>
  );
}