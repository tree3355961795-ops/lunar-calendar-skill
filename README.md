# Lunar Calendar Skill 🌙

一个公历↔农历互查的 Agent 技能。内置农历数据表，无需联网、零依赖，1900—2100 年随便查。

> Solar ↔ Lunar calendar conversion skill for AI agents. Offline, zero-dependency, covers 1900–2100.

## 功能

- ✅ 公历转农历（含闰月判断）
- ✅ 干支纪年、生肖
- ✅ 实时时间读取
- ✅ 内置经典 lunarInfo 压缩数据表，无需联网
- ✅ 纯 Node.js 实现，无第三方依赖

## 用法

```bash
node lunar-tool.js          # 查询今天
node lunar-tool.js 2008 8 8 # 查询指定日期
```

输出示例：

```
2008-8-8 => 农历七月初八（2008戊子年，鼠年）
```

## 验证基准

| 公历 | 农历 |
| --- | --- |
| 2026-08-14 | 七月初二（丙午马年） |
| 2008-08-08 | 七月初八（戊子鼠年） |
| 2000-01-01 | 冬月廿五（1999己卯兔年） |
| 1949-10-01 | 八月初十（己丑牛年） |

## 作为 Agent 技能安装

```bash
npx skills add tree3355961795-ops/lunar-calendar-skill
```

## 技术说明

- 数据表：经典 lunarInfo 十六进制压缩表（1900–2100）
- 核心函数：`solarToLunar(y, m, d)`，返回 `{ year, month, day, isLeap, ganzhi, shengxiao, text }`
- 换算基准：以 1900-01-31（农历正月初一）为原点累计天数差

## License

MIT
