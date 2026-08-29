import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Handshake,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";

const portfolioEmailHref = `mailto:17336464991@163.com?subject=${encodeURIComponent(
  "作品集联系 - 刘丁瑜",
)}&body=${encodeURIComponent("您好，刘丁瑜：\n\n我通过您的个人作品集网站与您联系。\n\n")}`;

const content = {
  contact: {
    eyebrow: null,
    title: "Contact",
    description:
      "For portfolio review, collaboration, or design discussion, please contact Liu Dingyu by email.",
    body: [],
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
    { icon: Mail, label: "Email", value: "17336464991@163.com", href: portfolioEmailHref },
    { icon: Phone, label: "Phone", value: "17336464991" },
    { icon: MessageCircle, label: "WeChat", value: "17336464991" },
    { icon: MapPin, label: "Based in", value: "China" },
  ],
};

const aboutSections = [
  { id: "education", number: "01", label: "教育", english: "Education" },
  { id: "experience", number: "02", label: "实习", english: "Experience" },
  { id: "projects", number: "03", label: "项目", english: "Projects" },
  { id: "skills", number: "04", label: "能力", english: "Capabilities" },
  { id: "honors", number: "05", label: "荣誉", english: "Honors" },
];

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
  {
    title: "书画协会团支书",
    time: "2018.09 - 2019.06",
    detail:
      "活动组织与执行：独立策划“书画义赠”等大型社团活动；并面向 50 余名会员主讲主题团课，负责内容策划与讲解。",
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

const strengths = [
  {
    label: "Adapt",
    title: "商业空间项目适应能力",
    text: "具备商业综合体、家装及品牌零售空间相关实践经验，能够较快适应不同项目节奏，并完成图纸整理、建模表现、分析绘制及方案深化等工作。",
    scope: "Commercial / Residential / Retail",
    icon: Layers3,
  },
  {
    label: "Deliver",
    title: "协作与落地意识",
    text: "具备跨专业配合及现场跟进经验，能根据设计调整持续校核图纸并跟进施工问题；可接受驻场及出差安排。",
    scope: "Coordination / Site / Delivery",
    icon: Handshake,
  },
];

const simplePageClasses = {
  wrapper: "page-fade pt-28",
  section: "simple-info-frame mx-auto flex max-w-5xl px-5 py-20 md:px-8",
  panel: "flex w-full flex-col justify-start border-y border-line/80 py-14",
};

function AboutPage() {
  const [activeSection, setActiveSection] = useState(aboutSections[0].id);
  const reduceMotion = useReducedMotion();

  const selectAdjacentTab = (event, currentIndex) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 };
    let nextIndex = currentIndex;

    if (event.key in keys) {
      nextIndex = (currentIndex + keys[event.key] + aboutSections.length) % aboutSections.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = aboutSections.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextSection = aboutSections[nextIndex];
    setActiveSection(nextSection.id);
    document.getElementById(`about-tab-${nextSection.id}`)?.focus();
  };

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
            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-4">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Profile / CV</p>
                <span className="h-px flex-1 bg-line/80" />
              </div>
              <h1 className="text-ink">
                <span className="font-cn-display block text-4xl leading-none md:text-6xl">刘丁瑜</span>
                <span className="mt-4 block font-display text-2xl uppercase tracking-[0.08em] text-primary/85 md:text-3xl">
                  Liu Dingyu
                </span>
              </h1>
              <p className="mt-5 max-w-3xl break-words text-lg leading-8 text-clay">{profile.headline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-white shadow-[0_8px_24px_rgba(94,131,160,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                  href="/resume-liu-dingyu.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={16} />
                  查看 PDF 简历
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-white/35 px-5 py-2.5 text-sm text-primary transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/70"
                  href={portfolioEmailHref}
                >
                  <Mail size={16} />
                  发送邮件
                </a>
              </div>
            </div>

            <div className="min-w-0 border-l border-primary/25 py-1 pl-6 leading-8 text-ink/68 lg:mt-2 lg:pl-8">
              <p className="break-words">{profile.summary}</p>
              <p className="mt-4 break-words text-sm leading-7 text-ink/55">{profile.englishSummary}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-x-5 gap-y-4 border-b border-line/70 py-6 sm:grid-cols-2 xl:grid-cols-4">
          {profile.contact.map((item) => {
            const Icon = item.icon;
            const value = (
              <span className="text-sm leading-6 text-ink/72 transition hover:text-primary">{item.value}</span>
            );

            return (
              <div key={item.label} className="group flex items-center gap-3 border-l border-transparent py-1 transition duration-300 hover:border-primary/30 hover:pl-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/45 text-primary transition duration-300 group-hover:border-primary/35 group-hover:bg-white/75">
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

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="overflow-x-auto border-b border-line/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="个人履历分类">
          <div className="flex min-w-max md:min-w-0">
            {aboutSections.map((section, index) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  id={`about-tab-${section.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="about-content-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveSection(section.id)}
                  onKeyDown={(event) => selectAdjacentTab(event, index)}
                  className={`group relative min-w-[8.5rem] border-l border-line/55 px-5 py-5 text-left transition duration-300 first:border-l-0 md:min-w-0 md:flex-1 md:px-6 ${
                    isActive ? "bg-white/42 text-ink" : "text-ink/46 hover:bg-white/25 hover:text-ink/78"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className={`text-[10px] tracking-[0.18em] ${isActive ? "text-primary" : "text-ink/28"}`}>
                      {section.number}
                    </span>
                    <span className="font-cn-heading text-lg font-bold">{section.label}</span>
                  </span>
                  <span className={`mt-1 block font-display text-xs uppercase tracking-[0.13em] ${isActive ? "text-primary" : "text-ink/34"}`}>
                    {section.english}
                  </span>
                  <motion.span
                    className="absolute inset-x-0 bottom-0 h-px bg-primary"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28 }}
                    style={{ transformOrigin: "left" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[34rem] pt-8 md:pt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              id="about-content-panel"
              role="tabpanel"
              aria-labelledby={`about-tab-${activeSection}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutSectionContent section={activeSection} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function AboutSectionContent({ section }) {
  if (section === "education") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <InfoPanel icon={GraduationCap} eyebrow="Education" title="教育背景">
          <div className="space-y-6">
            {education.map((item) => (
              <TimelineItem key={item.school} title={item.school} meta={`${item.degree} · ${item.time}`}>
                {item.detail}
              </TimelineItem>
            ))}
          </div>
        </InfoPanel>
        <InfoPanel title="在校经历" variant="plain">
          <div className="space-y-6">
            {campusExperience.map((item) => (
              <TimelineItem key={item.title} title={item.title} meta={item.time}>
                {item.detail}
              </TimelineItem>
            ))}
          </div>
        </InfoPanel>
      </div>
    );
  }

  if (section === "experience") {
    return (
      <InfoPanel icon={BriefcaseBusiness} eyebrow="Internship" title="实习经历">
        <div className="space-y-7">
          {experience.map((item) => (
            <ExperienceBlock key={item.company} item={item} />
          ))}
        </div>
      </InfoPanel>
    );
  }

  if (section === "projects") {
    return (
      <InfoPanel eyebrow="Selected Project Roles" title="项目经历">
        <div>
          {projectExperience.map((item, index) => (
            <article key={item.title} className="border-t border-line/70 py-6 first:border-t-0 first:pt-0 last:pb-0">
              <div className="grid gap-5 md:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.25fr)] md:items-start md:gap-6">
                <p className="text-[10px] tracking-[0.2em] text-primary/65">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <p className="font-cn-heading text-xl font-normal leading-8 text-ink md:text-2xl">{item.title}</p>
                  <p className="mt-3 text-[11px] uppercase leading-5 tracking-[0.14em] text-primary">{item.role}</p>
                  <p className="mt-1 text-[10px] tracking-[0.12em] text-ink/42">{item.time}</p>
                </div>
                <div className="border-t border-line/65 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <p className="text-sm leading-7 text-ink/66">{item.result}</p>
                  {item.link ? (
                    <a className="mt-4 inline-block break-all text-xs tracking-[0.06em] text-primary transition hover:text-clay" href={item.link} target="_blank" rel="noreferrer">
                      {item.link}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </InfoPanel>
    );
  }

  if (section === "skills") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <InfoPanel icon={Sparkles} eyebrow="Capabilities" title="能力结构">
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 font-display text-sm uppercase tracking-[0.12em] text-primary">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-line bg-transparent px-3 py-1 text-xs text-ink/62">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </InfoPanel>
        <InfoPanel title="个人优势">
          <div className="grid gap-4">
            {strengths.map((item) => {
              const StrengthIcon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-lg border border-line/80 bg-paper/55 p-5 transition duration-300 hover:border-primary/45 hover:bg-white/65"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary/70 transition-colors duration-300 group-hover:bg-primary" />
                  <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-white/55 text-primary">
                      <StrengthIcon size={19} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="font-display text-xs uppercase tracking-[0.16em] text-primary">{item.label}</p>
                        <span className="h-px flex-1 bg-primary/20" />
                      </div>
                      <h3 className="mt-3 font-cn-heading text-base font-bold leading-7 text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink/64">{item.text}</p>
                      <p className="mt-4 border-t border-line/65 pt-3 font-display text-[10px] uppercase tracking-[0.12em] text-primary/75">
                        {item.scope}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </InfoPanel>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <InfoPanel icon={Award} eyebrow="Honors" title="荣誉奖项">
        <ul className="grid gap-x-8 gap-y-3 text-sm leading-7 text-ink/68 md:grid-cols-2">
          {honors.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary/55" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </InfoPanel>
    </div>
  );
}

function InfoPanel({ icon: Icon, eyebrow, title, children, variant = "card" }) {
  const isPlain = variant === "plain";

  return (
    <section
      className={
        isPlain
          ? "border-t border-line/80 pt-6"
          : "rounded-lg border border-line/75 bg-white/50 p-6 backdrop-blur-[2px]"
      }
    >
      <div
        className={`mb-6 flex items-end justify-between gap-4 ${
          isPlain ? "" : "border-b border-line/70 pb-4"
        }`}
      >
        <div>
          {eyebrow ? <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-primary">{eyebrow}</p> : null}
          <h2
            className={`font-cn-heading font-bold tracking-wide text-ink ${
              isPlain ? "text-xl" : "text-2xl"
            }`}
          >
            {title}
          </h2>
        </div>
        {Icon ? (
          <span
            className={
              isPlain
                ? "flex shrink-0 items-center justify-center text-primary/65"
                : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper/60 text-primary"
            }
          >
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
    <div className="border-t border-line/65 pt-5 first:border-t-0 first:pt-0">
      <p className="font-cn-heading text-xl font-normal text-ink">{title}</p>
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
          <h3 className="font-cn-heading text-2xl font-normal text-ink">{item.company}</h3>
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
            as={type === "contact" ? "h1" : "h2"}
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
          />
          {type === "contact" ? (
            <div className="w-full max-w-xl border-y border-line/80">
              <a
                data-contact-email
                className="group flex items-center justify-between gap-6 py-5 text-primary transition duration-300 hover:text-clay sm:px-1"
                href={portfolioEmailHref}
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-ink/45">
                    Send an Email
                  </span>
                  <span className="mt-2 block break-all font-sans text-2xl text-ink sm:text-3xl">
                    17336464991@163.com
                  </span>
                </span>
                <Mail className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" size={22} />
              </a>
              <div className="flex items-center justify-between gap-6 border-t border-line/70 py-5 sm:px-1">
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-ink/45">WeChat</span>
                  <span className="mt-2 block font-sans text-2xl text-ink sm:text-3xl">17336464991</span>
                </span>
                <MessageCircle className="shrink-0 text-primary" size={22} />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-5 leading-8 text-ink/68">
              {page.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SimplePage;
