import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Divider,
  Stack,
} from '@mui/material';
import { HelpCircle, Plus, Edit2, Trash2, FormInput } from 'lucide-react';
import { Preview } from './Preview';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from './SkeletonLoader';
import { KnowledgeSourceModal } from './KnowledgeSourceModal';
import { AddSourceModal } from './AddSourceModal';

const initialSources = [
  {
    id: '1',
    name: 'Product Documentation.pdf',
    type: 'PDF',
    lastUpdated: new Date('2024-03-10'),
    status: 'Ready',
  },
  {
    id: '2',
    name: 'company.com/docs',
    type: 'Website',
    lastUpdated: new Date('2024-03-12'),
    status: 'Processing',
  },
  {
    id: '3',
    name: 'Customer Database',
    type: 'Database',
    lastUpdated: new Date('2024-03-15'),
    status: 'Error',
  },
];

const fields = [
  { id: '1', name: 'Name', type: 'text', required: true },
  { id: '2', name: 'Email', type: 'email', required: true },
  { id: '3', name: 'Company', type: 'text', required: false },
];

const stockAnswers = [
  {
    id: '1',
    question: 'What are your business hours?',
    answer: 'We are open Monday through Friday, 9 AM to 6 PM EST.',
  },
  {
    id: '2',
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
  },
];

export function KnowledgeBase() {
  const { isLoading } = useConfig();
  const [sources, setSources] = useState(initialSources);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const handleSaveSources = (newSources: typeof initialSources) => {
    setSources(newSources);
    setIsSourceModalOpen(false);
  };

  const handleAddSource = (newSource: typeof initialSources[0]) => {
    setSources([...sources, newSource]);
    setIsAddSourceModalOpen(false);
  };

  const getStatusChip = (status: string) => {
    const statusColors = {
      Ready: 'success',
      Processing: 'warning',
      Error: 'error',
    } as const;

    return (
      <Chip
        size="small"
        label={status}
        color={statusColors[status as keyof typeof statusColors]}
      />
    );
  };

  const renderQuestions = () => (
    <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockAnswers.map((qa) => (
            <TableRow key={qa.id}>
              <TableCell>{qa.question}</TableCell>
              <TableCell>{qa.answer}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton size="small">
                    <Edit2 size={18} />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Box flex={1} p={4} overflow="auto">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Resources
        </Typography>

        <Typography sx={{ mb: 4 }}>
          This is how we teach your agents (AI or human) about your business.
        </Typography>

        {/* Knowledge Sources Section */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          Knowledge Sources
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 3 }} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>{source.name}</TableCell>
                  <TableCell>{source.type}</TableCell>
                  <TableCell>
                    {source.lastUpdated.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusChip(source.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={2} sx={{ mb: 6 }}>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => setIsSourceModalOpen(true)}
          >
            Manage sources
          </Button>
          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={() => setIsAddSourceModalOpen(true)}
          >
            Add source
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Stock Answers Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Stock Answers
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          {renderQuestions()}

          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            size="small"
          >
            Add Answer
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Fields Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Fields
            </Typography>
            <IconButton size="small">
              <HelpCircle size={20} />
            </IconButton>
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>{field.type}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={field.required ? 'Required' : 'Optional'}
                        color={field.required ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton size="small">
                          <Edit2 size={18} />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Trash2 size={18} />
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
            startIcon={<FormInput size={18} />}
            size="small"
          >
            Add Field
          </Button>
        </Box>
      </Box>

      <Preview />

      <KnowledgeSourceModal
        open={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        onSave={handleSaveSources}
        initialSources={sources}
      />

      <AddSourceModal
        open={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        onAdd={handleAddSource}
      />
    </Box>
  );
}