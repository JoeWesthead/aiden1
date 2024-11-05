import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Tabs,
  Tab,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { FileText, Globe } from 'lucide-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`source-tabpanel-${index}`}
      aria-labelledby={`source-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface AddSourceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (source: any) => void;
}

export function AddSourceModal({ open, onClose, onAdd }: AddSourceModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [url, setUrl] = useState('');
  const [scanType, setScanType] = useState('single');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAdd({
        id: crypto.randomUUID(),
        name: file.name,
        type: 'PDF',
        lastUpdated: new Date(),
        status: 'Processing',
      });
      onClose();
    }
  };

  const handleUrlAdd = () => {
    if (url) {
      onAdd({
        id: crypto.randomUUID(),
        name: new URL(url).hostname,
        type: 'Website',
        lastUpdated: new Date(),
        status: 'Processing',
      });
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="subtitle1" component="div">
          Add Knowledge Source
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<FileText />} label="Upload File" />
          <Tab icon={<Globe />} label="Add URL" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Typography gutterBottom>
            Upload PDF documents, Word files, or other supported formats.
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
          </Button>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography gutterBottom>
            Add a website URL to include in your knowledge base.
          </Typography>
          <TextField
            fullWidth
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Globe size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <FormControl component="fieldset">
            <FormLabel component="legend">Scan Options</FormLabel>
            <RadioGroup
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
            >
              <FormControlLabel 
                value="single" 
                control={<Radio />} 
                label="Single page only"
              />
              <FormControlLabel 
                value="full" 
                control={<Radio />} 
                label="Scan entire website"
              />
            </RadioGroup>
          </FormControl>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeTab === 1 && (
          <Button 
            variant="contained" 
            onClick={handleUrlAdd}
            disabled={!url}
          >
            Add URL
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}