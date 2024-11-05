import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { X } from 'lucide-react';

interface PreviewProps {
  chatContent?: React.ReactNode;
}

export function Preview({ chatContent }: PreviewProps) {
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Preview
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4, letterSpacing: '0.1em' }}>
          TEST YOUR CHAT
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 4,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
            borderRadius: 1,
            position: 'relative',
            mb: 2
          }}>
            <Typography variant="h6">Chat with us</Typography>
            <Typography>How can we help?</Typography>
            <IconButton 
              sx={{ 
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'inherit'
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          <Box sx={{ 
            bgcolor: 'action.hover',
            p: 2,
            borderRadius: 1,
            width: 'fit-content',
            mb: 2
          }}>
            <Typography>Hello</Typography>
          </Box>

          <Box sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            p: 2,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography color="text.secondary">How can we help?</Typography>
          </Box>

          {chatContent}
        </Paper>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Pro tip
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4, letterSpacing: '0.1em' }}>
          TAKE FIVE.
        </Typography>

        <Typography sx={{ mb: 4 }}>
          An upload may take a few minutes to start affecting your
          human agent or AI agent experience.
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2, letterSpacing: '0.1em' }}>
          REFRESH.
        </Typography>

        <Typography>
          If you update your documents or website, you'll want to
          come back and upload new instances here as well.
        </Typography>
      </Box>
    </Box>
  );
}