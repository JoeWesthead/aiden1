import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import { Plus, Edit2, Trash2, Users, UserPlus } from 'lucide-react';

const teamMembers = [
  {
    name: 'AI Assistant',
    email: 'ai@assistant.ai',
    role: 'AI',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1675426513962-63c6022a8626?w=100', // AI-themed photo
    groups: ['All Teams']
  },
  { 
    name: 'Riley Carter',
    email: 'riley@email.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    groups: ['Customer Support', 'Management']
  },
  { 
    name: 'Alex Johnson',
    email: 'alex@email.com',
    role: 'Agent',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    groups: ['Sales Team']
  },
  { 
    name: 'Jordan Lee',
    email: 'jordan@email.com',
    role: 'Agent',
    status: 'Away',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    groups: ['Customer Support']
  },
  { 
    name: 'Sam Wilson',
    email: 'sam@email.com',
    role: 'Supervisor',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    groups: ['Technical Support', 'Management']
  }
];

const groups = [
  {
    name: 'Customer Support',
    description: 'Front-line customer service team',
    members: ['Riley Carter', 'Jordan Lee'],
    chatLimit: 3,
    status: 'Active'
  },
  {
    name: 'Sales Team',
    description: 'Product sales and demos',
    members: ['Alex Johnson'],
    chatLimit: 2,
    status: 'Active'
  },
  {
    name: 'Technical Support',
    description: 'Advanced technical assistance',
    members: ['Sam Wilson'],
    chatLimit: 4,
    status: 'Active'
  },
  {
    name: 'Management',
    description: 'Team supervisors and admins',
    members: ['Riley Carter', 'Sam Wilson'],
    chatLimit: 5,
    status: 'Active'
  }
];

export function TeamManagement() {
  const getStatusChip = (status: string) => (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: status === 'Active' ? 'success.light' : 'warning.light',
        color: status === 'Active' ? 'success.dark' : 'warning.dark',
        fontWeight: 500,
      }}
    />
  );

  const getRoleChip = (role: string) => (
    <Chip
      size="small"
      label={role}
      sx={{
        bgcolor: role === 'AI' ? 'secondary.main' : role === 'Admin' ? 'primary.main' : 'action.selected',
        color: role === 'AI' || role === 'Admin' ? 'primary.contrastText' : 'text.primary',
      }}
    />
  );

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Team Management
      </Typography>

      {/* Groups Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Groups
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Users size={18} />}
            size="small"
          >
            New Group
          </Button>
        </Box>

        <Paper sx={{ bgcolor: 'background.paper' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Chat Limit</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.name}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>{group.name}</Typography>
                    </TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarGroup max={3} sx={{ mr: 1 }}>
                          {group.members.map((member) => {
                            const teamMember = teamMembers.find(m => m.name === member);
                            return (
                              <Tooltip key={member} title={member}>
                                <Avatar
                                  src={teamMember?.avatar}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </Tooltip>
                            );
                          })}
                        </AvatarGroup>
                        <Typography variant="body2" color="text.secondary">
                          {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{group.chatLimit} chats</TableCell>
                    <TableCell>{getStatusChip(group.status)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit group">
                          <IconButton size="small">
                            <Edit2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove group">
                          <IconButton size="small" color="error">
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Team Members Section */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Team Members
          </Typography>
          <Button
            variant="contained"
            startIcon={<UserPlus size={18} />}
            size="small"
          >
            Add Team Member
          </Button>
        </Box>

        <Paper sx={{ bgcolor: 'background.paper' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Groups</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow 
                    key={member.email}
                    sx={member.role === 'AI' ? {
                      bgcolor: 'action.hover'
                    } : undefined}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={member.avatar} sx={{ width: 32, height: 32 }} />
                        {member.name}
                      </Box>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{getRoleChip(member.role)}</TableCell>
                    <TableCell>
                      {member.groups.map((group, index) => (
                        <Chip
                          key={index}
                          size="small"
                          label={group}
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>{getStatusChip(member.status)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit member">
                          <IconButton size="small">
                            <Edit2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove member">
                          <IconButton size="small" color="error">
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}