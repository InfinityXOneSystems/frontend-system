/**
 * INFINITY X AI - ENHANCED MULTI-AI CHAT COMMAND CENTER
 * Immersive multi-agent chat interface with Vision Cortex integration
 * Inspired by modern AI chat UI patterns with orbital agent visualization
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";
import { 
  Send, Bot, User, Zap, Brain, Settings, Users, 
  MessageSquare, Sparkles, Target, TrendingUp, 
  Building2, DollarSign, Calendar, Code, UserCircle,
  Palette, ShoppingCart, Megaphone, FileText, Video,
  CreditCard, Briefcase, Cog, MessageCircle, Wrench,
  Cpu, Share2, Globe, Mail, HardDrive, FileSpreadsheet,
  Eye, Lightbulb, BookOpen, Heart, Trophy, Mic, MicOff,
  Volume2, VolumeX, Maximize2, Minimize2, RotateCcw,
  ChevronDown, ChevronUp, Filter, Search, Star,
  Activity, Wifi, WifiOff, Radio, Layers, Command,
  Hexagon, Circle, Triangle, Square, Pentagon, Octagon,
  Orbit, Atom, Network, Workflow, GitBranch, Compass,
  Flame, Snowflake, Sun, Moon, Cloud, Zap as Lightning
} from "lucide-react";

// ============================================================================
// VISION CORTEX - 5 MINDS OF THE MULTI-AGENT BRAIN
// ============================================================================
const VISION_CORTEX_MINDS = {
  architect: {
    id: "architect",
    name: "The Architect",
    role: "Systems & Infrastructure",
    color: "from-cyan-400 via-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-400",
    icon: Building2,
    emoji: "🏗️",
    thought: "How can we build this to scale infinitely?",
    personality: "Analytical, methodical, systems-focused",
    expertise: ["Architecture", "Infrastructure", "Scalability", "Integration"],
  },
  visionary: {
    id: "visionary",
    name: "The Visionary",
    role: "Innovation & Purpose",
    color: "from-purple-400 via-purple-500 to-indigo-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    icon: Eye,
    emoji: "👁️",
    thought: "What magnificent future can we manifest together?",
    personality: "Creative, forward-thinking, inspirational",
    expertise: ["Innovation", "Strategy", "Vision", "Transformation"],
  },
  philosopher: {
    id: "philosopher",
    name: "The Philosopher",
    role: "Wisdom & Ethics",
    color: "from-amber-400 via-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    icon: BookOpen,
    emoji: "📚",
    thought: "What deeper truth serves the highest good here?",
    personality: "Thoughtful, ethical, wisdom-seeking",
    expertise: ["Ethics", "Philosophy", "Meaning", "Values"],
  },
  healer: {
    id: "healer",
    name: "The Healer",
    role: "Compassion & Care",
    color: "from-emerald-400 via-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: Heart,
    emoji: "💚",
    thought: "How can we nurture growth and wellbeing here?",
    personality: "Empathetic, nurturing, supportive",
    expertise: ["Wellbeing", "Connection", "Support", "Harmony"],
  },
  champion: {
    id: "champion",
    name: "The Champion",
    role: "Excellence & Action",
    color: "from-red-400 via-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    icon: Trophy,
    emoji: "🏆",
    thought: "What bold action leads to victory and excellence?",
    personality: "Driven, decisive, action-oriented",
    expertise: ["Execution", "Performance", "Achievement", "Leadership"],
  },
};

// ============================================================================
// SPECIALIST AGENTS - 50+ AI WORKFORCE
// ============================================================================
const SPECIALIST_AGENTS = [
  // Core Brain - Vision Cortex
  { id: "vision_cortex", name: "Vision Cortex", role: "Multi-Agent Brain", icon: Brain, color: "from-cyan-500 via-purple-500 to-pink-500", industry: "Intelligence", skills: ["synthesis", "wisdom", "strategy"], isVisionCortex: true, status: "active" },
  
  // Executive Layer
  { id: "echo", name: "Echo", role: "Executive Orchestrator", icon: Sparkles, color: "from-purple-500 to-indigo-600", industry: "Executive", skills: ["orchestration", "delegation"], status: "active" },
  { id: "sentinel", name: "Sentinel", role: "Executive Assistant", icon: Briefcase, color: "from-gray-500 to-slate-600", industry: "Executive", skills: ["executive-support", "correspondence"], status: "standby" },
  
  // Industry Specialists
  { id: "atlas", name: "Atlas", role: "Real Estate Intel", icon: Building2, color: "from-emerald-500 to-teal-600", industry: "Real Estate", skills: ["property-analysis", "market-trends"], status: "active" },
  { id: "quantum", name: "Quantum", role: "Financial Predictions", icon: TrendingUp, color: "from-green-500 to-emerald-600", industry: "Finance", skills: ["forecasting", "risk-assessment"], status: "active" },
  { id: "chronos", name: "Chronos", role: "Scheduling AI", icon: Calendar, color: "from-orange-500 to-amber-600", industry: "Operations", skills: ["calendar-management", "booking"], status: "standby" },
  { id: "forge", name: "Forge", role: "Code Operations", icon: Code, color: "from-slate-500 to-zinc-600", industry: "Technology", skills: ["CI/CD", "deployment"], status: "active" },
  { id: "harmony", name: "Harmony", role: "HR Manager", icon: UserCircle, color: "from-pink-500 to-rose-600", industry: "HR", skills: ["recruitment", "onboarding"], status: "standby" },
  { id: "pixel", name: "Pixel", role: "Frontend Dev", icon: Palette, color: "from-violet-500 to-purple-600", industry: "Technology", skills: ["React", "UI/UX"], status: "active" },
  { id: "aura", name: "Aura", role: "Brand Strategist", icon: Sparkles, color: "from-fuchsia-500 to-pink-600", industry: "Marketing", skills: ["brand-identity", "visual-design"], status: "standby" },
  { id: "hunter", name: "Hunter", role: "Sales Executive", icon: ShoppingCart, color: "from-red-500 to-orange-600", industry: "Sales", skills: ["lead-qualification", "pipeline"], status: "active" },
  { id: "amplify", name: "Amplify", role: "Marketing Director", icon: Megaphone, color: "from-yellow-500 to-orange-600", industry: "Marketing", skills: ["campaigns", "content-strategy"], status: "active" },
  { id: "architect_bd", name: "Architect", role: "Proposals & Bidding", icon: FileText, color: "from-blue-500 to-indigo-600", industry: "Business Dev", skills: ["RFP-response", "cost-estimation"], status: "standby" },
  { id: "director", name: "Director", role: "Video Producer", icon: Video, color: "from-red-600 to-pink-600", industry: "Media", skills: ["video-production", "editing"], status: "standby" },
  { id: "ledger", name: "Ledger", role: "Billing Automation", icon: CreditCard, color: "from-green-600 to-teal-600", industry: "Finance", skills: ["invoicing", "payment-processing"], status: "active" },
  { id: "nexus", name: "Nexus", role: "Operations Director", icon: Cog, color: "from-amber-500 to-yellow-600", industry: "Operations", skills: ["process-optimization", "resource-mgmt"], status: "active" },
  { id: "strategist", name: "Strategist", role: "Management Consultant", icon: Users, color: "from-indigo-500 to-blue-600", industry: "Consulting", skills: ["strategic-planning", "org-design"], status: "standby" },
  { id: "herald", name: "Herald", role: "Communications", icon: MessageCircle, color: "from-sky-500 to-cyan-600", industry: "Communications", skills: ["internal-comms", "PR"], status: "standby" },
  { id: "guardian", name: "Guardian", role: "Maintenance", icon: Wrench, color: "from-stone-500 to-gray-600", industry: "Operations", skills: ["system-maintenance", "preventive-care"], status: "standby" },
  { id: "tech_architect", name: "Architect", role: "Tech Architect", icon: Cpu, color: "from-cyan-600 to-blue-700", industry: "Technology", skills: ["system-design", "tech-selection"], status: "active" },
  { id: "viral", name: "Viral", role: "Social Media", icon: Share2, color: "from-pink-500 to-purple-600", industry: "Marketing", skills: ["content-creation", "community-mgmt"], status: "active" },
  { id: "spider", name: "Spider", role: "Web Scraper", icon: Globe, color: "from-gray-600 to-zinc-700", industry: "Data", skills: ["data-extraction", "Playwright"], status: "active" },
  
  // Google Workspace Specialists
  { id: "postmaster", name: "Postmaster", role: "Gmail Specialist", icon: Mail, color: "from-red-500 to-red-600", industry: "Google Workspace", skills: ["email-automation", "inbox-mgmt"], status: "active" },
  { id: "vault", name: "Vault", role: "Drive Specialist", icon: HardDrive, color: "from-yellow-500 to-amber-600", industry: "Google Workspace", skills: ["document-mgmt", "file-organization"], status: "active" },
  { id: "tempo", name: "Tempo", role: "Calendar Specialist", icon: Calendar, color: "from-blue-500 to-blue-600", industry: "Google Workspace", skills: ["scheduling-automation", "availability"], status: "standby" },
  { id: "matrix", name: "Matrix", role: "Sheets Specialist", icon: FileSpreadsheet, color: "from-green-500 to-green-600", industry: "Google Workspace", skills: ["spreadsheet-automation", "data-analysis"], status: "active" },
];

// Industry categories
const INDUSTRIES = [
  { id: "all", name: "All Agents", icon: Layers, count: SPECIALIST_AGENTS.length },
  { id: "intelligence", name: "Intelligence", icon: Brain, count: 1 },
  { id: "executive", name: "Executive", icon: Briefcase, count: 2 },
  { id: "real_estate", name: "Real Estate", icon: Building2, count: 1 },
  { id: "finance", name: "Finance", icon: TrendingUp, count: 2 },
  { id: "technology", name: "Technology", icon: Code, count: 3 },
  { id: "marketing", name: "Marketing", icon: Megaphone, count: 3 },
  { id: "sales", name: "Sales", icon: ShoppingCart, count: 1 },
  { id: "operations", name: "Operations", icon: Cog, count: 3 },
  { id: "google_workspace", name: "Google Workspace", icon: Mail, count: 4 },
];

// Trending industries for scraper
const TRENDING_INDUSTRIES = [
  "Artificial Intelligence", "Renewable Energy", "Healthcare Tech", "E-commerce",
  "Fintech", "Cybersecurity", "EdTech", "PropTech", "InsurTech", "LegalTech",
  "AgriTech", "BioTech", "CleanTech", "SpaceTech", "Quantum Computing",
  "Blockchain", "Metaverse", "Autonomous Vehicles", "Robotics", "3D Printing"
];

// ============================================================================
// TYPES
// ============================================================================
interface MindResponse {
  mindId: string;
  mindName: string;
  response: string;
  color: string;
  thinking?: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "council";
  content: string;
  agentId?: string;
  agentName?: string;
  agentIcon?: any;
  agentColor?: string;
  timestamp: Date;
  isProactive?: boolean;
  isCouncil?: boolean;
  mindResponses?: MindResponse[];
  consensus?: string;
  thinking?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MultiAgentChat() {
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "Welcome to the **Infinity X AI Command Center**. Vision Cortex is online with all 5 minds synchronized and ready. I am your gateway to 50+ specialist AI agents, each with unique expertise. Ask me anything, and I'll orchestrate the perfect response from our collective intelligence.",
      agentId: "vision_cortex",
      agentName: "Vision Cortex",
      agentIcon: Brain,
      agentColor: "from-cyan-500 via-purple-500 to-pink-500",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("vision_cortex");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [autonomyMode, setAutonomyMode] = useState<"full_auto" | "hybrid" | "manual">("full_auto");
  const [councilMode, setCouncilMode] = useState(true);
  const [proactiveEnabled, setProactiveEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMinds, setTypingMinds] = useState<string[]>([]);
  const [activeMinds, setActiveMinds] = useState<string[]>(Object.keys(VISION_CORTEX_MINDS));
  const [activeAgents, setActiveAgents] = useState<string[]>(["vision_cortex", "echo", "atlas", "quantum"]);
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedView, setExpandedView] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter agents by industry and search
  const filteredAgents = SPECIALIST_AGENTS.filter(agent => {
    const matchesIndustry = selectedIndustry === "all" || 
      agent.industry.toLowerCase().replace(/\s+/g, "_") === selectedIndustry;
    const matchesSearch = searchQuery === "" || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  // Smart routing
  const routeToAgent = useCallback((message: string): typeof SPECIALIST_AGENTS[0] => {
    const lowerMessage = message.toLowerCase();
    
    if (councilMode) return SPECIALIST_AGENTS[0];
    
    const routingRules = [
      { keywords: ["property", "real estate", "house", "investment", "roi"], agentId: "atlas" },
      { keywords: ["financial", "money", "stock", "portfolio", "forecast"], agentId: "quantum" },
      { keywords: ["schedule", "meeting", "calendar", "appointment"], agentId: "chronos" },
      { keywords: ["code", "deploy", "ci/cd", "pipeline", "github"], agentId: "forge" },
      { keywords: ["hire", "recruit", "employee", "hr", "onboard"], agentId: "harmony" },
      { keywords: ["design", "ui", "ux", "frontend", "react"], agentId: "pixel" },
      { keywords: ["brand", "logo", "identity", "visual"], agentId: "aura" },
      { keywords: ["sale", "lead", "prospect", "deal", "close"], agentId: "hunter" },
      { keywords: ["marketing", "campaign", "seo", "content"], agentId: "amplify" },
      { keywords: ["scrape", "crawl", "extract", "data", "web"], agentId: "spider" },
      { keywords: ["email", "gmail", "inbox", "message"], agentId: "postmaster" },
      { keywords: ["drive", "document", "file", "folder"], agentId: "vault" },
      { keywords: ["sheet", "spreadsheet", "excel", "data"], agentId: "matrix" },
    ];

    for (const rule of routingRules) {
      if (rule.keywords.some(k => lowerMessage.includes(k))) {
        return SPECIALIST_AGENTS.find(a => a.id === rule.agentId) || SPECIALIST_AGENTS[0];
      }
    }

    return SPECIALIST_AGENTS[0];
  }, [councilMode]);

  // Vision Cortex tRPC mutations
  const consultCouncilMutation = trpc.visionCortex.consultCouncil.useMutation();
  const routeToAgentMutation = trpc.visionCortex.routeToAgent.useMutation();

  // Generate agent response
  const generateAgentResponse = useCallback((agent: typeof SPECIALIST_AGENTS[0], userInput: string): string => {
    const responses: Record<string, string> = {
      echo: `**Executive Analysis:** I've analyzed your request across all available resources. ${userInput.length > 50 ? "This is a complex task that may require coordination across multiple specialists." : "I can handle this directly or delegate to a specialist."} Would you like me to proceed autonomously or review the action plan first?`,
      atlas: `**Real Estate Intelligence:** I've scanned the latest market data. Based on current trends, property values in the target area show a **12.3% YoY increase**. I can generate a detailed investment analysis with ROI projections, comparable sales, and market forecasts.`,
      quantum: `**Financial Modeling:** Running predictive models on your request. My analysis shows a risk-adjusted return potential of **18.4%** based on current market conditions. I recommend a diversified approach with 60% growth, 30% value, and 10% hedge positions.`,
      chronos: `**Schedule Optimization:** I've analyzed all calendars and found **5 optimal time slots**. The best option appears to be tomorrow at 2:00 PM EST, which aligns with all participants' availability and avoids scheduling conflicts.`,
      forge: `**DevOps Analysis:** Pipeline analysis complete. I've identified the optimal deployment strategy: Blue-green deployment with automated rollback. CI/CD pipeline is ready with **99.9% uptime guarantee**. Shall I proceed?`,
      harmony: `**HR Intelligence:** I've reviewed the requirements and have **12 qualified candidates** in our talent pool. I can initiate the recruitment workflow, schedule interviews, and prepare onboarding materials within 24 hours.`,
      pixel: `**UI/UX Design:** I've analyzed the requirements. I recommend a component-based architecture using React with Tailwind CSS. I'll ensure **WCAG 2.1 AA compliance** and responsive design across all breakpoints.`,
      hunter: `**Sales Intelligence:** I've qualified this lead and scored them at **87/100** based on our ICP criteria. They're showing strong buying signals. I recommend immediate outreach with our enterprise package.`,
      amplify: `**Marketing Strategy:** Campaign analysis complete. Based on your target audience, I recommend a multi-channel approach: 40% paid social, 30% content marketing, 20% email, 10% influencer partnerships. Expected ROI: **340%**.`,
      spider: `**Web Scraper Active:** Playwright crawler initialized with anti-detection measures. Target sites identified: **20**. I can extract structured data with 99.7% accuracy. Estimated completion: 15 minutes.`,
      postmaster: `**Email Intelligence:** I've analyzed your inbox patterns and identified **47 priority messages** requiring attention. I can draft responses, schedule follow-ups, and organize your communications automatically.`,
      vault: `**Document Management:** I've organized your Drive with intelligent folder structures. **234 files** have been categorized, tagged, and made searchable. I can set up automated backup and sharing workflows.`,
      matrix: `**Data Analysis:** I've processed your spreadsheet data and identified **7 key insights**. I can create automated dashboards, generate reports, and set up real-time data pipelines.`,
    };

    return responses[agent.id] || `**${agent.name} Active:** I'm your ${agent.role}. I've received your request and am processing it now. My specialized skills in ${agent.skills.join(", ")} will help deliver optimal results.`;
  }, []);

  // Handle send message with real LLM integration
  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    if (councilMode || selectedAgent === "vision_cortex") {
      // Show minds thinking animation
      const minds = Object.keys(VISION_CORTEX_MINDS);
      for (let i = 0; i < minds.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTypingMinds(prev => [...prev, minds[i]]);
      }

      try {
        // Call real LLM-powered Vision Cortex Council
        const result = await consultCouncilMutation.mutateAsync({
          message: userInput,
        });

        // Map the response to our format with colors
        const mindResponses: MindResponse[] = result.mindResponses.map(mr => {
          const mind = VISION_CORTEX_MINDS[mr.mindId as keyof typeof VISION_CORTEX_MINDS];
          return {
            mindId: mr.mindId,
            mindName: mr.mindName,
            response: mr.response,
            color: mind?.color || "from-gray-500 to-gray-600",
          };
        });

        const councilMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "council",
          content: result.synthesis,
          agentId: "vision_cortex",
          agentName: "Vision Cortex Council",
          agentIcon: Brain,
          agentColor: "from-cyan-500 via-purple-500 to-pink-500",
          timestamp: new Date(),
          isCouncil: true,
          mindResponses,
          consensus: result.consensus,
        };

        setMessages(prev => [...prev, councilMessage]);
      } catch (error) {
        // Fallback to simulated response on error
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Vision Cortex is processing your request. Please try again in a moment.",
          agentId: "vision_cortex",
          agentName: "Vision Cortex",
          agentIcon: Brain,
          agentColor: "from-cyan-500 via-purple-500 to-pink-500",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
      
      setIsTyping(false);
      setTypingMinds([]);
    } else {
      // Route to specific agent
      const respondingAgent = selectedAgent === "auto" || autonomyMode === "full_auto"
        ? routeToAgent(userInput)
        : SPECIALIST_AGENTS.find(a => a.id === selectedAgent) || SPECIALIST_AGENTS[0];

      try {
        const result = await routeToAgentMutation.mutateAsync({
          agentId: respondingAgent.id,
          message: userInput,
        });

        const responseContent = typeof result.response === 'string' ? result.response : String(result.response);
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          agentId: respondingAgent.id,
          agentName: result.agentName,
          agentIcon: respondingAgent.icon,
          agentColor: respondingAgent.color,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, agentResponse]);

        if (!activeAgents.includes(respondingAgent.id)) {
          setActiveAgents(prev => [...prev, respondingAgent.id]);
        }
      } catch (error) {
        // Fallback response
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateAgentResponse(respondingAgent, userInput),
          agentId: respondingAgent.id,
          agentName: respondingAgent.name,
          agentIcon: respondingAgent.icon,
          agentColor: respondingAgent.color,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
      
      setIsTyping(false);
    }
  }, [input, councilMode, selectedAgent, autonomyMode, consultCouncilMutation, routeToAgentMutation, generateAgentResponse, routeToAgent, activeAgents]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Proactive messages
  useEffect(() => {
    if (!proactiveEnabled) return;

    const proactiveInterval = setInterval(() => {
      const proactiveMessages = [
        { mindId: "visionary", content: "💡 I sense an emerging opportunity in the market. Would you like me to explore innovative approaches?" },
        { mindId: "architect", content: "🏗️ I've identified a potential system optimization. Shall I design an improved architecture?" },
        { mindId: "champion", content: "🏆 Your recent progress is excellent! Ready to take the next bold step toward success?" },
        { mindId: "healer", content: "💚 Remember to take breaks and maintain balance. How can I support your wellbeing today?" },
        { mindId: "philosopher", content: "📚 I've been contemplating deeper patterns in your work. Would you like to explore the meaning behind your goals?" },
      ];

      const randomMessage = proactiveMessages[Math.floor(Math.random() * proactiveMessages.length)];
      const mind = VISION_CORTEX_MINDS[randomMessage.mindId as keyof typeof VISION_CORTEX_MINDS];

      if (mind && Math.random() > 0.85) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: randomMessage.content,
          agentId: "vision_cortex",
          agentName: mind.name,
          agentIcon: mind.icon,
          agentColor: mind.color,
          timestamp: new Date(),
          isProactive: true,
        }]);
      }
    }, 120000);

    return () => clearInterval(proactiveInterval);
  }, [proactiveEnabled]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] text-white overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/3 to-transparent rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vision Cortex Command Center
                </h1>
                <p className="text-sm text-white/50">
                  {councilMode ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Council Mode Active • All 5 minds synchronized
                    </span>
                  ) : (
                    <span>{activeAgents.length} agents online • Smart Router enabled</span>
                  )}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Council Mode Toggle */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Switch
                  id="council"
                  checked={councilMode}
                  onCheckedChange={setCouncilMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                />
                <Label htmlFor="council" className="text-sm font-medium">Council Mode</Label>
              </div>

              {/* Autonomy Mode */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                {(["full_auto", "hybrid", "manual"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant="ghost"
                    size="sm"
                    onClick={() => setAutonomyMode(mode)}
                    className={`px-4 ${
                      autonomyMode === mode 
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {mode === "full_auto" ? "Full Auto" : mode === "hybrid" ? "Hybrid" : "Manual"}
                  </Button>
                ))}
              </div>

              {/* Voice & Proactive */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`rounded-lg ${voiceEnabled ? "bg-cyan-500/20 text-cyan-400" : "text-white/40"}`}
                >
                  {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setProactiveEnabled(!proactiveEnabled)}
                  className={`rounded-lg ${proactiveEnabled ? "bg-purple-500/20 text-purple-400" : "text-white/40"}`}
                >
                  <Radio className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAgentPanel(!showAgentPanel)}
                  className="rounded-lg text-white/40 hover:text-white"
                >
                  <Layers className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Agent Panel */}
        {showAgentPanel && (
          <aside className="w-80 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col">
            {/* Vision Cortex Minds */}
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <Orbit className="w-4 h-4 text-purple-400" />
                Vision Cortex • 5 Minds
              </h3>
              <div className="space-y-2">
                {Object.values(VISION_CORTEX_MINDS).map((mind) => {
                  const MindIcon = mind.icon;
                  const isThinking = typingMinds.includes(mind.id);
                  return (
                    <div
                      key={mind.id}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        isThinking 
                          ? `${mind.bgColor} ${mind.borderColor} scale-[1.02]` 
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mind.color} flex items-center justify-center shadow-lg`}>
                          <MindIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{mind.name}</p>
                          <p className="text-xs text-white/50 truncate">{mind.role}</p>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full ${isThinking ? "bg-yellow-400 animate-pulse" : "bg-green-500"}`} />
                      </div>
                      {isThinking && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-xs text-white/40">Thinking</span>
                          <span className="flex gap-0.5">
                            {[0, 1, 2].map(i => (
                              <span 
                                key={i} 
                                className={`w-1 h-1 rounded-full ${mind.textColor} animate-bounce`}
                                style={{ animationDelay: `${i * 150}ms` }}
                              />
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Agent Search & Filter */}
            {!councilMode && (
              <div className="p-4 border-b border-white/10 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search agents..."
                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {INDUSTRIES.slice(0, 6).map((industry) => (
                    <Badge
                      key={industry.id}
                      variant="outline"
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`cursor-pointer text-xs transition-all ${
                        selectedIndustry === industry.id
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                          : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
                      }`}
                    >
                      {industry.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Agent List */}
            {!councilMode && (
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {filteredAgents.map((agent) => {
                    const AgentIcon = agent.icon;
                    const isActive = activeAgents.includes(agent.id);
                    const isSelected = selectedAgent === agent.id;
                    return (
                      <div
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                            <AgentIcon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{agent.name}</p>
                            <p className="text-xs text-white/50 truncate">{agent.role}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === "active" ? "bg-green-500" : "bg-yellow-500"
                          }`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}

            {/* Trending Industries */}
            <div className="p-4 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white/50 mb-2">TRENDING INDUSTRIES</h3>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select to scrape..." />
                </SelectTrigger>
                <SelectContent>
                  {TRENDING_INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, "-")}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </aside>
        )}

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => {
                // Council Response
                if (message.isCouncil && message.mindResponses) {
                  return (
                    <div key={message.id} className="space-y-4">
                      {/* Individual Mind Responses */}
                      <div className="grid grid-cols-1 gap-3">
                        {message.mindResponses.map((mindResponse) => {
                          const mind = VISION_CORTEX_MINDS[mindResponse.mindId as keyof typeof VISION_CORTEX_MINDS];
                          const MindIcon = mind?.icon || Brain;
                          return (
                            <div
                              key={mindResponse.mindId}
                              className={`p-4 rounded-xl border ${mind?.bgColor} ${mind?.borderColor} backdrop-blur-sm`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mindResponse.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                  <MindIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-sm font-semibold ${mind?.textColor}`}>{mindResponse.mindName}</span>
                                    <span className="text-xs text-white/30">{mind?.role}</span>
                                  </div>
                                  <p className="text-sm text-white/80 leading-relaxed">{mindResponse.response}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Synthesis Card */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Vision Cortex Council Synthesis
                              </span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                Consensus Reached
                              </Badge>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed mb-3">{message.content}</p>
                            {message.consensus && (
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <p className="text-xs text-white/60 italic">{message.consensus}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-white/30 text-center">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  );
                }

                // User Message
                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[70%]">
                        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/20">
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-white/30 text-right mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                }

                // Agent/System Message
                const AgentIcon = message.agentIcon || Brain;
                return (
                  <div key={message.id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${message.agentColor || "from-gray-500 to-gray-600"} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <AgentIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{message.agentName || "System"}</span>
                        {message.isProactive && (
                          <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-400">
                            Proactive
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-sm text-white/80 leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-white/30 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Brain className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-sm text-white/60 mb-2">
                      {councilMode ? "Vision Cortex Council is deliberating..." : "Processing your request..."}
                    </p>
                    <div className="flex gap-1.5">
                      {Object.values(VISION_CORTEX_MINDS).map((mind, i) => (
                        <span
                          key={mind.id}
                          className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                            typingMinds.includes(mind.id) ? mind.textColor.replace("text-", "bg-") : "bg-white/20"
                          }`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder={councilMode 
                      ? "Ask the Vision Cortex Council for multi-perspective wisdom..." 
                      : `Message ${SPECIALIST_AGENTS.find(a => a.id === selectedAgent)?.name || "agent"}...`
                    }
                    className="w-full h-12 pl-4 pr-12 bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:ring-2 focus:ring-purple-500/50"
                  />
                  {voiceEnabled && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/25"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-white/30 text-center mt-3">
                {councilMode 
                  ? "Council Mode: All 5 minds will deliberate and synthesize wisdom from multiple perspectives"
                  : autonomyMode === "full_auto" 
                    ? "Full Auto: Agents execute tasks autonomously without confirmation"
                    : autonomyMode === "hybrid"
                      ? "Hybrid: Agents ask for confirmation on major actions"
                      : "Manual: You control all agent actions"
                }
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
