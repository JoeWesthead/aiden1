import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from '@mui/material';
import { HelpCircle, Upload } from 'lucide-react';
import { Preview } from './Preview';
import { SettingSection } from './SettingSection';
import { Banner } from './Banner';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from './SkeletonLoader';

export function AISettings() {
  const { currentPreset, isLoading } = useConfig();
  const [agentName, setAgentName] = useState('Your AI Assistant');
  const [tone, setTone] = useState('Professional, courteous');

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (currentPreset === 'Classic Olark') {
    return (
      <Box sx={{ p: 4, bgcolor: 'background.default' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Robots
        </Typography>
        <Banner
          title="Your current chatbot doesn't use AI."
          description="Switch to the Aiden configuration and try it out before turning it live on your site."
          action={
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
            >
              Try Aiden
            </Button>
          }
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 4,
          overflow: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Robots
        </Typography>

        <SettingSection id="botDisplayName">
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI Agent Name
              </Typography>
              <IconButton size="small">
                <HelpCircle size={20} />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              size="small"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              sx={{ maxWidth: 400 }}
            />
          </Box>
        </SettingSection>

        <SettingSection id="botAvatar">
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI Agent Avatar
              </Typography>
              <IconButton size="small">
                <HelpCircle size={20} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{ 
                  width: 64, 
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'action.hover'
                }}
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<Upload size={18} />}
              >
                Choose a File
              </Button>
            </Box>
          </Box>
        </SettingSection>

        {currentPreset !== 'Bespoke without Aiden' && (
          <SettingSection id="botToneInstructions">
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  AI Agent Conversational Tone
                </Typography>
                <IconButton size="small">
                  <HelpCircle size={20} />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                sx={{ maxWidth: 400 }}
              />
            </Box>
          </SettingSection>
        )}
      </Box>

      <Preview />
    </Box>
  );
}