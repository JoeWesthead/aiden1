import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { KnowledgeBase } from './components/KnowledgeBase';
import { HumanSettings } from './components/HumanSettings';
import { ChatAppearance } from './components/ChatAppearance';
import { AISettings } from './components/AISettings';
import { BeforeAfterChat } from './components/BeforeAfterChat';
import { ConfigurationPage } from './components/ConfigurationPage';
import { TeamManagement } from './components/TeamManagement';
import { IntegrationsPage } from './components/IntegrationsPage';
import { BasicPage } from './components/BasicPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/knowledge" element={<KnowledgeBase />} />
      <Route path="/human-settings" element={<HumanSettings />} />
      <Route path="/chat-appearance" element={<ChatAppearance />} />
      <Route path="/ai-settings" element={<AISettings />} />
      <Route path="/chat-settings" element={<BeforeAfterChat />} />
      <Route path="/configuration" element={<ConfigurationPage />} />
      <Route path="/team" element={<TeamManagement />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/billing" element={<BasicPage title="Plan & Billing" />} />
      <Route path="/inbox" element={<BasicPage title="Open Inbox" />} />
      <Route path="/reporting" element={<BasicPage title="Reporting" />} />
      <Route path="/transcripts" element={<BasicPage title="Transcripts" />} />
      <Route path="/scenarios" element={<BasicPage title="Scenarios" />} />
      <Route path="/sources" element={<BasicPage title="Sources" />} />
      <Route path="/tags" element={<BasicPage title="Tags" />} />
      <Route path="/stock-phrases" element={<BasicPage title="Stock Phrases" />} />
      <Route path="/fields" element={<BasicPage title="Fields" />} />
    </Routes>
  );
}