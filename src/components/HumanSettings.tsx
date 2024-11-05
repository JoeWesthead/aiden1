import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  IconButton,
  Select,
  MenuItem,
  Chip,
  Divider,
  Checkbox,
  FormControl,
  FormGroup,
} from '@mui/material';
import { HelpCircle, Plus, Database, Globe } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { SettingSection } from './SettingSection';
import { Banner } from './Banner';
import { SkeletonLoader } from './SkeletonLoader';

const integrations = [
  { 
    name: 'Salesforce',
    type: 'CRM',
    options: ['Lead', 'Case', 'Contact'],
    fields: ['Name', 'Email', 'Company', 'Phone']
  },
  { 
    name: 'HubSpot',
    type: 'CRM',
    options: ['Contact', 'Company', 'Deal'],
    fields: ['Name', 'Email', 'Company', 'Website']
  },
  { 
    name: 'Zendesk',
    type: 'Helpdesk',
    options: ['Ticket', 'User', 'Organization'],
    fields: ['Name', 'Email', 'Subject', 'Priority']
  }
];

export function HumanSettings() {
  const { currentPreset, isLoading } = useConfig();
  const [enableCoBrowsing, setEnableCoBrowsing] = useState(true);
  const [enableTranslation, setEnableTranslation] = useState(false);
  const [shortcutType, setShortcutType] = useState('Any Type');
  const [integrationSettings, setIntegrationSettings] = useState({});

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const isBespokeConfig =
    currentPreset === 'Bespoke with Aiden' ||
    currentPreset === 'Bespoke without Aiden';

  const handleIntegrationChange = (integration: string, checked: boolean) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [integration]: checked ? { 
        enabled: true, 
        type: integrations.find(i => i.name === integration)?.options[0],
        fields: []
      } : undefined
    }));
  };

  const handleFieldChange = (integration: string, field: string, checked: boolean) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        fields: checked 
          ? [...(prev[integration]?.fields || []), field]
          : prev[integration]?.fields.filter(f => f !== field)
      }
    }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Tools
      </Typography>

      {isBespokeConfig && (
        <Banner
          title={
            <>
              Your chatbot has a <Link href="#">custom workflow</Link>.
            </>
          }
          description="Making changes may affect your custom workflow and impact you website experience, so not all settings are available."
          action="Speak to your account manager if you'd like to make changes."
        />
      )}

      <Box component="main" sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1 }}>
        <SettingSection id="customerInfo">
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Database size={20} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Customer Information
              </Typography>
              <IconButton size="small">
                <HelpCircle size={20} />
              </IconButton>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 3 }}>
              Pull outside customer information from
            </Typography>

            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              {integrations.map((integration) => (
                <Box key={integration.name} sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={!!integrationSettings[integration.name]}
                        onChange={(e) => handleIntegrationChange(integration.name, e.target.checked)}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{integration.name}</Typography>
                        <Chip size="small" label={integration.type} />
                      </Box>
                    }
                  />
                  
                  {integrationSettings[integration.name] && (
                    <Box sx={{ ml: 4, mt: 2 }}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                          size="small"
                          value={integrationSettings[integration.name].type}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            [integration.name]: { 
                              ...prev[integration.name], 
                              type: e.target.value 
                            }
                          }))}
                        >
                          {integration.options.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Fields to sync:
                      </Typography>
                      <FormGroup>
                        {integration.fields.map(field => (
                          <FormControlLabel
                            key={field}
                            control={
                              <Checkbox
                                size="small"
                                checked={integrationSettings[integration.name]?.fields?.includes(field)}
                                onChange={(e) => handleFieldChange(integration.name, field, e.target.checked)}
                              />
                            }
                            label={field}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>
          </Box>
        </SettingSection>

        <Divider sx={{ my: 4 }} />

        <SettingSection id="teamShortcuts">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Shortcuts
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Keyword</TableCell>
                  <TableCell>Expanded message</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No shortcuts have been added.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            disableElevation
            startIcon={<Plus size={18} />}
            size="small"
          >
            Add a Shortcut
          </Button>
        </SettingSection>

        <Divider sx={{ my: 4 }} />

        <SettingSection id="cobrowsing">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Co-browsing
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={enableCoBrowsing}
                onChange={(e) => setEnableCoBrowsing(e.target.checked)}
                size="small"
              />
            }
            label="Enable agents to co-browse with visitors and view their experience"
          />
        </SettingSection>

        <Divider sx={{ my: 4 }} />

        <SettingSection id="translation">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Globe size={20} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Real-time Translation
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={enableTranslation}
                onChange={(e) => setEnableTranslation(e.target.checked)}
                size="small"
              />
            }
            label="Enable real-time translation between visitors and agents"
          />
        </SettingSection>
      </Box>
    </Box>
  );
}