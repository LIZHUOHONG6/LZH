import React, { useState } from 'react';
import { LayoutDashboard, Microscope, BarChart3, Workflow, MessageSquareCode, Menu, X, Info, BookOpen } from 'lucide-react';
import OpticalSystemView from './components/OpticalSystemView';
import ComparisonChart from './components/ComparisonChart';
import AlgorithmView from './components/AlgorithmView';
import ChatInterface from './components/ChatInterface';
import { Section } from './types';
import { PROPOSAL_TEXT, SYSTEM_COMPONENTS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.PRINCIPLE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ section, icon: Icon, label }: { section: Section; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-200 ${
        activeSection === section
          ? 'bg-cyan-900/30 text-cyan-400 border-r-2 border-cyan-500'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-50">
        <h1 className="font-bold text-lg text-cyan-400">盲孔内壁检测系统</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
        fixed md:relative inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 z-40
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
              <Microscope className="text-white" size={20} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">Inspect<span className="text-cyan-400">Pro</span></h1>
          </div>
          <p className="text-xs text-slate-500">光学 NDT 方案设计平台</p>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem section={Section.PRINCIPLE} icon={LayoutDashboard} label="项目概述" />
          <NavItem section={Section.SYSTEM} icon={Microscope} label="成像原理" />
          <NavItem section={Section.ALGORITHM} icon={Workflow} label="算法流程" />
          <NavItem section={Section.COMPARISON} icon={BarChart3} label="方案对比" />
          <NavItem section={Section.CHAT} icon={MessageSquareCode} label="智能顾问" />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="flex items-start gap-2 text-xs text-slate-500">
             <Info size={14} className="mt-0.5 shrink-0" />
             <p>专为单端盲孔内壁检测设计。</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeSection === Section.PRINCIPLE && "项目方案书 (Proposal)"}
              {activeSection === Section.SYSTEM && "光学成像原理 (Optical Principle)"}
              {activeSection === Section.ALGORITHM && "图像处理与算法 (Algorithms)"}
              {activeSection === Section.COMPARISON && "技术方案对比 (Comparison)"}
              {activeSection === Section.CHAT && "AI 技术咨询 (Consultation)"}
            </h2>
            <p className="text-slate-400">
              基于折反射全景成像技术的盲孔内壁非接触检测系统设计。
            </p>
          </header>

          {/* Content Rendering */}
          <div className="space-y-6">
            
            {activeSection === Section.PRINCIPLE && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">摘要 (Abstract)</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">{PROPOSAL_TEXT.abstract}</p>
                  
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">设计理念</h3>
                  <p className="text-slate-300 leading-relaxed">{PROPOSAL_TEXT.principle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   {SYSTEM_COMPONENTS.map((comp) => (
                      <div key={comp.name} className="bg-slate-900 border border-slate-800 p-4 rounded-lg hover:border-cyan-500/50 transition-colors">
                        <h4 className="font-bold text-white mb-1">{comp.name}</h4>
                        <p className="text-xs text-cyan-400 mb-2">{comp.description}</p>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {comp.specs.map((spec, i) => <li key={i}>• {spec}</li>)}
                        </ul>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {activeSection === Section.SYSTEM && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  {/* Dynamic Graph */}
                  <OpticalSystemView />
                  
                  {/* Detailed Principle Introduction */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     <div className="lg:col-span-2 bg-slate-900 border border-slate-700 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-cyan-400"/> 折反射成像机理详解
                        </h3>
                        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                            <p>
                                <strong>1. 光路映射模型：</strong> 
                                系统的核心是一个旋转对称的圆锥反射镜（或双曲面镜）。设光轴为Z轴，孔内壁为半径R的圆柱面。内壁上任意一点 P(R, φ, z) 发出的光线，经过锥面镜反射后，进入与其共轴的远心镜头。根据反射定律，圆柱面上的点被映射到成像平面上的极坐标点 P'(r, θ)。其中，极角 θ 对应孔内壁的方位角 φ，半径 r 线性或非线性地对应孔的深度 z。
                            </p>
                            <p>
                                <strong>2. 景深与远心光路：</strong>
                                由于锥面镜将沿Z轴分布的内壁映射为平面上的同心圆环，不同深度的物点到镜头的距离实际上是不同的。为了保证整个锥面镜视野内清晰成像，必须使用大景深的<strong>双远心镜头</strong>。此外，远心镜头还能消除由于探头微小抖动引起的放大倍率变化，这对于精密测量至关重要。
                            </p>
                            <p>
                                <strong>3. 畸变校正：</strong>
                                原始图像是环形的，且存在严重的径向畸变（靠近圆心的像素分辨率高，外圈分辨率低）。这并非传统意义上的透镜畸变，而是系统几何结构决定的。必须通过精确的标定算法，建立图像像素坐标 (u,v) 与 空间圆柱坐标 (φ,z) 的一一映射表，才能将图像“展开”为正确的矩形纹理。
                            </p>
                        </div>
                     </div>

                     <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-2">难点：照明设计</h3>
                        <p className="text-slate-400 text-sm mb-4">
                          盲孔深径比大，外部光源难以到达底部。本方案采用：
                        </p>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                            <li><strong>同轴落射光：</strong> 光线通过分光镜沿光轴垂直入射，经锥镜反射照亮孔壁。适合高反光表面。</li>
                            <li><strong>光纤导光环：</strong> 在镜头前端集成环形光纤束，提供均匀的漫反射照明，减少金属表面的镜面反光噪点。</li>
                        </ul>
                     </div>
                  </div>
               </div>
            )}

            {activeSection === Section.ALGORITHM && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <AlgorithmView />
              </div>
            )}

            {activeSection === Section.COMPARISON && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ComparisonChart />
               </div>
            )}

            {activeSection === Section.CHAT && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ChatInterface />
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;