import React, { useState } from 'react';
import { Layers, Lightbulb, Camera, ArrowDown } from 'lucide-react';

const OpticalSystemView: React.FC = () => {
  const [activePart, setActivePart] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> 光路结构设计图 (交互式)
        </h2>
        <div className="text-xs text-slate-400">鼠标悬停组件查看详情</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SVG Diagram */}
        <div className="flex-1 relative bg-slate-950 rounded-lg overflow-hidden flex justify-center py-8">
          <svg width="400" height="500" viewBox="0 0 400 500" className="drop-shadow-lg">
            <defs>
              <linearGradient id="metalGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>

            {/* Industrial Part (Cross Section) */}
            <path 
              d="M50,200 L150,200 L150,450 L250,450 L250,200 L350,200 L350,500 L50,500 Z" 
              fill="url(#metalGradient)" 
              stroke="#cbd5e1" 
              strokeWidth="2"
              className="transition-opacity duration-300"
              style={{ opacity: activePart && activePart !== 'part' ? 0.3 : 1 }}
              onMouseEnter={() => setActivePart('part')}
              onMouseLeave={() => setActivePart(null)}
            />
            
            {/* Blind Hole Background */}
            <rect x="150" y="200" width="100" height="250" fill="#0f172a" />
            <text x="360" y="350" fill="#64748b" fontSize="12" style={{writingMode: 'vertical-rl'}}>待测工件 (盲孔)</text>

            {/* Camera Unit */}
            <g 
              transform="translate(160, 20)"
              onMouseEnter={() => setActivePart('camera')}
              onMouseLeave={() => setActivePart(null)}
              className="cursor-pointer"
              style={{ opacity: activePart && activePart !== 'camera' ? 0.3 : 1 }}
            >
              <rect x="0" y="0" width="80" height="60" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
              <circle cx="40" cy="30" r="15" fill="#1e3a8a" />
              <text x="40" y="-10" textAnchor="middle" fill="#60a5fa" fontSize="12">工业相机</text>
            </g>

            {/* Lens */}
            <g
              transform="translate(170, 90)"
              onMouseEnter={() => setActivePart('lens')}
              onMouseLeave={() => setActivePart(null)}
              style={{ opacity: activePart && activePart !== 'lens' ? 0.3 : 1 }}
            >
              <path d="M0,0 L60,0 L50,40 L10,40 Z" fill="#475569" stroke="#94a3b8" />
              <text x="90" y="25" fill="#94a3b8" fontSize="12">双远心镜头</text>
            </g>

            {/* Probe Rod */}
            <rect 
              x="195" y="130" width="10" height="180" 
              fill="#cbd5e1" 
              onMouseEnter={() => setActivePart('probe')}
              onMouseLeave={() => setActivePart(null)}
              style={{ opacity: activePart && activePart !== 'probe' ? 0.3 : 1 }}
            />

            {/* Mirror (Cone) */}
            <path 
              d="M190,310 L210,310 L200,330 Z" 
              fill="#f1f5f9" 
              stroke="#38bdf8" 
              strokeWidth="2"
              onMouseEnter={() => setActivePart('mirror')}
              onMouseLeave={() => setActivePart(null)}
              style={{ opacity: activePart && activePart !== 'mirror' ? 0.3 : 1 }}
            />
             <text x="220" y="325" fill="#38bdf8" fontSize="12">锥形反射镜</text>

            {/* Light Path Rays */}
            <g style={{ opacity: 0.6, pointerEvents: 'none' }}>
              {/* Downward Ray */}
              <line x1="200" y1="130" x2="200" y2="320" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2" />
              {/* Reflected Rays hitting walls */}
              <line x1="200" y1="320" x2="150" y2="320" stroke="#22d3ee" strokeWidth="1" />
              <line x1="200" y1="320" x2="250" y2="320" stroke="#22d3ee" strokeWidth="1" />
            </g>

            {/* Scan Motion Arrow */}
            <g transform="translate(120, 250)">
               <ArrowDown className="text-yellow-500 animate-bounce" />
            </g>

          </svg>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className={`p-4 rounded-lg transition-colors ${activePart === 'camera' ? 'bg-blue-900/40 border-l-4 border-blue-500' : 'bg-slate-800'}`}>
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Camera size={16} /> 成像传感器 (Sensor)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              位于孔外的高分辨率传感器。负责捕捉经过反射镜折射后的内壁环形图像。
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-colors ${activePart === 'mirror' ? 'bg-cyan-900/40 border-l-4 border-cyan-500' : 'bg-slate-800'}`}>
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Layers size={16} /> 锥形反射镜 (Mirror)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              核心组件。将360°的内壁表面反射向上方进入镜头。实现“单次曝光，全景覆盖”的一个切片。
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-colors ${activePart === 'lens' ? 'bg-slate-700/40 border-l-4 border-slate-500' : 'bg-slate-800'}`}>
            <h3 className="font-bold text-slate-200">双远心镜头 (Telecentric Lens)</h3>
            <p className="text-sm text-slate-400 mt-1">
              消除透视误差，保证在Z轴扫描过程中图像放大倍率恒定，确保测量精度。
            </p>
          </div>

          <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/50 mt-6">
            <h4 className="text-yellow-500 text-sm font-bold flex items-center gap-2">
              <Lightbulb size={14} /> 设计要点
            </h4>
            <p className="text-xs text-yellow-200/80 mt-1">
              针对盲孔检测，反射镜探头需深入至孔底。通过Z轴线性模组带动探头提升，连续采集多个环形切片，最终拼接成完整的内壁展开图。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpticalSystemView;