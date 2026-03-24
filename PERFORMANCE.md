# 《向僵尸开炮》复刻版性能优化指南

在开发类似《向僵尸开炮》这种大量同屏单位、频繁技能特效的游戏时，性能优化是核心挑战。

## 1. 大量单位渲染与逻辑 (Entity Management)

### 对象池 (Object Pooling)
- **问题**: 频繁创建和销毁（实例化/Destroy）僵尸、子弹和特效会导致频繁的垃圾回收（GC），造成掉帧。
- **方案**: 预先创建一定数量的单位存入池中。当单位死亡时，不销毁而是隐藏（Active = false），需要时重新激活并重置状态。

### 数据驱动架构 (ECS - Entity Component System)
- **问题**: 在 Unity 中使用传统的 `MonoBehaviour` 处理数千个对象会带来巨大的 CPU 开销。
- **方案**: 使用 Unity DOTS (Entities, Burst Compiler, Job System)。将数据（位置、血量）与逻辑（移动系统、碰撞系统）分离，利用 CPU 多核性能并提高内存缓存命中率。

### 空间分区 (Spatial Partitioning)
- **问题**: 每一帧进行全量碰撞检测（N^2 复杂度）会导致计算量爆炸。
- **方案**: 使用 **网格索引 (Grid-based partitioning)** 或 **四叉树 (Quadtree)**。将战场划分为多个格子，每个单位只需与其所在格子及相邻格子的单位进行检测。

## 2. 渲染优化 (Rendering)

### GPU 实例化 (GPU Instancing)
- **问题**: 每个僵尸如果都占用一个 Draw Call，会导致 GPU 提交过载。
- **方案**: 确保所有同类僵尸使用相同的材质 and 网格，开启 GPU Instancing，使成百上千个僵尸在一个 Draw Call 内完成渲染。

### 简化动画系统
- **问题**: 骨骼动画（Skinned Mesh Renderer）对 CPU 压力极大。
- **方案**: 使用 **顶点动画纹理 (Vertex Animation Texture - VAT)**。将动画预计算到纹理中，在 Shader 中通过顶点偏移还原动画，极大降低 CPU 开销。

## 3. 逻辑与 AI 优化

### 逻辑帧与渲染帧分离
- **方案**: 核心战斗逻辑（位移、伤害计算）可以以较低频率运行（如 30 FPS），而渲染保持 60 FPS，通过插值使移动看起来顺滑。

### 批量化处理
- **方案**: 技能伤害判定（如电磁圈）不要让每个僵尸自己判断，而是由 `SkillManager` 统一获取范围内的所有僵尸 ID，并批量扣除血量。

## 4. 内存优化

### 纹理压缩
- **方案**: 使用 ASTC 或 ETC2 格式，针对不同平台（Android/iOS）优化。

### 静态分析
- **方案**: 避免在 `Update` 函数中进行 `GetComponent` 或 `GameObject.Find` 操作。
