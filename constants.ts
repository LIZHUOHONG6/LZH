import { ComparisonData, SystemComponent } from './types';

export const COMPARISON_DATA: ComparisonData[] = [
  { method: '接触式旋转探头', speed: 20, accuracy: 95, complexity: 40, cost: 60, blindHoleSuitability: 80 },
  { method: '旋转反射镜线扫描', speed: 40, accuracy: 90, complexity: 70, cost: 80, blindHoleSuitability: 90 },
  { method: '广角工业内窥镜', speed: 80, accuracy: 60, complexity: 30, cost: 40, blindHoleSuitability: 50 },
  { method: '本方案：全景折反射', speed: 95, accuracy: 88, complexity: 65, cost: 70, blindHoleSuitability: 95 },
];

export const SYSTEM_COMPONENTS: SystemComponent[] = [
  {
    name: '成像传感器 (Camera)',
    description: '高分辨率全局快门工业相机',
    specs: ['分辨率: 20MP+', '接口: GigE/USB3', '靶面尺寸: 1英寸及以上 (高信噪比)']
  },
  {
    name: '光学探头 (Optical Probe)',
    description: '定制折反射全景镜头 (锥面/双曲面镜)',
    specs: ['镜面角度: 45° (锥形) 或 双曲面设计', '直径: < 孔径的80%', '镀膜: 硬质介电膜 (耐磨损)']
  },
  {
    name: '照明系统 (Illumination)',
    description: '内部同轴光 或 光纤耦合环形光',
    specs: ['波长: 蓝光 (460nm) 增强金属对比度', '类型: 漫反射光源，减少镜面反光', '控制: 频闪同步']
  },
  {
    name: '运动控制 (Motion Control)',
    description: '精密 Z 轴线性模组',
    specs: ['行程: > 孔深', '重复定位精度: < 5μm', '带光栅尺反馈']
  }
];

export const PROPOSAL_TEXT = {
  abstract: "本方案旨在设计一种针对工业盲孔内壁的非接触式检测系统，采用折反射全景成像技术（Catadioptric Panoramic Imaging）。通过将特制的锥形反射镜探头伸入孔内，可一次性捕获内壁360度的环形图像（或通过Z轴连续扫描）。该方案有效克服了传统微距镜头景深不足的问题，同时解决了机械旋转探头检测速度慢、易磨损的痛点。",
  principle: "核心光学原理基于圆锥曲面的反射特性。成像相机置于孔外，光轴与孔的中心轴线重合。锥形镜将孔内壁的圆柱面纹理反射成二维环形图像，并投影到相机的感光元件上。随后，系统利用极坐标到直角坐标的数学变换算法（图像展开），将畸变的环形图像精确还原为平面的内壁展开图，以便于后续的缺陷识别。",
};