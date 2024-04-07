---
title: GAMES104 笔记
date: 2022-05-30T07:23:59.944Z
lastmod: 2022-05-30T07:23:59.944Z
author: "Armyja"
tags: ['game']
showComments: true
summary: "本课程将介绍现代游戏引擎所涉及的系统架构，技术点，引擎系统相关的知识。 通过该课程，你能够对游戏引擎建立起一个全面且完整的了解。 如果你动手能力足够强，你将能够跟随课程，从0到1搭建起一个完整的迷你游戏引擎。如本课程适合相关专业领域的学生、研究者，以及所有对游戏引擎设计和开发感兴趣的人。"
---

{{< music id="33367012" type="song" server="netease" >}}

## GAMES104 课程简介

**Pilot Engine**

本课程将介绍现代游戏引擎所涉及的系统架构，技术点，引擎系统相关的知识。 通过该课程，你能够对游戏引擎建立起一个全面且完整的了解。 如果你动手能力足够强，你将能够跟随课程，从 0 到 1 搭建起一个完整的迷你游戏引擎。如本课程适合相关专业领域的学生、研究者，以及所有对游戏引擎设计和开发感兴趣的人。

课程网址：[https://games104.boomingtech.com/](https://games104.boomingtech.com/)

## 作业

### PA01:Build and Run Pilot Engine

[作业说明 PDF](https://cdn.boomingtech.com/games104_static/upload/GAMES104_PA01.pdf)

作业说明：

1. Build and run Pilot ✔️

笔者安装 Visual Studio 2022，安装选项附带了 CMake，所以为了在命令行使用 CMake，添加用户环境变量：`X:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin`

Execute the **build_windows.bat**, and then open **Pilot.sln** with Visual Studio

错误提示：

```log
fatal: unsafe repository ('D:/project/Pilot' is owned by someone else)
To add an exception for this directory, call:

    git config --global --add safe.directory D:/project/Pilot
```

这个问题似乎与 [https://github.blog/2022-04-12-git-security-vulnerability-announced/](https://github.blog/2022-04-12-git-security-vulnerability-announced/) 相关。暂时不理会。

### PA02:Rendering

[作业说明 PDF](https://cdn.boomingtech.com/games104_static/upload/PA02%EF%BC%9ARendering%20.pdf)

作业说明：

1. 在 Pilot 小引擎代码中找到
   `pilot/engine/shader/glsl/color_grading.frag`，补充此 `shader` 代码中的
   `main` 函数，以实现 `ColorGrading` 功能。若代码编译成功且实现方法正确，则可
   以看到进行 `ColorGrading` 渲染之后的结果。 ✔️
1. 使用自定义的 `LUT` 图，并修改相应代码，实现具有个性的 `ColorGrading` 的
   效果。 ✔️
1. （提高项，可选）添加一个新的 `Pass` 实现某个自己感兴趣的后处理效果 ❌
   - 调整 PMainCameraPass::setupRenderPass 添加一个新的 Vulkan Subpass。
   - 调整 PVulkanManager::initializeDescriptorPool 增加相关 Descriptor 的数量。_【这里用了 Magic Number，不清楚如何统计，可能和 Vulkan 相关】_

LUT 贴图路径：`engine\asset\texture\lut`，默认配置为

```json
"color_grading_map": "asset/texture/lut/color_grading_lut_01.png"
```

配置文件在 `engine\asset\global\rendering.global.json`。

- [LUT Table Texture Generator](https://github.com/mortenblaa/lut-generator/)

  Python script for generating neutral LUT tables of different sizes. It supports both Unreal Engine style LUT (top down) and the Unity style LUT (bottom up).

  Based on a GitHub gist by Koki Ibukuro.

  **Samples**

  | Size    | Unreal Engine                                                                                                    | Unity                                                                                                                |
  | :------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
  | 256x16  | ![strip 256x16](https://github.com/mortenblaa/lut-generator/raw/master/samples/unreal/lut_strip_16_256x16.png)   | ![lut_strip_16_256x16](https://github.com/mortenblaa/lut-generator/raw/master/samples/unity/lut_strip_16_256x16.png) |
  | 1024x32 | ![strip 1024x32](https://github.com/mortenblaa/lut-generator/raw/master/samples/unreal/lut_strip_32_1024x32.png) | ![strip 1024x32](https://github.com/mortenblaa/lut-generator/raw/master/samples/unity/lut_strip_32_1024x32.png)      |

Pilot 使用 Unreal Engine 的格式。

修改 `engine\shader\glsl\color_grading.frag`，参考 [V1tozzZ](https://www.zhihu.com/people/wang-jun-yang-5-82) 的实现：[GAMES104 作业 2 基础部分](https://zhuanlan.zhihu.com/p/508156645)

```glsl:color_grading.frag
#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    // 这里的 LUT 贴图为单行排列
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    // 纵向值，同时表示格子的数量，一般取值 16，32，64
    highp float _COLORS      = float(lut_tex_size.y);
    // 横向值，为纵向值的平方
    highp float xsize        = float(lut_tex_size.x);

    // rgba 的取值范围: 0 ~ 1.0
    highp vec4 color       = subpassLoad(in_color).rgba;

    // 先得到 rgb 在 lut 颜色数量上的映射（可以理解为在单个格子里的偏移量）
    highp float bluemapped          = (_COLORS-1.0)*color.b;
    highp float redmapped           = (_COLORS-1.0)*color.r;
    highp float greenmapped         = (_COLORS-1.0)*color.g;

    // 用蓝色确定从左至右第几个颜色格子，加上红色确定格子上x坐标 取得u坐标
    // 映射后的蓝色可能是小数 那么就取小数前后两个格子
    highp float rbmapped1 = redmapped + floor(bluemapped)*_COLORS;
    highp float rbmapped2 = redmapped + ceil(bluemapped)*_COLORS;
    highp float u1 = rbmapped1/xsize;
    highp float u2 = rbmapped2/xsize;

    // 用绿色取v坐标
    highp float v = greenmapped/_COLORS;
    highp vec2 uv1 = vec2(u1,v);
    highp vec2 uv2 = vec2(u2,v);
    highp vec3 mappedcolor1  =   texture(color_grading_lut_texture_sampler, uv1).xyz;
    highp vec3 mappedcolor2  =   texture(color_grading_lut_texture_sampler, uv2).xyz;

    //混合两个格子的颜色 fract(bluemapped)表示用小数部分决定两个格子占比权重
    highp vec3 mixedcolor   =   mix(mappedcolor1,mappedcolor2,fract(bluemapped));

    out_color = vec4(mixedcolor,color.a);

}
```

## Pilot 引擎技术点

### 反射

Pilot 引擎使用静态反射框架，用户通过 **定义数据结构** 与提供对应的 **配置文件**，框架利用元编程技术生成读取接口。

可以在 `engine\source\_generated\serializer\all_serializer.ipp` 看到序列化/反序列化代码，由 `engine\source\precompile\precompile.cmake` 定义的预编译流程生成。

```cpp:all_serializer.ipp
#include "D:/project/Pilot/engine/source/_generated/serializer/global_rendering.serializer.gen.h"
namespace Pilot{
    // ...
    template<>
    PJson PSerializer::write(const GlobalRenderingRes& instance){
        PJson::object  ret_context;
        ret_context.insert_or_assign("skybox_irradiance_map", PSerializer::write(instance.m_skybox_irradiance_map));
        ret_context.insert_or_assign("skybox_specular_map", PSerializer::write(instance.m_skybox_specular_map));
        ret_context.insert_or_assign("brdf_map", PSerializer::write(instance.m_brdf_map));
        ret_context.insert_or_assign("color_grading_map", PSerializer::write(instance.m_color_grading_map));
        ret_context.insert_or_assign("sky_color", PSerializer::write(instance.m_sky_color));
        ret_context.insert_or_assign("ambient_light", PSerializer::write(instance.m_ambient_light));
        ret_context.insert_or_assign("camera_config", PSerializer::write(instance.m_camera_config));
        ret_context.insert_or_assign("directional_light", PSerializer::write(instance.m_directional_light));
        return  PJson(ret_context);
    }
    template<>
    GlobalRenderingRes& PSerializer::read(const PJson& json_context, GlobalRenderingRes& instance){
        assert(json_context.is_object());
        if(!json_context["skybox_irradiance_map"].is_null()){
        PSerializer::read(json_context["skybox_irradiance_map"], instance.m_skybox_irradiance_map);
        }
        if(!json_context["skybox_specular_map"].is_null()){
        PSerializer::read(json_context["skybox_specular_map"], instance.m_skybox_specular_map);
        }
        if(!json_context["brdf_map"].is_null()){
        PSerializer::read(json_context["brdf_map"], instance.m_brdf_map);
        }
        if(!json_context["color_grading_map"].is_null()){
        PSerializer::read(json_context["color_grading_map"], instance.m_color_grading_map);
        }
        if(!json_context["sky_color"].is_null()){
        PSerializer::read(json_context["sky_color"], instance.m_sky_color);
        }
        if(!json_context["ambient_light"].is_null()){
        PSerializer::read(json_context["ambient_light"], instance.m_ambient_light);
        }
        if(!json_context["camera_config"].is_null()){
        PSerializer::read(json_context["camera_config"], instance.m_camera_config);
        }
        if(!json_context["directional_light"].is_null()){
        PSerializer::read(json_context["directional_light"], instance.m_directional_light);
        }
        return instance;
    }
}
```

相关分析：

- [鹏 wp](https://www.zhihu.com/people/ban-tang-96-14)
  - [C++反射-Pilot 引擎的反射实现](https://zhuanlan.zhihu.com/p/502729373)
- [netcan](https://www.zhihu.com/people/netcan)
  - [如何优雅的实现 C++编译期静态反射
    ](https://zhuanlan.zhihu.com/p/165993590)
  - [C++静态反射框架：ConfigLoader](https://zhuanlan.zhihu.com/p/388454455)