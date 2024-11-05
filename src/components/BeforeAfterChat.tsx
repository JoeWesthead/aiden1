import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Chip,
  Button,
  TextField,
  IconButton,
  Paper,
  Checkbox,
  Divider,
} from '@mui/material';
import { HelpCircle, Plus, Building2, Workflow, Mail, MessageSquare } from 'lucide-react';
import { Preview } from './Preview';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from './SkeletonLoader';

const availableFields = [
  'Name',
  'Email',
  'Phone',
  'Company',
  'Role',
  'Department',
  'Message',
];

const groups = [
  'Customer Support',
  'Sales Team',
  'Technical Support',
  'Management',
];

const integrations = [
  { name: 'HubSpot', type: 'CRM', options: ['Lead', 'Contact'] },
  { name: 'Salesforce', type: 'CRM', options: ['Lead', 'Case'] },
  { name: 'Zendesk', type: 'Helpdesk', options: ['Ticket'] },
];

export function BeforeAfterChat() {
  const { isLoading } = useConfig();
  const [routingGroup, setRoutingGroup] = useState('Customer Support');
  const [distributionMethod, setDistributionMethod] = useState('all');
  const [chatLimit, setChatLimit] = useState(3);
  const [followUpEmail, setFollowUpEmail] = useState('support@company.com');
  const [transcriptEmail, setTranscriptEmail] = useState('records@company.com');
  const [preFields, setPreFields] = useState(['Name', 'Email']);
  const [postFields, setPostFields] = useState(['Email']);
  const [integrationSettings, setIntegrationSettings] = useState({});

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const SettingHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Icon size={20} />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <IconButton size="small">
        <HelpCircle size={16} />
      </IconButton>
    </Box>
  );

  const handleIntegrationChange = (integration: string, checked: boolean) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [integration]: checked ? { enabled: true, type: integrations.find(i => i.name === integration)?.options[0] } : undefined
    }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Ground Rules
      </Typography>

      <Typography sx={{ mb: 4, color: 'text.secondary' }}>
        Set default behaviors for when your AI doesn't override these settings.
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        {/* Routing Settings */}
        <Box sx={{ mb: 4 }}>
          <SettingHeader icon={Building2} title="Default Routing" />
          <FormControl fullWidth sx={{ maxWidth: 400 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Route chats to
            </Typography>
            <Select
              value={routingGroup}
              onChange={(e) => setRoutingGroup(e.target.value)}
              size="small"
            >
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Distribution method
            </Typography>
            <RadioGroup
              value={distributionMethod}
              onChange={(e) => setDistributionMethod(e.target.value)}
            >
              <FormControlLabel
                value="all"
                control={<Radio size="small" />}
                label="All agents"
              />
              <FormControlLabel
                value="sequential"
                control={<Radio size="small" />}
                label="One agent at a time"
              />
            </RadioGroup>
            
            {distributionMethod === 'sequential' && (
              <Box sx={{ ml: 4, mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Chat limit per agent
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={chatLimit}
                  onChange={(e) => setChatLimit(Number(e.target.value))}
                  sx={{ width: 80 }}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Follow-ups */}
        <Box sx={{ mb: 4 }}>
          <SettingHeader icon={Mail} title="Follow-ups" />
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Contact my team for follow-ups at
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              value={followUpEmail}
              onChange={(e) => setFollowUpEmail(e.target.value)}
              sx={{ maxWidth: 400 }}
            />
          </Box>

          {integrations.map((integration) => (
            <Box key={integration.name} sx={{ mb: 1 }}>
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
                <Box sx={{ ml: 4, mt: 1 }}>
                  <Select
                    size="small"
                    value={integrationSettings[integration.name].type}
                    onChange={(e) => setIntegrationSettings(prev => ({
                      ...prev,
                      [integration.name]: { ...prev[integration.name], type: e.target.value }
                    }))}
                  >
                    {integration.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </Box>
          ))}

          <Button
            startIcon={<Plus size={16} />}
            size="small"
            sx={{ mt: 1 }}
          >
            Add another follow-up destination
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Transcripts */}
        <Box sx={{ mb: 4 }}>
          <SettingHeader icon={MessageSquare} title="Transcripts" />
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Store transcript copies for my team at
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              value={transcriptEmail}
              onChange={(e) => setTranscriptEmail(e.target.value)}
              sx={{ maxWidth: 400 }}
            />
          </Box>

          {integrations.map((integration) => (
            <Box key={integration.name} sx={{ mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={!!integrationSettings[`${integration.name}_transcript`]}
                    onChange={(e) => handleIntegrationChange(`${integration.name}_transcript`, e.target.checked)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>{integration.name}</Typography>
                    <Chip size="small" label={integration.type} />
                  </Box>
                }
              />
              {integrationSettings[`${integration.name}_transcript`] && (
                <Box sx={{ ml: 4, mt: 1 }}>
                  <Select
                    size="small"
                    value={integrationSettings[`${integration.name}_transcript`].type}
                    onChange={(e) => setIntegrationSettings(prev => ({
                      ...prev,
                      [`${integration.name}_transcript`]: { ...prev[`${integration.name}_transcript`], type: e.target.value }
                    }))}
                  >
                    {integration.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </Box>
          ))}

          <Button
            startIcon={<Plus size={16} />}
            size="small"
            sx={{ mt: 1 }}
          >
            Add another system-of-record destination
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Pre-chat Fields */}
        <Box sx={{ mb: 4 }}>
          <SettingHeader icon={Workflow} title="Required Fields" />
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Collect these fields before the conversation starts
          </Typography>

          {availableFields.map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  size="small"
                  checked={preFields.includes(field)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreFields([...preFields, field]);
                    } else {
                      setPreFields(preFields.filter(f => f !== field));
                    }
                  }}
                />
              }
              label={field}
            />
          ))}

          <Button
            startIcon={<Plus size={16} />}
            size="small"
            sx={{ mt: 1, display: 'block' }}
          >
            Select another from list
          </Button>
        </Box>

        {/* Post-chat Fields */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Collect these fields when the conversation ends
          </Typography>

          {availableFields.map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  size="small"
                  checked={postFields.includes(field)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPostFields([...postFields, field]);
                    } else {
                      setPostFields(postFields.filter(f => f !== field));
                    }
                  }}
                />
              }
              label={field}
            />
          ))}

          <Button
            startIcon={<Plus size={16} />}
            size="small"
            sx={{ mt: 1, display: 'block' }}
          >
            Select another from list
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}