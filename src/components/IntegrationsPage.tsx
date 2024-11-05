import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Tooltip,
  Alert,
} from '@mui/material';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

const connectedIntegrations = [
  {
    name: 'HubSpot CRM',
    status: 'Connected',
    type: 'CRM',
    lastSync: '2 minutes ago',
    logo: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg',
  },
];

const availableIntegrations = [
  {
    name: 'Salesforce',
    type: 'CRM',
    description: 'Sync contacts, deals, and activities',
    isPro: true,
    logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
  },
  {
    name: 'Zendesk',
    type: 'Helpdesk',
    description: 'Create and manage support tickets',
    isPro: false,
    logo: 'https://cdn.worldvectorlogo.com/logos/zendesk-1.svg',
  },
  {
    name: 'Zapier',
    type: 'Automation',
    description: 'Connect with 3000+ apps',
    isPro: true,
    logo: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
  },
  {
    name: 'Slate',
    type: 'CRM',
    description: 'Modern CRM for modern teams',
    isPro: true,
    logo: 'https://cdn.worldvectorlogo.com/logos/slate.svg',
  },
  {
    name: 'Freshdesk',
    type: 'Helpdesk',
    description: 'Streamline customer support',
    isPro: false,
    logo: 'https://cdn.worldvectorlogo.com/logos/freshdesk.svg',
  },
];

export function IntegrationsPage() {
  return (
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Integrations
      </Typography>

      {/* Connected Integrations */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Connected Integrations
      </Typography>

      <TableContainer 
        component={Paper} 
        sx={{ mb: 4, bgcolor: 'background.paper' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Integration</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Sync</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {connectedIntegrations.map((integration) => (
              <TableRow
                key={integration.name}
                sx={{ 
                  bgcolor: 'success.main',
                  '&:hover': { bgcolor: 'success.dark' },
                  '& > *': { color: 'success.contrastText' }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={integration.logo}
                      alt={integration.name}
                      sx={{ width: 24, height: 24, filter: 'brightness(0) invert(1)' }}
                    />
                    {integration.name}
                  </Box>
                </TableCell>
                <TableCell>{integration.type}</TableCell>
                <TableCell>
                  <Chip 
                    size="small"
                    label={integration.status}
                    sx={{ 
                      bgcolor: 'success.light',
                      color: 'success.contrastText',
                      borderColor: 'success.light'
                    }}
                  />
                </TableCell>
                <TableCell>{integration.lastSync}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit integration">
                      <IconButton size="small" sx={{ color: 'inherit' }}>
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove integration">
                      <IconButton size="small" sx={{ color: 'inherit' }}>
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

      {/* Available Integrations */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Available Integrations
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Integration</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableIntegrations.map((integration) => (
              <TableRow key={integration.name}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={integration.logo}
                      alt={integration.name}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {integration.name}
                      {integration.isPro && (
                        <Chip
                          label="Pro"
                          size="small"
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{integration.type}</TableCell>
                <TableCell>{integration.description}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    disabled={integration.isPro}
                  >
                    Set up
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}