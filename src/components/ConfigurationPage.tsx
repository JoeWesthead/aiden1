import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import { HelpCircle, Copy, Edit, List, Check } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { configOptions } from '../config/settingsConfig';

export function ConfigurationPage() {
  const { activeConfig, setActiveConfig } = useConfig();
  const [selectedConfig, setSelectedConfig] = useState(activeConfig);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const siteId = '6982-24-10-2002';
  const installCode = `<!-- Begin Chat Widget -->
<script type="text/javascript">
  ;(function(o,l,a,r,k){
    o.olark||(k=o.olark=function(){k.s.push(arguments);});
    k.s=[];k.site='${siteId}';
    a=l.createElement('script');
    a.async=1;a.src='//'+r;
    l.getElementsByTagName('head')[0].appendChild(a);
  })(window,document,'static.olark.com/jsclient/loader.js');
</script>
<!-- End Chat Widget -->`;

  const configurations = configOptions.map(config => ({
    name: config,
    active: activeConfig === config,
    humans: config === 'Classic Olark' || config.includes('Aiden'),
    aiAgent: config.includes('Aiden'),
    lastActive: activeConfig === config ? 'Now' : 'Never',
    knowledge: 'Not configured',
  }));

  const handleMakeActive = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmChange = () => {
    setActiveConfig(selectedConfig);
    setConfirmDialogOpen(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(installCode);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Configurations & Installation
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="subtitle1">Current Configuration:</Typography>
          <Select
            value={selectedConfig}
            onChange={(e) => setSelectedConfig(e.target.value as typeof configOptions[number])}
            size="small"
            sx={{ minWidth: 200 }}
          >
            {configOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option} {option === activeConfig && '(Active)'}
              </MenuItem>
            ))}
          </Select>
          <Button 
            variant="contained"
            onClick={handleMakeActive}
            disabled={selectedConfig === activeConfig}
            size="small"
          >
            Make Active
          </Button>
        </Box>
        <Typography sx={{ color: 'error.main' }}>
          ! Your code is not currently installed on a live website.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Your Versions
          </Typography>
          <IconButton size="small">
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Active</TableCell>
                <TableCell>Configuration</TableCell>
                <TableCell>Humans</TableCell>
                <TableCell>AI Agent</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Knowledge Source</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configurations.map((config) => (
                <TableRow key={config.name}>
                  <TableCell>{config.active ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{config.name}</TableCell>
                  <TableCell>{config.humans ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{config.aiAgent ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{config.lastActive}</TableCell>
                  <TableCell>{config.knowledge}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <Edit size={18} />
                      </IconButton>
                      <IconButton size="small">
                        <List size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          size="small"
        >
          Add a configuration
        </Button>
      </Box>

      {/* Installation Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Installation
          </Typography>
          <IconButton size="small">
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Site ID
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="mono" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {siteId}
              </Typography>
              <IconButton size="small" onClick={() => {
                navigator.clipboard.writeText(siteId);
                setCopySuccess(true);
              }}>
                <Copy size={16} />
              </IconButton>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            Add this code to your website's HTML, just before the closing &lt;/body&gt; tag.
          </Alert>

          <Box sx={{ position: 'relative' }}>
            <TextField
              multiline
              fullWidth
              value={installCode}
              InputProps={{
                readOnly: true,
                sx: { 
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  bgcolor: 'action.hover'
                }
              }}
              minRows={8}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCopyCode}
              startIcon={<Copy size={16} />}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              Copy Code
            </Button>
          </Box>
        </Paper>

        <Typography variant="subtitle2" color="text.secondary">
          Need help installing? Check out our{' '}
          <Link href="#" underline="hover">installation guide</Link> or{' '}
          <Link href="#" underline="hover">contact support</Link>.
        </Typography>
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm Configuration Change
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change your active configuration from <strong>{activeConfig}</strong> to <strong>{selectedConfig}</strong>?
          </Typography>
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>
            This will update your chat widget's behavior and may affect how it interacts with your visitors.
            The change will take effect immediately.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} size="small">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmChange} 
            variant="contained"
            size="small"
          >
            Confirm Change
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
}