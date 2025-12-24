import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ComparisonData } from '../types';
import { COMPARISON_DATA } from '../constants';

const ComparisonChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-slate-200 mb-4">综合性能雷达图</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={COMPARISON_DATA}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="method" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="本方案 (Proposed)"
                dataKey="blindHoleSuitability"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="#22d3ee"
                fillOpacity={0.3}
              />
              <Radar
                name="速度 (Speed)"
                dataKey="speed"
                stroke="#f472b6"
                strokeWidth={2}
                fill="#f472b6"
                fillOpacity={0.1}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }}/>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-slate-200 mb-4">关键指标量化对比</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={COMPARISON_DATA}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" stroke="#475569" />
              <YAxis dataKey="method" type="category" width={100} stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <Tooltip cursor={{fill: '#334155'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="accuracy" fill="#818cf8" name="检测精度 (Accuracy)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="cost" fill="#34d399" name="成本效益 (Cost)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="col-span-1 lg:col-span-2 bg-slate-800 p-4 rounded-lg">
        <h4 className="font-bold text-cyan-400 mb-2">文献调研总结</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            <li><strong>传统工业内窥镜:</strong> 视场角有限，检测盲孔侧壁需要机械旋转，效率低，且旋转机构易磨损。</li>
            <li><strong>鱼眼镜头方案:</strong> 边缘畸变极其严重，且难以对深孔底部进行均匀照明。</li>
            <li><strong>本方案 (折反射全景):</strong> 理论上可单帧获取360°图像。主要挑战是远距离分辨率下降，本设计通过Z轴扫描和远心光路有效解决了这一问题。</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonChart;