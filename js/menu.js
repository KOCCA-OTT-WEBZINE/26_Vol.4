const spotlightItem = {
  0: {
    title: "영상 콘텐츠를 둘러싼 플랫폼 전쟁",
    authors: [
      {
        name: "김정환",
        affiliation: "고려대학교 미디어대학 교수",
      },
    ],
  },
  1: {
    title: "돈을 따라가면 보이는 주목(Attention)의 방정식:<br>오디언스 타깃팅과 수익화 전략",
    authors: [
      {
        name: "이혜미",
        affiliation: "제일기획 미디어 퍼포먼스 1팀 프로",
      },
    ],
  },
  2: {
    title: "화면 밖으로 나온 콘텐츠 IP<br>: 참여와 관계에서 찾는 새로운 비즈니스",
    authors: [
      {
        name: "강보라",
        affiliation: "연세대학교 커뮤니케이션연구소 전문연구원",
      },
    ],
  },
};

const trendItem = {
  0: {
    title: "디지털에서 태어나 방송으로, 검증 순서가 뒤집힌 포맷 산업",
    authors: [
      {
        name: "박원우",
        affiliation: "Creative Mate dI turn 대표 / 콘텐츠 크리에이터",
      },
    ],
  },
  1: {
    title: "AI 기술, 대하드라마 &lt;문무&gt;의 완성도를 높이다",
    authors: [
      {
        name: "이호",
        affiliation: "KBS 드라마센터 CP",
      },
    ],
  },
  2: {
    title: "아시아 드라마의 재편: 콘텐츠 소비 지형 변화가 주는 시사점",
    authors: [
      {
        name: "홍성아",
        affiliation: "말레이시아과학대학교 박사",
      },
    ],
  },
};

const peopleItem = {
  0: {
    title: "플랫폼 시대, 창작자가 수용자를 만나는 방법,<br>&lt;신입사원 강회장&gt;의 고혜진 감독",
    authors: [
      {
        name: "고혜진",
        affiliation: "감독",
      },
    ],
  },
};

const globalItem = {
  0: {
    title: "북미",
  },
  1: {
    title: "중남미",
  },
  2: {
    title: "유럽",
  },
  3: {
    title: "아시아",
  },
  4: {
    title: "중동 ∙ 아프리카",
  },
  5: {
    title: "대양주",
  },
};

const dataPointItem = {
  0: {
    title: "[2026년 4분기] 데이터로 읽는 글로벌 OTT 콘텐츠 소비 취향",
  },
  1: {
    title: "드라마 2차 유통 시대:<br>OTT에서 TV로, 한 번 공개된 드라마는 다시 살아날 수 있을까",
    authors: [
      {
        name: "김미선",
        affiliation: "이화여자대학교 커뮤니케이션미디어연구소 연구원",
      },
    ],
  },
  2: {
    title: "콘텐츠보다 플랫폼인가?:<br>2026년 미국 OTT 시장의 재번들링과 고객 접점 경쟁",
    authors: [
      {
        name: "정애리",
        affiliation: "중앙대학교 첨단영상대학원 겸임교수",
      },
    ],
  },
};

const contentMap = [
  {
    label: "스포트라이트",
    path: "spotlight",
    items: spotlightItem,
  },
  {
    label: "트렌드 하이라이트",
    path: "trend",
    items: trendItem,
  },
  {
    label: "피플 인사이트",
    path: "people",
    items: peopleItem,
  },
  {
    label: "데이터 포인트",
    path: "data",
    items: dataPointItem,
  },
  {
    label: "글로벌 마켓 리포트",
    path: "global",
    items: globalItem,
  },
];

function stripFootnotesAndTags(text) {
  if (!text) return "";

  return String(text)
    .replace(/<br\s*\/?>/gi, "__BR__")
    .replace(/<[^>]*>/g, "")
    .replace(/__BR__/g, "<br>")
    .replace(/\[\d+\]/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function highlightQuotes(text) {
  const QUOTE_REGEX = /["'「」『』\u2018\u2019\u201C\u201D]/g;

  return String(text).replace(
    QUOTE_REGEX,
    (quote) => `<span class="bodyQuotes">${quote}</span>`
  );
}

function renderAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return "";

  return authors
    .map(({ name, affiliation }) => {
      const safeName = name || "";
      const safeAffiliation = affiliation || "";

      return `
        <p class="author">
          ${safeName}${safeAffiliation ? ` | ${safeAffiliation}` : ""}
        </p>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-menu");
  const content = document.getElementById("menu-content");

  if (!toggle || !closeBtn || !menu || !content) return;

  toggle.addEventListener("click", () => {
    renderMenu();
    menu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    closeMenu();
  });

  content.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("active")) {
      closeMenu();
    }
  });

  function closeMenu() {
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function renderMenu() {
    content.innerHTML = "";

    contentMap.forEach(({ label, path, items }) => {
      const section = document.createElement("div");
      section.className = "menu-section";

      const sectionDescription =
        path === "spotlight"
          ? `<p id="menu-spotlight-subject">수용자와 플랫폼</p>`
          : "";

      section.innerHTML = `
        <div class="section-title">
          <h2>${label}</h2>
          ${sectionDescription}
        </div>

        <ul class="section-list">
          ${Object.entries(items)
            .map(([key, item]) => {
              const authors = renderAuthors(item.authors);

              return `
                <li class="section-item">
                  <a href="./${path}_${Number(key) + 1}.html" class="menu-link">
                    <p>${highlightQuotes(
                      stripFootnotesAndTags(item.title)
                    )}</p>
                    ${authors}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      `;

      content.appendChild(section);
    });
  }
});