import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";

const content = {
  contact: {
    eyebrow: "Contact",
    title: "Contact",
    description: "Email: 17336464991@163.com",
    body: [
      "For portfolio review, collaboration, or design discussion, please contact Liu Dingyu by email.",
      "Email: 17336464991@163.com",
    ],
  },
};

const profile = {
  name: "Liu Dingyu / 刘丁瑜",
  role: "Interior & Environmental Design",
  headline: "艺术设计硕士（环境设计方向）｜商业空间、居住空间与公共环境设计",
  summary:
    "关注商业、居住与公共环境设计，擅长底图梳理、CAD 重绘、基础建模、方案表达与效果图可视化。具备从图纸到落地配合的流程意识，重视准确性、效率与细节执行。",
  englishSummary:
    "Interior and environmental designer focused on commercial, residential, and public spaces, with skills in drawing coordination, modeling, visualization, and presentation support.",
  contact: [
    { icon: Mail, label: "Email", value: "17336464991@163.com", href: "mailto:17336464991@163.com" },
    { icon: Phone, label: "Phone", value: "17336464991" },
    { icon: MapPin, label: "Based in", value: "China" },
  ],
};

const education = [
  {
    school: "海南师范大学",
    degree: "艺术设计 · 环境设计方向｜硕士",
    time: "2023.09 - 2026.07",
    detail: "GPA 3.6/4.0｜核心课程：海南传统建筑设计实践、旅游商业空间设计实践、地域文化设计创作实践、海南民居设计实践等",
  },
  {
    school: "华北科技学院",
    degree: "环境设计｜学士",
    time: "2017.09 - 2021.07",
    detail: "GPA 3.66/4.0｜核心课程：室内设计、景观设计、建筑制图、人机工程学、展览展示设计、装饰概预算等",
  },
];

const experience = [
  {
    company: "Benoy 贝诺建筑设计咨询（上海）有限公司",
    role: "室内设计实习生",
    time: "2026.01 - 2026.03",
    points: [
      "图纸整合与建模：参与华东某约 21 万㎡大型商业综合体，整合建筑、室内多版本 CAD 底图并持续校核更新，完成 B1-F5 六层 SU 白模；根据方案调整扶梯位置及空间关系，制作 Enscape 漫游及汇报材料。",
      "分析绘制与平面深化：绘制服务半径、人流及室内公区分析图；完成 B1、F2-F5 公共卫生间平面排布、洁具数量统计及多轮方案修改与图纸核对，配合项目深化推进。",
      "多项目快速响应：在不同商业项目间快速切换，完成华南某商业项目 4 层彩平及 4 个关键空间效果图；参与某五层文旅商业综合体公区边界、功能分区、铺位边界、扶梯方向及动线等 6 类分析图绘制。",
    ],
  },
  {
    company: "红星美凯龙家居集团",
    role: "设计师助理",
    time: "2024.07 - 2024.09",
    points: [
      "需求转化与客户对接：熟悉小区户型图及套餐，负责样板间讲解与需求梳理，反馈设计师，参与 5 个以上家装项目。",
      "方案表现与深化：配合设计师完成量房放样，用 3D / 酷家乐建模渲染并生成漫游展示，跟进软装选品与采购下单。",
      "现场跟进与协调：驻场巡查 12 户以上在施单元，记录施工问题并分类反馈至施工队，累计跟进 150 余条现场问题。",
    ],
  },
];

const campusExperience = [
  {
    title: "艺术系团委办公室主任",
    time: "2018.09 - 2019.06",
    detail:
      "数据管理与分析：运用 Excel 对系内 200 多名学生的活动及证书情况进行量化管理，为奖学金评定等工作提供数据支撑。",
  },
];

const projectExperience = [
  {
    title: "海口消博会海润珍珠品牌展厅设计",
    role: "概念方案设计",
    time: "2025.02 - 2025.04",
    result:
      "参与校企合作品牌展厅设计课题，独立完成概念方案设计与 SU 建模，从珍珠圆润流线的自然形态出发设计动线与造型语言，主题色调等元素与最终落地方案形成呼应。",
  },
  {
    title: "福利彩票品牌零售店",
    role: "设计助理（已落地）",
    time: "2023.09 - 2023.09",
    result:
      "负责 75 ㎡门店的三维建模、材质搭配与效果图渲染，并配合方案深化完成多轮修改，最终方案获甲方一次性通过，项目于 19 天内完成设计至落地，建成效果与效果图基本一致。",
  },
  {
    title: "个人作品集网站",
    role: "独立设计与搭建",
    time: "2026.06 - 2026.06",
    result:
      "独立完成作品集网站的信息架构与页面内容设计，并使用 Codex 辅助进行前端搭建与迭代，实现设计项目的在线整合展示。",
    link: "https://liu-dingyu-portfolio.pages.dev",
  },
];

const skillGroups = [
  {
    title: "Design Workflow",
    items: ["空间规划", "方案深化", "场地分析", "图纸梳理", "汇报表达", "落地配合"],
  },
  {
    title: "Software",
    items: ["AutoCAD", "SketchUp", "3ds Max", "D5", "Enscape", "Photoshop"],
  },
  {
    title: "Office Software",
    items: ["Word", "Excel · 项目资料整理与基础数据分析", "PPT · 设计方案汇报"],
  },
  {
    title: "AIGC Tools",
    items: ["Codex、ChatGPT · 网页搭建、交互原型开发、文案与信息处理；独立搭建个人作品集网站"],
  },
];

const honors = [
  "ODA 东方设计奖一等奖",
  "FA 国际前沿创新艺术设计大赛二等奖",
  "华夏奖文化艺术设计大赛三等奖等多项设计竞赛奖项",
  "英语四、六级证书（CET-4、CET-6）",
  "五次获得校级年度奖学金",
  "优秀共青团员",
];

const simplePageClasses = {
  wrapper: "page-fade pt-28",
  section: "simple-info-frame mx-auto flex max-w-5xl px-5 py-20 md:px-8",
  panel: "flex w-full flex-col justify-start border-y border-line/80 py-14",
};

function AboutPage() {
  return (
    <div className="page-fade pt-20 md:pt-24">
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-6 md:px-8">
        <div className="relative overflow-hidden border-y border-line/80 py-12">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 text-primary/[0.08] md:block">
            <svg viewBox="0 0 520 260" fill="none" aria-hidden="true">
              <path d="M80 70H380M80 70V190M160 70V190M246 70V150" stroke="currentColor" />
              <path d="M80 132H380M246 150C296 150 334 180 342 224" stroke="currentColor" />
              <path d="M392 70H488M440 24V116M432 70H448M440 62V78" stroke="currentColor" />
            </svg>
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="relative h-3 w-3 rounded-full border border-primary/70">
                  <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                  <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                </span>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Profile / CV</p>
                <span className="h-px flex-1 bg-line/80" />
              </div>
              <h1 className="text-ink">
                <span className="font-cn-serif block text-4xl font-normal leading-none md:text-6xl">刘丁瑜</span>
                <span className="mt-4 block font-display text-2xl uppercase tracking-[0.08em] text-primary/85 md:text-3xl">
                  Liu Dingyu
                </span>
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-clay">{profile.headline}</p>
            </div>

            <div className="rounded-lg border border-line/75 bg-white/56 p-7 leading-8 text-ink/68 backdrop-blur-[2px] lg:-mt-4">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-line/70 pb-3">
                <span className="text-[10px] uppercase tracking-[0.22em] text-primary">Design Position</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/45" />
              </div>
              <p>{profile.summary}</p>
              <p className="mt-4 text-sm leading-7 text-ink/55">{profile.englishSummary}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-b border-line/70 py-6 md:grid-cols-3">
          {profile.contact.map((item) => {
            const Icon = item.icon;
            const value = (
              <span className="text-sm leading-6 text-ink/72 transition hover:text-primary">{item.value}</span>
            );

            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/45 text-primary">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/42">{item.label}</p>
                  {item.href ? <a href={item.href}>{value}</a> : value}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-8">
          <InfoPanel icon={GraduationCap} eyebrow="Education" title="教育背景">
            <div className="space-y-6">
              {education.map((item) => (
                <TimelineItem key={item.school} title={item.school} meta={`${item.degree} · ${item.time}`}>
                  {item.detail}
                </TimelineItem>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel icon={Sparkles} eyebrow="Skills" title="能力结构">
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary">{group.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-line bg-transparent px-3 py-1 text-xs text-ink/62">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel icon={Award} eyebrow="Awards" title="荣誉奖项">
            <ul className="space-y-3 text-sm leading-7 text-ink/68">
              {honors.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary/55" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </InfoPanel>

          <InfoPanel eyebrow="Campus Experience" title="在校经历">
            <div className="space-y-6">
              {campusExperience.map((item) => (
                <TimelineItem key={item.title} title={item.title} meta={item.time}>
                  {item.detail}
                </TimelineItem>
              ))}
            </div>
          </InfoPanel>
        </aside>

        <div className="space-y-8">
          <InfoPanel icon={BriefcaseBusiness} eyebrow="Internship" title="实习经历">
            <div className="space-y-7">
              {experience.map((item) => (
                <ExperienceBlock key={item.company} item={item} />
              ))}
            </div>
          </InfoPanel>

          <InfoPanel eyebrow="Selected Project Roles" title="项目经历">
            <div className="grid gap-4 md:grid-cols-2">
              {projectExperience.map((item) => (
                <div key={item.title} className="rounded-lg border border-line/70 bg-white/42 p-5">
                  <div className="mb-4 border-b border-line/65 pb-3">
                    <p className="font-cn-serif text-xl text-ink">{item.title}</p>
                    <p className="mt-2 text-xs uppercase leading-5 tracking-[0.16em] text-primary">
                      {item.role} · {item.time}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-ink/66">{item.result}</p>
                  {item.link ? (
                    <a
                      className="mt-4 inline-block break-all text-xs tracking-[0.06em] text-primary transition hover:text-clay"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.link}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel eyebrow="Personal Strengths" title="个人优势">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                [
                  "商业空间项目适应能力",
                  "具备商业综合体、家装及品牌零售空间相关实践经验，能够较快适应不同项目节奏，并完成图纸整理、建模表现、分析绘制及方案深化等工作。",
                ],
                [
                  "协作与落地意识",
                  "具备跨专业配合及现场跟进经验，能根据设计调整持续校核图纸并跟进施工问题；可接受驻场及出差安排。",
                ],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-line/70 pt-4">
                  <p className="mb-2 text-sm font-medium text-ink">{title}</p>
                  <p className="text-sm leading-7 text-ink/62">{text}</p>
                </div>
              ))}
            </div>
          </InfoPanel>
        </div>
      </section>
    </div>
  );
}

function InfoPanel({ icon: Icon, eyebrow, title, children }) {
  return (
    <section className="rounded-lg border border-line/75 bg-white/50 p-6 backdrop-blur-[2px]">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line/70 pb-4">
        <div>
          {eyebrow ? <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-primary">{eyebrow}</p> : null}
          <h2 className="font-cn-sans text-2xl font-semibold tracking-wide text-ink">{title}</h2>
        </div>
        {Icon ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper/60 text-primary">
            <Icon size={18} />
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TimelineItem({ title, meta, children }) {
  return (
    <div className="relative border-l border-line/80 pl-5">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-paper" />
      <p className="font-cn-serif text-xl text-ink">{title}</p>
      <p className="mt-2 text-xs uppercase leading-5 tracking-[0.12em] text-primary">{meta}</p>
      <p className="mt-3 text-sm leading-7 text-ink/64">{children}</p>
    </div>
  );
}

function ExperienceBlock({ item }) {
  return (
    <article className="border-b border-line/65 pb-7 last:border-b-0 last:pb-0">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-cn-serif text-2xl text-ink">{item.company}</h3>
          <p className="mt-2 text-sm text-clay">{item.role}</p>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-ink/42">{item.time}</p>
      </div>
      <ul className="space-y-3 text-sm leading-7 text-ink/68">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary/55" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SimplePage({ type }) {
  if (type === "about") {
    return <AboutPage />;
  }

  const page = content[type] || content.about;

  return (
    <div className={simplePageClasses.wrapper}>
      <section className={simplePageClasses.section}>
        <div className={simplePageClasses.panel}>
          <SectionTitle
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
          />
          <div className="max-w-3xl space-y-5 leading-8 text-ink/68">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimplePage;
