from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, Image, KeepTogether, PageTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume-liu-dingyu.pdf"
PHOTO = ROOT / "scripts" / "assets" / "resume-profile-photo.jpg"
SOURCE_HAN_NORMAL_TTF = ROOT / "public" / "fonts" / "SourceHanSansCN-Normal-Resume.ttf"
SOURCE_HAN_BOLD_TTF = ROOT / "public" / "fonts" / "SourceHanSansCN-Bold-Resume.ttf"

PAPER = colors.HexColor("#F7F6F2")
INK = colors.HexColor("#2F3437")
BLUE = colors.HexColor("#5E83A0")
CLAY = colors.HexColor("#B1594F")
LINE = colors.HexColor("#CED4D4")
MUTED = colors.HexColor("#656D71")

pdfmetrics.registerFont(TTFont("SourceHanNormal", SOURCE_HAN_NORMAL_TTF))
pdfmetrics.registerFont(TTFont("SourceHanBold", SOURCE_HAN_BOLD_TTF))
pdfmetrics.registerFont(TTFont("Cormorant", ROOT / "public" / "fonts" / "CormorantGaramond.ttf"))


def extract_profile_photo():
    return PHOTO if PHOTO.exists() else None


def style(name, size, leading, color=INK, font="SourceHanNormal", **kwargs):
    return ParagraphStyle(
        name=name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        wordWrap="CJK",
        allowWidows=0,
        allowOrphans=0,
        **kwargs,
    )


NAME_CN = style("NameCN", 23, 25, font="SourceHanBold")
NAME_EN = style("NameEN", 11, 13, BLUE, "Cormorant", tracking=1.2)
CONTACT = style("Contact", 8.45, 12.8, MUTED)
SECTION_CN = style("SectionCN", 10.8, 13, BLUE, font="SourceHanBold")
SECTION_EN = style("SectionEN", 10.8, 13, BLUE, "Cormorant", tracking=0.7)
ITEM_TITLE = style("ItemTitle", 9.9, 13.2, INK, font="SourceHanBold", spaceAfter=1.15 * mm)
META = style("Meta", 8.55, 11.5, BLUE, spaceAfter=0.2 * mm)
BODY = style("Body", 9.5, 13.5, MUTED)


class ResumeDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=12.5 * mm,
            rightMargin=12.5 * mm,
            topMargin=8.5 * mm,
            bottomMargin=8.8 * mm,
            title="刘丁瑜 - 环境设计个人简历",
            author="刘丁瑜",
            subject="室内设计与环境设计个人简历",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="resume",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=draw_page)])


def draw_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setStrokeColor(colors.Color(BLUE.red, BLUE.green, BLUE.blue, alpha=0.11))
    canvas.setLineWidth(0.25)
    for x in range(15, 205, 20):
        canvas.line(x * mm, 0, x * mm, height)
    for y in range(15, 295, 20):
        canvas.line(0, y * mm, width, y * mm)
    canvas.setStrokeColor(LINE)
    canvas.line(12.5 * mm, 8.5 * mm, width - 12.5 * mm, 8.5 * mm)
    canvas.setFont("Cormorant", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(12.5 * mm, 5 * mm, "LIU DINGYU / PORTFOLIO 2026")
    canvas.drawRightString(width - 12.5 * mm, 5 * mm, "RESUME")
    canvas.restoreState()


def section_header(_number, english, chinese):
    table = Table(
        [[Paragraph(f'<font name="SourceHanBold">{chinese}</font> <font name="SourceHanNormal">|</font> <font name="Cormorant">{english}</font>', SECTION_CN)]],
        colWidths=[185 * mm],
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.7, BLUE),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.25 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    table.spaceAfter = 1.8 * mm
    return table


def entry(title, meta, paragraphs, marker=False):
    title_text = f"■  {title}" if marker else title
    parts = [Paragraph(title_text, ITEM_TITLE), Paragraph(meta, META)]
    parts.extend(Paragraph(paragraph, BODY) for paragraph in paragraphs)
    parts.append(Spacer(1, 0.8 * mm))
    return KeepTogether(parts)


def bullet_rows(rows):
    table = Table(
        [[Paragraph("■", META), Paragraph(f"<font color='#2F3437'>{label}</font> {text}", BODY)] for label, text in rows],
        colWidths=[4 * mm, 181 * mm],
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.45 * mm),
    ]))
    return table


def header_block():
    profile_photo = extract_profile_photo()
    photo_flowable = Image(str(profile_photo), width=23 * mm, height=31 * mm) if profile_photo else Spacer(23 * mm, 31 * mm)
    identity = [
        Paragraph("刘丁瑜", NAME_CN),
        Paragraph("LIU DINGYU · INTERIOR & ENVIRONMENTAL DESIGN", NAME_EN),
        Spacer(1, 2.1 * mm),
        Table(
            [
                [Paragraph("出生年月：1999.09", CONTACT), Paragraph("政治面貌：中共党员", CONTACT)],
                [Paragraph("联系电话：17336464991", CONTACT), Paragraph('<link href="mailto:17336464991@163.com">电子邮箱：17336464991@163.com</link>', CONTACT)],
                [Paragraph("微信号：nyraLuca99", CONTACT), Paragraph('<link href="https://liu-dingyu-portfolio.pages.dev">作品集：liu-dingyu-portfolio.pages.dev</link>', CONTACT)],
            ],
            colWidths=[58 * mm, 99 * mm],
            style=TableStyle([
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0.2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.2 * mm),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]),
        ),
    ]
    table = Table([[identity, photo_flowable]], colWidths=[162 * mm, 23 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("BOX", (1, 0), (1, 0), 0.8, colors.white),
    ]))
    return table


def build_story():
    return [
        header_block(),
        section_header("01", "EDUCATION", "教育背景"),
        entry("海南师范大学｜艺术设计 - 环境设计方向｜硕士", "2023.09 - 2026.07｜GPA 3.6/4.0", ["核心课程：海南传统建筑设计实践、旅游商业空间设计实践、地域文化设计创作实践、海南民居设计实践等。"]),
        entry("华北科技学院｜环境设计｜学士", "2017.09 - 2021.07｜GPA 3.66/4.0", ["核心课程：室内设计、景观设计、建筑制图、人机工程学、展览展示设计、装饰概预算等。"]),
        section_header("02", "INTERNSHIP", "实习经历"),
        entry("Benoy 贝诺建筑设计咨询（上海）有限公司｜室内设计实习生", "2026.01 - 2026.03", [
            "■ 图纸整合与建模：参与约 21 万㎡大型商业综合体，整合建筑、室内多版本 CAD 底图并持续校核，完成 B1-F5 六层 SU 白模、扶梯位置与空间关系调整、Enscape 漫游及汇报材料。",
            "■ 分析绘制与平面深化：绘制服务半径、人流及室内公区分析图；完成多层公共卫生间排布、洁具统计、多轮方案修改与图纸核对。",
            "■ 多项目快速响应：完成不同商业项目的彩平、关键空间效果图，以及公区边界、功能分区、铺位边界、扶梯与动线等分析图。",
        ]),
        entry("红星美凯龙家居集团｜设计师助理", "2024.07 - 2024.09", [
            "■ 需求转化与客户对接：负责样板间讲解与需求梳理，参与 5 个以上家装项目。",
            "■ 方案表现与深化：配合量房放样、三维建模与漫游展示，跟进软装选品与采购下单。",
            "■ 现场跟进与协调：巡查 12 户以上在施单元，累计跟进 150 余条现场问题。",
        ]),
        section_header("03", "PROJECTS", "项目经历"),
        entry("海口消博会海润珍珠品牌展厅设计｜方案设计", "2025.02 - 2025.04", ["独立完成品牌展厅概念方案与 SU 建模，从珍珠圆润、流线的自然形态提取空间语言，完成动线、造型与主题色调设计；部分元素被最终落地方案采纳。"], marker=True),
        entry("福利彩票品牌零售店｜设计助理（已落地）", "2023.09", ["负责 75 ㎡门店的三维建模、材质搭配与效果图渲染，配合方案深化完成多轮修改；方案获甲方一次性通过，项目于 19 天内完成设计至落地。"], marker=True),
        entry("个人作品集网站｜独立设计与搭建", "2026.06", ['独立完成信息架构与页面设计，并使用 Codex 辅助进行前端搭建与迭代。<link href="https://liu-dingyu-portfolio.pages.dev" color="#5E83A0">liu-dingyu-portfolio.pages.dev</link>'], marker=True),
        section_header("04", "SKILLS & HONORS", "技能与荣誉"),
        bullet_rows([
            ("设计软件：", "AutoCAD、SketchUp、3ds Max、D5、Enscape、Photoshop"),
            ("办公与 AI：", "Word、Excel、PPT、Codex、ChatGPT；可用于资料整理、方案汇报、网页搭建与信息处理"),
            ("设计竞赛：", "ODA 东方设计奖一等奖、FA 国际前沿创新艺术设计大赛二等奖、华夏奖文化艺术设计大赛三等奖等"),
            ("综合荣誉：", "英语四、六级证书（CET-4、CET-6）、五次校级年度奖学金、优秀共青团员"),
        ]),
        section_header("05", "STRENGTHS", "个人优势"),
        bullet_rows([
            ("商业空间项目适应能力：", "具备商业综合体、家装及品牌零售空间相关实践经验，能够适应不同项目节奏，完成图纸整理、建模表现、分析绘制与方案深化。"),
            ("协作与落地意识：", "具备跨专业配合及现场跟进经验，能根据设计调整持续校核图纸并跟进施工问题；可接受驻场及出差安排。"),
        ]),
    ]


if __name__ == "__main__":
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    ResumeDoc(str(OUTPUT)).build(build_story())
    print(OUTPUT)
