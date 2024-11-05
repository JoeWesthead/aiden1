import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Link,
  InputAdornment,
} from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { Preview } from './Preview';

const primaryColors = ['#7C3AED', '#2563EB', '#DC2626', '#F59E0B', '#111827', '#6B7280'];
const secondaryColors = ['#2563EB', '#E5E7EB', '#22C55E'];

export function ChatAppearance() {
  const [language, setLanguage] = useState('English (United States)');
  const [primaryColor, setPrimaryColor] = useState('#7C3AED');
  const [secondaryColor, setSecondaryColor] = useState('#2563EB');
  const [hideMobile, setHideMobile] = useState(false);

  const ColorButton = ({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) => (
    <Box
      onClick={onClick}
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'pointer',
        border: selected ? '2px solid #000' : '1px solid #E5E7EB',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    />
  );

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
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Chat Appearance
        </Typography>

        {/* Chat Language */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Chat Language
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
          >
            <MenuItem value="English (United States)">English (United States)</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </Box>

        {/* Primary Theme Color */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Primary Theme Color
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Enter a hex value or use one of these WCAG 2.1 AA accessible colors.
          </Typography>

          <TextField
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            sx={{ maxWidth: 200, mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            {primaryColors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                selected={color === primaryColor}
                onClick={() => setPrimaryColor(color)}
              />
            ))}
          </Box>
        </Box>

        {/* Secondary Color */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Secondary Color
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Enter a hex value or use one of these WCAG 2.1 AA accessible colors.
          </Typography>

          <TextField
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            sx={{ maxWidth: 200, mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            {secondaryColors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                selected={color === secondaryColor}
                onClick={() => setSecondaryColor(color)}
              />
            ))}
          </Box>
        </Box>

        {/* Display Customizations */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Display Customizations
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            For custom button text, widget position, background, and more:
          </Typography>

          <Link href="#" sx={{ color: '#2563EB', textDecoration: 'none' }}>
            Use our JavaScript API
          </Link>
        </Box>

        {/* Mobile Chat Widget */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Mobile Chat Widget
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={hideMobile}
                onChange={(e) => setHideMobile(e.target.checked)}
              />
            }
            label="Hide Chat on Mobile"
          />
        </Box>
      </Box>

      <Preview />
    </Box>
  );
}