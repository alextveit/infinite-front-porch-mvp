import React, { useState } from 'react';
import { MessageCircle, Database, Users, Settings, Brain, Cloud, Cpu, Lock, Share2, Download } from 'lucide-react';

// Mock data representing Tamarack's knowledge base
const mockKnowledgeBase = {
  caseStudies: [
    {
      id: "cs-001",
      title: "Collective Impact in Calgary: Ending Poverty Through Cross-Sector Collaboration",
      community: "Calgary, AB",
      topics: ["poverty reduction", "collective impact", "cross-sector collaboration"],
      summary: "How Calgary's Enough for All initiative brought together 50+ organizations to reduce poverty through coordinated action.",
      dateCreated: "2023-08-15",
      contributors: ["Liz Weaver", "Community Partners"]
    },
    {
      id: "cs-002", 
      title: "Asset-Based Community Development in Rural Ontario",
      community: "Stratford, ON",
      topics: ["ABCD", "rural development", "community assets"],
      summary: "Stratford's approach to identifying and mobilizing community assets for local economic development.",
      dateCreated: "2023-06-10",
      contributors: ["Heather Keam", "Local Champions"]
    },
    {
      id: "cs-003",
      title: "Youth-Led Climate Action in Indigenous Communities",
      community: "Various First Nations",
      topics: ["climate action", "youth engagement", "Indigenous leadership"],
      summary: "How Indigenous youth are leading climate resilience initiatives in their communities.",
      dateCreated: "2023-09-22",
      contributors: ["Sav (Senior Community Animator)", "Youth Leaders"]
    }
  ],
  frameworks: [
    {
      id: "fw-001",
      title: "Collective Impact Framework",
      description: "Five conditions for successful cross-sector collaboration",
      components: ["Common Agenda", "Shared Measurement", "Mutually Reinforcing Activities", "Continuous Communication", "Backbone Support"],
      applications: "Poverty reduction, education reform, community health"
    },
    {
      id: "fw-002",
      title: "Community-Led Development Spectrum",
      description: "Framework for understanding levels of community control and engagement",
      components: ["Community-Led", "Community-Engaged", "Community-Consulted", "Community-Informed"],
      applications: "Program design, policy development, evaluation"
    }
  ],
  tools: [
    {
      id: "tl-001",
      title: "Community Vision for Change Tool",
      purpose: "Develop shared vision for collective impact initiatives",
      steps: ["Gather diverse voices", "Identify common values", "Create aspirational statements", "Build consensus"]
    },
    {
      id: "tl-002",
      title: "Collaboration Monitoring Tool", 
      purpose: "Assess quality of collaboration in community change efforts",
      steps: ["Define collaboration indicators", "Collect feedback", "Analyze patterns", "Improve practices"]
    }
  ]
};

// Mock AI model configurations
const aiModels = {
  "claude-sonnet": {
    name: "Claude Sonnet 4",
    type: "cloud",
    provider: "Anthropic",
    capabilities: ["reasoning", "analysis", "synthesis"],
    privacy: "cloud-processed",
    cost: "moderate"
  },
  "llama-local": {
    name: "Llama 3.1 70B",
    type: "local",
    provider: "Meta/Local",
    capabilities: ["reasoning", "generation"],
    privacy: "fully-local",
    cost: "infrastructure-only"
  },
  "gpt-4": {
    name: "GPT-4",
    type: "cloud", 
    provider: "OpenAI",
    capabilities: ["reasoning", "analysis", "generation"],
    privacy: "cloud-processed",
    cost: "high"
  }
};

const InfiniteFrontPorchMVP = () => {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [selectedModel, setSelectedModel] = useState('claude-sonnet');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [communitySettings, setCommunitySettings] = useState({
    shareLevel: 'selective',
    retainOwnership: true,
    allowCommercial: false
  });

  // Inline styles
  const styles = {
    app: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      backgroundColor: '#f8fafc',
      color: '#1e293b'
    },
    header: {
      marginBottom: '32px'
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px',
      margin: 0
    },
    headerSubtitle: {
      color: '#64748b',
      fontSize: '1rem',
      margin: 0
    },
    tabBar: {
      display: 'flex',
      background: 'white',
      borderRadius: '8px',
      padding: '4px',
      border: '1px solid #e2e8f0',
      marginBottom: '24px',
      gap: '4px'
    },
    tab: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 16px',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#64748b'
    },
    tabActive: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    tabIcon: {
      width: '16px',
      height: '16px'
    },
    mainContent: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      padding: '24px',
      minHeight: '400px'
    },
    infoBanner: {
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    bannerTitle: {
      fontWeight: '600',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },
    bannerText: {
      fontSize: '0.875rem',
      margin: 0
    },
    knowledgeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    card: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    cardTitle: {
      fontWeight: '500',
      flex: 1,
      margin: 0
    },
    icon: {
      width: '20px',
      height: '20px'
    },
    badge: {
      fontSize: '0.75rem',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontWeight: '500'
    },
    caseStudy: {
      fontSize: '0.875rem',
      borderLeft: '2px solid #bbf7d0',
      paddingLeft: '12px',
      marginBottom: '8px'
    },
    caseTitle: {
      fontWeight: '500',
      color: '#1f2937',
      margin: 0
    },
    caseCommunity: {
      color: '#6b7280',
      margin: '0 0 4px 0'
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px'
    },
    tag: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      fontSize: '0.75rem',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    downloadBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#ea580c',
      fontSize: '0.75rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    },
    aiHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    modelSelector: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    modelSelect: {
      fontSize: '0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      padding: '4px 8px',
      background: 'white'
    },
    modelInfo: {
      backgroundColor: '#f9fafb',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '16px',
      fontSize: '0.875rem'
    },
    modelDetails: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    },
    chatArea: {
      height: '256px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      padding: '12px',
      overflowY: 'auto',
      marginBottom: '16px'
    },
    chatPlaceholder: {
      textAlign: 'center',
      color: '#6b7280',
      marginTop: '64px'
    },
    chatInput: {
      display: 'flex',
      gap: '8px'
    },
    chatInputField: {
      flex: 1,
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '0.875rem'
    },
    sendBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '0.875rem',
      cursor: 'pointer'
    },
    sendBtnDisabled: {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed'
    },
    chatHistory: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    messageUser: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    messageAi: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    messageContentUser: {
      maxWidth: '75%',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#2563eb',
      color: 'white'
    },
    messageContentAi: {
      maxWidth: '75%',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      whiteSpace: 'pre-wrap',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      color: '#1f2937'
    },
    networkGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    networkHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    },
    hostBadge: {
      fontSize: '0.75rem',
      backgroundColor: '#dbeafe',
      color: '#1d4ed8',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    networkDesc: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '12px'
    },
    sharingInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.75rem',
      color: '#059669'
    },
    joinContent: {
      textAlign: 'center',
      color: '#6b7280'
    },
    governanceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    preferences: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    preferenceItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    preferenceSelect: {
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '0.875rem',
      background: 'white'
    },
    checkboxItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    feature: {
      textAlign: 'center'
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px'
    }
  };

  // Simulate AI response based on knowledge base
  const generateAIResponse = async (query, model) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const relevantContent = mockKnowledgeBase.caseStudies.filter(cs => 
      cs.topics.some(topic => query.toLowerCase().includes(topic.toLowerCase())) ||
      cs.title.toLowerCase().includes(query.toLowerCase())
    );
    
    let response = "";
    
    if (relevantContent.length > 0) {
      response = `Based on Tamarack's community knowledge base, I found ${relevantContent.length} relevant case studies:\n\n`;
      relevantContent.forEach(cs => {
        response += `**${cs.title}** (${cs.community})\n${cs.summary}\n\n`;
      });
      response += `This response was generated using ${aiModels[model].name} while maintaining your community's data sovereignty. Would you like me to dive deeper into any of these examples?`;
    } else {
      response = `I searched Tamarack's knowledge base but didn't find specific matches for "${query}". However, I can help you explore our frameworks for community engagement, collective impact, or asset-based development. What specific challenge are you working on?`;
    }
    
    setIsProcessing(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    const aiResponse = await generateAIResponse(userMessage, selectedModel);
    
    setChatHistory(prev => [...prev, {
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      model: selectedModel
    }]);
  };

  const renderKnowledgeBase = () => (
    <div>
      <div style={{...styles.infoBanner, backgroundColor: '#eff6ff'}}>
        <h3 style={{...styles.bannerTitle, color: '#1e3a8a'}}>Tamarack Institute Knowledge Commons</h3>
        <p style={{...styles.bannerText, color: '#1d4ed8'}}>
          This represents how Tamarack's 20+ years of community development expertise could be structured 
          for AI-powered knowledge sharing while maintaining community ownership.
        </p>
      </div>
      
      <div style={styles.knowledgeGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Database style={{...styles.icon, color: '#059669'}} />
            <h4 style={styles.cardTitle}>Case Studies</h4>
            <span style={{...styles.badge, backgroundColor: '#dcfce7', color: '#14532d'}}>
              {mockKnowledgeBase.caseStudies.length}
            </span>
          </div>
          <div>
            {mockKnowledgeBase.caseStudies.map(cs => (
              <div key={cs.id} style={styles.caseStudy}>
                <div style={styles.caseTitle}>{cs.title}</div>
                <div style={styles.caseCommunity}>{cs.community}</div>
                <div style={styles.tags}>
                  {cs.topics.map(topic => (
                    <span key={topic} style={styles.tag}>{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Brain style={{...styles.icon, color: '#7c3aed'}} />
            <h4 style={styles.cardTitle}>Frameworks</h4>
            <span style={{...styles.badge, backgroundColor: '#ede9fe', color: '#581c87'}}>
              {mockKnowledgeBase.frameworks.length}
            </span>
          </div>
          <div>
            {mockKnowledgeBase.frameworks.map(fw => (
              <div key={fw.id} style={{...styles.caseStudy, borderLeftColor: '#ddd6fe'}}>
                <div style={styles.caseTitle}>{fw.title}</div>
                <div style={{...styles.caseCommunity, fontSize: '0.75rem'}}>{fw.description}</div>
                <div style={{...styles.caseCommunity, fontSize: '0.75rem'}}>{fw.applications}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Settings style={{...styles.icon, color: '#ea580c'}} />
            <h4 style={styles.cardTitle}>Practical Tools</h4>
            <span style={{...styles.badge, backgroundColor: '#fed7aa', color: '#9a3412'}}>
              {mockKnowledgeBase.tools.length}
            </span>
          </div>
          <div>
            {mockKnowledgeBase.tools.map(tool => (
              <div key={tool.id} style={{...styles.caseStudy, borderLeftColor: '#fed7aa'}}>
                <div style={styles.caseTitle}>{tool.title}</div>
                <div style={{...styles.caseCommunity, fontSize: '0.75rem', marginBottom: '4px'}}>{tool.purpose}</div>
                <button style={styles.downloadBtn}>
                  <Download style={{width: '12px', height: '12px'}} />
                  Download Tool
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIInterface = () => (
    <div>
      <div style={styles.card}>
        <div style={styles.aiHeader}>
          <h3 style={{fontWeight: '600', margin: 0}}>AI Knowledge Assistant</h3>
          <div style={styles.modelSelector}>
            <label style={{fontSize: '0.875rem', color: '#6b7280'}}>Model:</label>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={styles.modelSelect}
            >
              {Object.entries(aiModels).map(([key, model]) => (
                <option key={key} value={key}>
                  {model.name} ({model.type})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={styles.modelInfo}>
          <div style={styles.modelDetails}>
            {aiModels[selectedModel].type === 'local' ? 
              <Cpu style={{width: '16px', height: '16px'}} /> : 
              <Cloud style={{width: '16px', height: '16px'}} />
            }
            <span style={{fontWeight: '500'}}>{aiModels[selectedModel].name}</span>
            <Lock style={{width: '12px', height: '12px', color: '#059669'}} />
          </div>
          <div style={{color: '#6b7280'}}>
            Privacy: {aiModels[selectedModel].privacy} • 
            Provider: {aiModels[selectedModel].provider} • 
            Cost: {aiModels[selectedModel].cost}
          </div>
        </div>
        
        <div style={styles.chatArea}>
          {chatHistory.length === 0 ? (
            <div style={styles.chatPlaceholder}>
              <MessageCircle style={{width: '32px', height: '32px', margin: '0 auto 8px', opacity: 0.5}} />
              <p style={{margin: '0 0 8px 0'}}>Ask me about community development practices, case studies, or frameworks from Tamarack's knowledge base.</p>
              <p style={{fontSize: '0.75rem', margin: '8px 0 0 0'}}>Try: "Show me examples of collective impact in rural communities"</p>
            </div>
          ) : (
            <div style={styles.chatHistory}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={msg.type === 'user' ? styles.messageUser : styles.messageAi}>
                  <div style={msg.type === 'user' ? styles.messageContentUser : styles.messageContentAi}>
                    {msg.content}
                    {msg.model && (
                      <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '4px', paddingTop: '4px', borderTop: '1px solid #e5e7eb'}}>
                        Generated by {aiModels[msg.model].name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div style={styles.messageAi}>
                  <div style={{...styles.messageContentAi, color: '#6b7280'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out infinite'}}></div>
                      Processing with {aiModels[selectedModel].name}...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={styles.chatInput}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about community development practices..."
            style={styles.chatInputField}
            disabled={isProcessing}
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !currentMessage.trim()}
            style={{
              ...styles.sendBtn,
              ...(isProcessing || !currentMessage.trim() ? styles.sendBtnDisabled : {})
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  const renderNetworkView = () => (
    <div>
      <div style={{...styles.infoBanner, backgroundColor: '#f0fdf4'}}>
        <h3 style={{...styles.bannerTitle, color: '#14532d'}}>Knowledge Commons Network</h3>
        <p style={{...styles.bannerText, color: '#15803d'}}>
          This demonstrates how Tamarack could connect with other community networks through the Infinite Front Porch protocol.
        </p>
      </div>
      
      <div style={styles.networkGrid}>
        <div style={{...styles.card, border: '2px solid #3b82f6'}}>
          <div style={styles.networkHeader}>
            <div style={{...styles.statusDot, backgroundColor: '#2563eb'}}></div>
            <h4 style={{...styles.cardTitle, flex: 1}}>Tamarack Institute</h4>
            <span style={styles.hostBadge}>HOST</span>
          </div>
          <div style={styles.networkDesc}>
            200+ communities • Community development • Collective impact frameworks
          </div>
          <div style={styles.sharingInfo}>
            <Share2 style={{width: '12px', height: '12px'}} />
            Sharing: Case studies, frameworks, tools
          </div>
        </div>
        
        <div style={styles.card}>
          <div style={styles.networkHeader}>
            <div style={{...styles.statusDot, backgroundColor: '#7c3aed'}}></div>
            <h4 style={styles.cardTitle}>SuperBenefit Network</h4>
          </div>
          <div style={styles.networkDesc}>
            Web3 communities • Regenerative practices • DAO governance
          </div>
          <div style={styles.sharingInfo}>
            <Share2 style={{width: '12px', height: '12px'}} />
            Sharing: Governance models, Web3 tools
          </div>
        </div>
        
        <div style={styles.card}>
          <div style={styles.networkHeader}>
            <div style={{...styles.statusDot, backgroundColor: '#ea580c'}}></div>
            <h4 style={styles.cardTitle}>Labour DAO</h4>
          </div>
          <div style={styles.networkDesc}>
            Future of work • Cooperative economics • Worker empowerment
          </div>
          <div style={styles.sharingInfo}>
            <Share2 style={{width: '12px', height: '12px'}} />
            Sharing: Coop frameworks, economic models
          </div>
        </div>
        
        <div style={styles.card}>
          <div style={styles.networkHeader}>
            <div style={{...styles.statusDot, backgroundColor: '#059669'}}></div>
            <h4 style={styles.cardTitle}>Gaia AI</h4>
          </div>
          <div style={styles.networkDesc}>
            Environmental AI • Climate solutions • Regenerative tech
          </div>
          <div style={styles.sharingInfo}>
            <Share2 style={{width: '12px', height: '12px'}} />
            Sharing: Climate data, AI models
          </div>
        </div>
        
        <div style={{...styles.card, border: '2px dashed #d1d5db'}}>
          <div style={styles.joinContent}>
            <Users style={{width: '32px', height: '32px', margin: '0 auto 8px'}} />
            <div style={{fontSize: '0.875rem', marginBottom: '4px'}}>Your Community Network</div>
            <div style={{fontSize: '0.75rem'}}>Join the knowledge commons</div>
          </div>
        </div>
      </div>
      
      <div style={styles.card}>
        <h4 style={{fontWeight: '500', marginBottom: '12px', margin: '0 0 12px 0'}}>Cross-Network Query Example</h4>
        <div style={{backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', fontSize: '0.875rem'}}>
          <div style={{fontWeight: '500', color: '#2563eb', marginBottom: '8px'}}>Query: "How can DAOs support community-led climate action?"</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px', color: '#374151'}}>
            <div>• <span style={{fontWeight: '500'}}>Tamarack:</span> Community engagement frameworks, collective impact models</div>
            <div>• <span style={{fontWeight: '500'}}>SuperBenefit:</span> DAO governance structures, regenerative economics</div>
            <div>• <span style={{fontWeight: '500'}}>Gaia AI:</span> Climate impact measurement, AI-powered solutions</div>
            <div>• <span style={{fontWeight: '500'}}>Labour DAO:</span> Worker cooperative models, distributed governance</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGovernance = () => (
    <div>
      <div style={{...styles.infoBanner, backgroundColor: '#faf5ff'}}>
        <h3 style={{...styles.bannerTitle, color: '#581c87'}}>Community Data Sovereignty</h3>
        <p style={{...styles.bannerText, color: '#7c3aed'}}>
          Configure how your community's knowledge is shared and used in the network while maintaining full ownership.
        </p>
      </div>
      
      <div style={styles.governanceGrid}>
        <div style={styles.card}>
          <h4 style={{fontWeight: '500', marginBottom: '16px', margin: '0 0 16px 0'}}>Sharing Preferences</h4>
          <div style={styles.preferences}>
            <div style={styles.preferenceItem}>
              <label style={{fontSize: '0.875rem', fontWeight: '500', color: '#374151'}}>Sharing Level</label>
              <select 
                value={communitySettings.shareLevel}
                onChange={(e) => setCommunitySettings(prev => ({...prev, shareLevel: e.target.value}))}
                style={styles.preferenceSelect}
              >
                <option value="open">Open - Full network access</option>
                <option value="selective">Selective - Curated sharing</option>
                <option value="private">Private - Internal use only</option>
              </select>
            </div>
            
            <div style={styles.checkboxItem}>
              <input
                type="checkbox"
                id="retainOwnership"
                checked={communitySettings.retainOwnership}
                onChange={(e) => setCommunitySettings(prev => ({...prev, retainOwnership: e.target.checked}))}
                style={{width: '16px', height: '16px'}}
              />
              <label htmlFor="retainOwnership" style={{fontSize: '0.875rem', cursor: 'pointer'}}>Retain full ownership of contributed knowledge</label>
            </div>
            
            <div style={styles.checkboxItem}>
              <input
                type="checkbox"
                id="allowCommercial"
                checked={communitySettings.allowCommercial}
                onChange={(e) => setCommunitySettings(prev => ({...prev, allowCommercial: e.target.checked}))}
                style={{width: '16px', height: '16px'}}
              />
              <label htmlFor="allowCommercial" style={{fontSize: '0.875rem', cursor: 'pointer'}}>Allow commercial use of shared knowledge</label>
            </div>
          </div>
        </div>
        
        <div style={styles.card}>
          <h4 style={{fontWeight: '500', marginBottom: '16px', margin: '0 0 16px 0'}}>Revenue Sharing</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <div style={{padding: '12px', borderRadius: '6px', backgroundColor: '#f0fdf4'}}>
              <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0', color: '#14532d'}}>Knowledge Contributions</div>
              <div style={{fontSize: '0.75rem', margin: 0, color: '#15803d'}}>
                When other communities access your knowledge, you earn network tokens
              </div>
            </div>
            
            <div style={{padding: '12px', borderRadius: '6px', backgroundColor: '#eff6ff'}}>
              <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0', color: '#1e3a8a'}}>AI Processing</div>
              <div style={{fontSize: '0.75rem', margin: 0, color: '#1d4ed8'}}>
                Revenue from AI services using your data flows back to your community
              </div>
            </div>
            
            <div style={{padding: '12px', borderRadius: '6px', backgroundColor: '#faf5ff'}}>
              <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0', color: '#581c87'}}>Community Treasury</div>
              <div style={{fontSize: '0.75rem', margin: 0, color: '#7c3aed'}}>
                Accumulated value supports your community development work
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.card}>
        <h4 style={{fontWeight: '500', marginBottom: '12px', margin: '0 0 12px 0'}}>Network Participation</h4>
        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <div style={{...styles.featureIcon, backgroundColor: '#dcfce7', color: '#059669'}}>
              <Lock style={{width: '24px', height: '24px'}} />
            </div>
            <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0'}}>Data Sovereignty</div>
            <div style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Your community maintains full control over its knowledge assets</div>
          </div>
          
          <div style={styles.feature}>
            <div style={{...styles.featureIcon, backgroundColor: '#dbeafe', color: '#2563eb'}}>
              <Share2 style={{width: '24px', height: '24px'}} />
            </div>
            <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0'}}>Selective Sharing</div>
            <div style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Choose exactly what knowledge to share and with whom</div>
          </div>
          
          <div style={styles.feature}>
            <div style={{...styles.featureIcon, backgroundColor: '#ede9fe', color: '#7c3aed'}}>
              <Users style={{width: '24px', height: '24px'}} />
            </div>
            <div style={{fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px', margin: '0 0 4px 0'}}>Community Value</div>
            <div style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>Generate value from your community's collective wisdom</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Infinite Front Porch</h1>
        <p style={styles.headerSubtitle}>Community-owned knowledge commons powered by interchangeable AI models</p>
      </div>
      
      <div style={styles.tabBar}>
        <button
          onClick={() => setActiveTab('knowledge')}
          style={{
            ...styles.tab,
            ...(activeTab === 'knowledge' ? styles.tabActive : {})
          }}
        >
          <Database style={styles.tabIcon} />
          Knowledge Base
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          style={{
            ...styles.tab,
            ...(activeTab === 'ai' ? styles.tabActive : {})
          }}
        >
          <Brain style={styles.tabIcon} />
          AI Assistant
        </button>
        <button
          onClick={() => setActiveTab('network')}
          style={{
            ...styles.tab,
            ...(activeTab === 'network' ? styles.tabActive : {})
          }}
        >
          <Users style={styles.tabIcon} />
          Network
        </button>
        <button
          onClick={() => setActiveTab('governance')}
          style={{
            ...styles.tab,
            ...(activeTab === 'governance' ? styles.tabActive : {})
          }}
        >
          <Settings style={styles.tabIcon} />
          Governance
        </button>
      </div>
      
      <div style={styles.mainContent}>
        {activeTab === 'knowledge' && renderKnowledgeBase()}
        {activeTab === 'ai' && renderAIInterface()}
        {activeTab === 'network' && renderNetworkView()}
        {activeTab === 'governance' && renderGovernance()}
      </div>
    </div>
  );
};

export default InfiniteFrontPorchMVP;