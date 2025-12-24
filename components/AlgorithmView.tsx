import React, { useState } from 'react';
import { ArrowRight, FileImage, Cpu, ScanSearch, CheckCircle, Code, List } from 'lucide-react';

interface AlgorithmStep {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  details: string;
  technical_intro: string; // Detailed logic description
  code_snippet?: string;
}

const AlgorithmView: React.FC = () => {
  const [selectedStepId, setSelectedStepId] = useState<number>(2); // Default to dewarping

  const steps: AlgorithmStep[] = [
    {
      id: 1,
      title: '原始图像采集',
      desc: '获取折反射环形图像。',
      icon: <FileImage className="text-blue-400" size={24} />,
      details: '输入: 2048x2048 灰度图。特征: 严重的径向畸变。',
      technical_intro: '通过远心镜头捕获由锥面镜反射的盲孔内壁图像。由于光学几何结构，内壁的圆柱表面被映射为二维平面上的一个圆环（Annulus）。靠近圆心的区域对应孔的深处（或浅处，取决于锥镜方向），外圈对应另一端。此阶段关键在于保证光照均匀，避免高反光金属表面的过曝。'
    },
    {
      id: 2,
      title: '极坐标全景展开',
      desc: '将极坐标(r, θ)变换为直角坐标(x, y)。',
      icon: <Cpu className="text-purple-400" size={24} />,
      details: '核心算法: 双线性插值逆向映射。',
      technical_intro: '这是最核心的预处理步骤。算法建立目标矩形图像与源环形图像的映射关系。目标图像的宽度对应圆环的周长（2πR），高度对应圆环的径向宽度（R_outer - R_inner）。对于目标图像上的每个点 (x, y)，计算其对应的极角 θ 和半径 r，映射回原图坐标 (u, v)。由于 (u, v) 通常不是整数，需使用双线性插值或双三次插值获取灰度值。',
      code_snippet: `def polar_to_cartesian(image, center, max_r, min_r):
    h, w = image.shape[:2]
    out_w = int(2 * np.pi * max_r)
    out_h = int(max_r - min_r)
    
    # 构建目标图像网格
    x_map, y_map = np.meshgrid(np.arange(out_w), np.arange(out_h))
    
    # 极坐标变换核心公式
    theta = 2 * np.pi * x_map / out_w
    radius = y_map + min_r
    
    # 映射回源图像坐标 (u, v)
    map_x = center[0] + radius * np.cos(theta)
    map_y = center[1] + radius * np.sin(theta)
    
    # 重映射插值
    return cv2.remap(image, map_x.astype(np.float32), 
                     map_y.astype(np.float32), cv2.INTER_LINEAR)`
    },
    {
      id: 3,
      title: '序列图像拼接',
      desc: 'Z轴扫描多帧图像拼接成完整内壁图。',
      icon: <ScanSearch className="text-orange-400" size={24} />,
      details: '方法: 特征匹配 (SIFT) 或 编码器位置硬拼接。',
      technical_intro: '由于单个环形切片的视野高度有限，系统需要沿Z轴移动探头拍摄多张图像。拼接算法有两种策略：\n1. 基于位置（硬拼接）：利用高精度光栅尺记录的Z轴坐标，直接按物理距离裁剪和堆叠图像。适合机械精度极高的系统。\n2. 基于图像（软拼接）：利用相邻帧的重叠区域（Overlapping），提取特征点（SIFT/ORB），计算单应性矩阵或平移向量进行配准融合，可消除机械抖动误差。'
    },
    {
      id: 4,
      title: '缺陷智能识别',
      desc: '检测划痕、气孔、砂眼等缺陷。',
      icon: <CheckCircle className="text-green-400" size={24} />,
      details: '方案: 传统形态学处理 或 YOLOv8 深度学习。',
      technical_intro: '针对展开后的矩形图像进行检测。\n传统CV流派：使用高斯差分（DoG）增强边缘，配合自适应阈值分割和形态学闭运算提取缺陷区域，根据面积和长宽比筛选。\n深度学习流派：收集缺陷样本，标注划痕、凹坑等类别，训练 YOLOv8 或 U-Net 分割网络。对于金属表面复杂的纹理背景，深度学习通常具有更好的鲁棒性。'
    }
  ];

  const selectedStep = steps.find(s => s.id === selectedStepId) || steps[0];

  return (
    <div className="space-y-8">
      {/* Step Selector */}
      <div className="relative">
         {/* Connector Line */}
         <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-800 lg:hidden"></div>
         <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 hidden lg:block -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setSelectedStepId(step.id)}
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 ${
                selectedStepId === step.id 
                  ? 'bg-cyan-900/40 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] transform scale-105' 
                  : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${selectedStepId === step.id ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {step.icon}
                </div>
                <h4 className={`font-bold text-sm ${selectedStepId === step.id ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </h4>
              </div>
              <div className={`text-xs mt-1 ${selectedStepId === step.id ? 'text-cyan-200' : 'text-slate-500'}`}>
                 点击查看详情
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
            <List size={18} className="text-cyan-400"/>
            <h3 className="font-bold text-white">算法逻辑详解: {selectedStep.title}</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">基本描述</h4>
                    <p className="text-slate-200 leading-relaxed">{selectedStep.technical_intro}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
                    <h4 className="text-xs font-bold text-cyan-400 mb-1">技术参数 / 约束</h4>
                    <p className="text-sm text-slate-400">{selectedStep.details}</p>
                </div>
            </div>

            <div className="bg-black/40 rounded-lg border border-slate-700/50 p-0 overflow-hidden flex flex-col">
                <div className="bg-slate-800/80 px-4 py-2 text-xs font-mono text-slate-400 flex items-center justify-between border-b border-slate-700/50">
                    <span className="flex items-center gap-2"><Code size={12}/> {selectedStep.code_snippet ? '核心代码片段 (Python)' : '示意图'}</span>
                </div>
                {selectedStep.code_snippet ? (
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-green-400 leading-relaxed">
                        {selectedStep.code_snippet}
                    </pre>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-8 text-slate-600 italic">
                        暂无代码展示，请参考文字描述。
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmView;